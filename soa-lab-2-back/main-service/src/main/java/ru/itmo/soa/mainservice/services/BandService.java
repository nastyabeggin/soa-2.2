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
import ru.itmo.soa.mainservice.model.dto.*;
import ru.itmo.soa.mainservice.repositories.BandRepository;
import ru.itmo.soa.mainservice.repositories.BandSpecifications;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BandService {
    @Autowired
    private BandRepository bandRepository;

    public Band createBand(Band band) {
        band.setCreationDate(ZonedDateTime.now(ZoneOffset.UTC).toLocalDateTime());

        Band newBand = bandRepository.save(band);
        return bandRepository.save(newBand);
    }

    public List<Band> getAllBands() {
        return bandRepository.findAll();
    }

    public BandsInfoResponse getBands(String[] sort, String[] filter, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size, createSort(sort));

        Specification<Band> specification = (filter != null)
                ? BandSpecifications.createSpecification(filter)
                : null;

        Page<Band> bandPage = specification != null
                ? bandRepository.findAll(specification, pageable)
                : bandRepository.findAll(pageable);

        BandsInfoResponse response = new BandsInfoResponse();
        response.setData(bandPage.getContent());
        response.setTotal((int) bandPage.getTotalElements());
        response.setTotalPages(bandPage.getTotalPages());
        response.setCurrentPage(page);
        response.setSize(size);

        return response;
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

                // По умолчанию - ascending
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
        bandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Band not found with id: " + id));

        bandRepository.deleteById(id);
    }

    @Transactional
    public Band updateBand(BandUpdate bandUpdate, Long id) {
        Band existingBand = bandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Band not found with id: " + id));

        if (bandUpdate.getName() != null) {
            existingBand.setName(bandUpdate.getName());
        }
        if (bandUpdate.getCoordinates() != null) {
            existingBand.setCoordinates(bandUpdate.getCoordinates());
        }
        if (bandUpdate.getNumberOfParticipants() != null) {
            existingBand.setNumberOfParticipants(bandUpdate.getNumberOfParticipants());
        }
        if (bandUpdate.getSinglesCount() != null) {
            existingBand.setSinglesCount(bandUpdate.getSinglesCount());
        }
        if (bandUpdate.getGenre() != null) {
            existingBand.setGenre(bandUpdate.getGenre());
        }
        if (bandUpdate.getStudio() != null) {
            existingBand.setStudio(bandUpdate.getStudio());
        }

        return bandRepository.save(existingBand);
    }


    public List<MusicGenre> getAllGenres() {
        return Arrays.asList(MusicGenre.values());
    }

    public SinglesCountResponse getSinglesCountSum() {
        List<Band> bands = bandRepository.findAll();
        int count = 0;
        for (Band band: bands) {
            count += band.getSinglesCount();
        }
        SinglesCountResponse response = new SinglesCountResponse(count);
        return response;
    }

    public List<GetBandCountByCreationDateResponse> getBandsCountByCreationDate() {
        return bandRepository.getBandCountByCreationDate();
    }
    
    public List<BandNoDateResponse> getAllBandsNoDate() {
        return bandRepository.findAll().stream()
                .map(band -> new BandNoDateResponse(
                        band.getId(),
                        band.getName(),
                        band.getCoordinates(),
                        band.getNumberOfParticipants(),
                        band.getSinglesCount(),
                        band.getAlbumsCount(),
                        band.getGenre(),
                        band.getStudio()
                ))
                .collect(Collectors.toList());
    }
}
