package ru.itmo.soa.grammyservice.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String passportID;
    private LocalDateTime birthday;

    @OneToOne(cascade = CascadeType.ALL)
    private Location location;
}
