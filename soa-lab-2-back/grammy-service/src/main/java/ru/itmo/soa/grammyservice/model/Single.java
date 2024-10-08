package ru.itmo.soa.grammyservice.model;

import jakarta.persistence.*;

@Entity
public class Single {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
}
