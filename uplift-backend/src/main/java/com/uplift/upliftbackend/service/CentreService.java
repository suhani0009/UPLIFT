package com.uplift.upliftbackend.service;

import com.uplift.upliftbackend.entity.Centre;
import com.uplift.upliftbackend.repository.CentreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CentreService {

    private final CentreRepository centreRepository;

    public CentreService(CentreRepository centreRepository) {
        this.centreRepository = centreRepository;
    }

    public List<Centre> getAllCentres() {
        return centreRepository.findAll();
    }

    public Centre getCentreById(Long id) {
        return centreRepository.findById(id).orElse(null);
    }

    public Centre createCentre(Centre centre) {
        return centreRepository.save(centre);
    }
}