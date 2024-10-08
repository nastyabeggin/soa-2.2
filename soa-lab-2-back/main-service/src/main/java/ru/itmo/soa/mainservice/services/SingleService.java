package ru.itmo.soa.mainservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.itmo.soa.mainservice.exceptions.ResourceNotFoundException;
import ru.itmo.soa.mainservice.model.Single;
import ru.itmo.soa.mainservice.repositories.SingleRepository;

@Service
public class SingleService {

    @Autowired
    private SingleRepository singleRepository;

    public Single updateSingle(Long singleId, Single updatedSingle) {
        Single existingSingle = singleRepository.findById(singleId)
                .orElseThrow(() -> new ResourceNotFoundException("Single not found with id: " + singleId));

        existingSingle.setName(updatedSingle.getName());

        return singleRepository.save(existingSingle);
    }
}

