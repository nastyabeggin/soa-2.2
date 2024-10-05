package ru.itmo.soa.mainservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Min(value = 1, message = "ID must be greater than or equal to 1")
    private Long id;

    @NotNull(message = "Name is required")
    @Size(min = 1, message = "Name must have at least 1 character")
    private String name;

    @NotNull(message = "Passport ID is required")
    @Column(unique = true, nullable = false)
    private String passportID;

    private LocalDate birthday;

    @NotNull(message = "Location is required")
    @OneToOne(cascade = CascadeType.ALL)
    private Location location;

    @NotNull(message = "Band ID is required")
    @Min(value = 1, message = "Band ID must be greater than or equal to 1")
    private Long bandID;
}
