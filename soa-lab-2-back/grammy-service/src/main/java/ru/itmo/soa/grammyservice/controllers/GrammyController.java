package ru.itmo.soa.grammyservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import ru.itmo.soa.grammyservice.model.Band;
import ru.itmo.soa.grammyservice.model.Person;
import ru.itmo.soa.grammyservice.model.Single;
import ru.itmo.soa.grammyservice.services.BandService;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/grammy")
public class GrammyController {
    private final RestTemplate restTemplate;

    @Autowired
    public GrammyController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostMapping("/band/{bandId}/singles/add")
    public ResponseEntity<Band> addSingle(@PathVariable Long bandId, @RequestBody Single single) {
        String url = String.format("http://localhost:8080/api/v1/bands/%d/singles", bandId);
        return restTemplate.postForEntity(url, single, Band.class);
    }

    @PutMapping("/bands/{bandId}/singles/{singleId}")
    public ResponseEntity<Single> changeSingle(@PathVariable Long bandId, @PathVariable Long singleId, @RequestBody Single single) {
        String url = String.format("http://localhost:8080/api/v1/bands/%d/singles/%d", bandId, singleId);
        return restTemplate.exchange(url, HttpMethod.PUT, new HttpEntity<>(single), Single.class);
    }

    @PostMapping("/{bandId}/participants/add")
    public ResponseEntity<Person> addParticipant(@PathVariable Long bandId, @RequestBody Person participant) {
        String url = String.format("http://localhost:8080/api/v1/bands/%d/participants", bandId);
        return restTemplate.postForEntity(url, participant, Person.class);
    }
}
