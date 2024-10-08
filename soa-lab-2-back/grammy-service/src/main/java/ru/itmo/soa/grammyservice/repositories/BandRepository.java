package ru.itmo.soa.grammyservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.itmo.soa.grammyservice.model.Band;

@Repository
public interface BandRepository extends JpaRepository<Band, Long> {
}