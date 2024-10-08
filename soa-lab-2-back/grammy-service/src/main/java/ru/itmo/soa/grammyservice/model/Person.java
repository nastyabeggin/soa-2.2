package ru.itmo.soa.grammyservice.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Person {
    private Long id;

    private String name;

    private String passportID;

    private LocalDate birthday;

    private Location location;

    private Long bandID;
}
