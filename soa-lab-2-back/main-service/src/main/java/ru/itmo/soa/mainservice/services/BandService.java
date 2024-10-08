package ru.itmo.soa.mainservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.itmo.soa.mainservice.exceptions.InvalidParameterException;
import ru.itmo.soa.mainservice.exceptions.ResourceNotFoundException;
import ru.itmo.soa.mainservice.model.Band;
import ru.itmo.soa.mainservice.model.MusicGenre;
import ru.itmo.soa.mainservice.repositories.BandRepository;
import ru.itmo.soa.mainservice.repositories.BandSpecifications;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class BandService {
    @Autowired
    private BandRepository bandRepository;

    public Band createBand(Band band) {
        band.setCreationDate(LocalDateTime.now());
        Band newBand = bandRepository.save(band);
        if (band.getFrontMan() != null) {
            newBand.getFrontMan().setBandID(newBand.getId());
        }
        return bandRepository.save(newBand);
    }

    public List<Band> getBands(String[] sort, String[] filter, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size, createSort(sort));

        Specification<Band> specification = (filter != null)
                ? BandSpecifications.createSpecification(filter)
                : null;

        return specification != null
                ? bandRepository.findAll(specification, pageable).getContent()
                : bandRepository.findAll(pageable).getContent();
    }


    private Sort createSort(String[] sortParams) {
        Sort sort = Sort.unsorted();

        if (sortParams != null) {
            for (String sortParam : sortParams) {
                String[] parts = sortParam.split("\\[");

                if (parts.length < 1 || parts.length > 2) {
                    throw new InvalidParameterException("Invalid sort format: " + sortParam);
                }

                String property = parts[0].trim();

                // Default direction to ascending if not provided
                String direction = (parts.length > 1 && parts[1].endsWith("]"))
                        ? parts[1].substring(0, parts[1].length() - 1).trim()
                        : "asc";

                if (!direction.equalsIgnoreCase("asc") && !direction.equalsIgnoreCase("desc")) {
                    throw new InvalidParameterException("Invalid sort direction: " + direction);
                }

                Sort.Direction dir = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
                sort = sort.and(Sort.by(dir, property));
            }
        }

        return sort;
    }

    public Band getBandById(Long id) {
        return bandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Band with id " + id + " not found"));
    }

    public void deleteBandById(Long id) {
        bandRepository.deleteById(id);
    }

    public Band updateBand(Band band, Long id) {
        band.setId(id);
        return bandRepository.save(band);
    }

    public List<MusicGenre> getAllGenres() {
        return Arrays.asList(MusicGenre.values());
    }

    @Transactional
    public void deleteBandsByGenre(String genreStr) {
        try {
            MusicGenre genre = MusicGenre.valueOf(genreStr.toUpperCase());
            bandRepository.deleteByGenre(genre);
        } catch (IllegalArgumentException ex) {
            throw new ResourceNotFoundException("Genre not found: " + genreStr);
        }
    }

    public Band getGroupWithMinGenre() {
        return bandRepository.findTopByOrderByGenreDescNameAsc()
                .orElseThrow(() -> new ResourceNotFoundException("No bands found"));
    }
}
