package ru.itmo.soa.mainservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.itmo.soa.mainservice.model.Person;
import ru.itmo.soa.mainservice.repositories.PersonRepository;

import java.util.Optional;

@Service
public class PersonService {
    @Autowired
    private PersonRepository personRepository;

    public Person createPerson(Person person) {
        Optional<Person> existingPerson = personRepository.findByPassportID(person.getPassportID());

        if (existingPerson.isPresent()) {
            throw new IllegalArgumentException("Person with PassportID " + person.getPassportID() + " already exists.");
        }

        return personRepository.save(person);
    }
}
