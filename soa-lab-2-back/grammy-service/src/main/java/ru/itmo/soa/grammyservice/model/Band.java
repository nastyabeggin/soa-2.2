package ru.itmo.soa.grammyservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Band {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name is required")
    @Size(min = 1, message = "Name must have at least 1 character")
    @Column(nullable = false)
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    private Coordinates coordinates;

    @Column(nullable = false)
    private LocalDateTime creationDate;

    @Column(nullable = false)
    private int numberOfParticipants;

    private String description;

    @Enumerated(EnumType.STRING)
    private MusicGenre genre;

    @OneToOne(cascade = CascadeType.ALL)
    private Person frontMan;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Single> singles;
}