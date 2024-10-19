package ru.itmo.soa.mainservice.model.dto;

import lombok.Data;
import ru.itmo.soa.mainservice.model.Coordinates;
import ru.itmo.soa.mainservice.model.MusicGenre;
import ru.itmo.soa.mainservice.model.Studio;

@Data
public class BandUpdate {
    private String name;
    private Coordinates coordinates;
    private Integer numberOfParticipants;
    private String description;
    private MusicGenre genre;
    private Studio studio;
}
