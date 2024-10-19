package ru.itmo.soa.mainservice.model.dto;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.xml.bind.annotation.XmlElement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.itmo.soa.mainservice.model.Coordinates;
import ru.itmo.soa.mainservice.model.MusicGenre;
import ru.itmo.soa.mainservice.model.Studio;


@Data
@NoArgsConstructor
@AllArgsConstructor
@JacksonXmlRootElement(localName = "MusicBand")
public class BandNoDateResponse {
    @XmlElement
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Min(value = 1, message = "Id must be greater than or equal to 1")
    private Long id;

    @XmlElement
    @NotNull(message = "Name is required")
    @Size(min = 1, message = "Name must have at least 1 character")
    private String name;

    @XmlElement
    @NotNull(message = "Coordinates are required")
    private Coordinates coordinates;

    @XmlElement
    @Min(value = 1, message = "Number of participants must be greater than 0")
    private Integer numberOfParticipants;

    @XmlElement
    @Min(value = 1, message = "Number of singles must be greater than 0")
    private Integer singlesCount;

    @XmlElement
    @Min(value = 1, message = "Number of albums must be greater than 0")
    private Integer albumsCount;

    @XmlElement
    @NotNull(message = "Genre is required")
    @Enumerated(EnumType.STRING)
    private MusicGenre genre;

    @XmlElement
    @NotNull(message = "Studio is required")
    private Studio studio;
}