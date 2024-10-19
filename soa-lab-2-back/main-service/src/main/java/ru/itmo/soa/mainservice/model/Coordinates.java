package ru.itmo.soa.mainservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;

import java.awt.geom.QuadCurve2D;

@Entity
@XmlRootElement
@Data
public class Coordinates {
    @XmlElement
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @XmlElement
    @NotNull(message = "X coordinate cannot be null")
    private Double x;

    @XmlElement
    @NotNull(message = "Y coordinate cannot be null")
    @Column(nullable = false)
    private Float y;
}