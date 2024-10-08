package ru.itmo.soa.mainservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.itmo.soa.mainservice.model.Single;

@Repository
public interface SingleRepository extends JpaRepository<Single, Long> {
}
