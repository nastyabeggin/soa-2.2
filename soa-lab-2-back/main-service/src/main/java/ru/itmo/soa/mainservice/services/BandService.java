package ru.itmo.soa.mainservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.itmo.soa.mainservice.exceptions.ResourceNotFoundException;
import ru.itmo.soa.mainservice.model.Band;
import ru.itmo.soa.mainservice.repositories.BandRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BandService {
    @Autowired
    private BandRepository bandRepository;

    public Band createBand(Band band) {
        band.setCreationDate(LocalDateTime.now());
        return bandRepository.save(band);
    }

    public Page<Band> getBands(Pageable pageable) {
        return bandRepository.findAll(pageable);
    }

    public Band getBandById(Long id) {
        return bandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Band with id " + id + " not found"));
    }

    public void deleteBandById(Long id) {
        bandRepository.deleteById(id);
    }

    public Band updateBand(Band band) {
        return bandRepository.save(band);
    }
}
