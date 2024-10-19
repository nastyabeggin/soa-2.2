package ru.itmo.soa.mainservice.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.itmo.soa.mainservice.model.Band;
import ru.itmo.soa.mainservice.model.MusicGenre;
import ru.itmo.soa.mainservice.model.dto.*;
import ru.itmo.soa.mainservice.services.BandService;

import java.util.List;

@RestController
@RequestMapping(path = "/api/music-bands")
public class BandController {

    @Autowired
    private BandService bandService;

    @PostMapping
    public ResponseEntity<Band> createBand(@Valid @RequestBody Band band) {
        Band createdBand = bandService.createBand(band);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBand);
    }

    @GetMapping
    public ResponseEntity<BandsInfoResponse> getBands(
            @RequestParam(required = false, value = "sort") String[] sort,
            @RequestParam(required = false, value = "filter") String[] filter,
            @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @RequestParam(required = false, defaultValue = "10", value = "size") int size) {

            BandsInfoResponse bands = bandService.getBands(sort, filter, page, size);
            return ResponseEntity.ok(bands);
    }

    @GetMapping("/{id}")
    public Band getBandById(@PathVariable(value = "id") Long id) {
        return bandService.getBandById(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Band> updateBand(@PathVariable(value = "id") Long id, @RequestBody BandUpdate bandUpdate) {
        Band updatedBand = bandService.updateBand(bandUpdate, id);
        return ResponseEntity.ok(updatedBand);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBandById(@PathVariable(value = "id") Long id) {
        bandService.deleteBandById(id);
    }

    @GetMapping("/genre")
    public ResponseEntity<List<MusicGenre>> getAllGenres() {
        return ResponseEntity.ok(bandService.getAllGenres());
    }

    @GetMapping("/singles-count-sum")
    public ResponseEntity<SinglesCountResponse> getSinglesCountSum() {
        return ResponseEntity.ok(bandService.getSinglesCountSum());
    }

    @GetMapping("/count-by-creation-date")
    public ResponseEntity<List<GetBandCountByCreationDateResponse>> getCountByCreationDate() {
        return ResponseEntity.ok(bandService.getBandsCountByCreationDate());
    }

    @GetMapping("/all")
    public ResponseEntity<List<BandNoDateResponse>> getAllBands() {
        List<BandNoDateResponse> bands = bandService.getAllBandsNoDate();
        return ResponseEntity.ok(bands);
    }
}
