package ru.itmo.soa.mainservice.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Min(value = 1, message = "ID must be greater than or equal to 1")
    private Long id;

    @NotNull(message = "X coordinate is required")
    private Float x;

    @Min(value = -439, message = "Y coordinate cannot be less than -439")
    @NotNull(message = "Y coordinate is required")
    private float y;

    @NotNull(message = "Z coordinate is required")
    private int z;

    @Size(min = 1, message = "Name must have at least 1 character")
    private String name;
}
