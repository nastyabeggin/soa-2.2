package ru.itmo.soa.grammyservice.model;

import jakarta.persistence.*;

@Entity
public class Coordinates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long x;

    @Column(nullable = false)
    private double y;
}