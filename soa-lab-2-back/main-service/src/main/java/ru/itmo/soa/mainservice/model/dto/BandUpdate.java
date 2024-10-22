package ru.itmo.soa.mainservice.model.dto;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import jakarta.xml.bind.annotation.XmlElement;
import lombok.Data;
import ru.itmo.soa.mainservice.model.Coordinates;
import ru.itmo.soa.mainservice.model.MusicGenre;
import ru.itmo.soa.mainservice.model.Studio;

@Data
@JacksonXmlRootElement(localName = "MusicBand")
public class BandUpdate {

    @XmlElement
    private String name;
    @XmlElement
    private Coordinates coordinates;
    @XmlElement
    private Integer numberOfParticipants;
    @XmlElement
    private MusicGenre genre;
    @XmlElement
    private Studio studio;
}
