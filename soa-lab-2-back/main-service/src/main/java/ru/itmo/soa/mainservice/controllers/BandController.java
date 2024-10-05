package ru.itmo.soa.mainservice.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.itmo.soa.mainservice.model.Band;
import ru.itmo.soa.mainservice.services.BandService;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/bands")
public class BandController {

    @Autowired
    private BandService bandService;

    @PostMapping
    public ResponseEntity<Band> createBand(@Valid @RequestBody Band band) {
        Band createdBand = bandService.createBand(band);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBand);
    }

    @GetMapping
    public Page<Band> getBands(@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "10") int size) {
        return bandService.getBands(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public Optional<Band> getBandById(@PathVariable Long id) {
        return bandService.getBandById(id);
    }

    @PatchMapping("/{id}")
    public Band updateBand(@RequestBody Band band, @PathVariable Long id) {
        band.setId(id);
        return bandService.updateBand(band);
    }

    @DeleteMapping("/{id}")
    public void deleteBandById(@PathVariable Long id) {
        bandService.deleteBandById(id);
    }
}
