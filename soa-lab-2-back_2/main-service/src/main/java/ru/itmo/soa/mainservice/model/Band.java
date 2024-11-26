package ru.itmo.soa.mainservice.model;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.xml.bind.annotation.XmlElement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JacksonXmlRootElement(localName = "MusicBand")
@Entity
public class Band {
    @XmlElement
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Min(value = 1, message = "Id must be greater than or equal to 1")
    private Long id;

    @XmlElement
    @NotNull(message = "Name is required")
    @Size(min = 1, message = "Name must have at least 1 character")
    @Column(nullable = false, unique = true)
    private String name;

    @XmlElement
    @NotNull(message = "Coordinates are required")
    @OneToOne(cascade = CascadeType.ALL)
    private Coordinates coordinates;

    @XmlElement
    @Column(nullable = false, updatable = false)
    private LocalDateTime creationDate;

    @XmlElement
    @Min(value = 1, message = "Number of participants must be greater than 0")
    @Column(nullable = false)
    private Integer numberOfParticipants;

    @XmlElement
    @Min(value = 1, message = "Number of singles must be greater than 0")
    @Column(nullable = false)
    private Integer singlesCount;

    @XmlElement
    @Min(value = 1, message = "Number of albums must be greater than 0")
    @Column(nullable = false)
    private Integer albumsCount;

    @XmlElement
    @NotNull(message = "Genre is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MusicGenre genre;

    @XmlElement
    @NotNull(message = "Studio is required")
    @OneToOne(cascade = CascadeType.ALL)
    private Studio studio;

    @PrePersist
    protected void onCreate() {
        if (creationDate == null) {
            creationDate = LocalDateTime.now();
        }
    }
}