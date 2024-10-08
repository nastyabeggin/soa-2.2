package ru.itmo.soa.grammyservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import ru.itmo.soa.grammyservice.model.Band;
import ru.itmo.soa.grammyservice.services.BandService;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/bands")
public class BandController {

    @Autowired
    private BandService bandService;

    @PostMapping
    public Band createBand(@RequestBody Band band) {
        return bandService.createBand(band);
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
