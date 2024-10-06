package ru.itmo.soa.mainservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class Coordinates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long x;

    @NotNull(message = "Y coordinate cannot be null")
    @Min(value = -439, message = "Y coordinate cannot be less than -439")
    @Column(nullable = false)
    private Double y;
}