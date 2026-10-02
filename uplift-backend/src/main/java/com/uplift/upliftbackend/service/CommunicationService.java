package com.uplift.upliftbackend.service;

import com.uplift.upliftbackend.dto.CommunicationRequest;
import com.uplift.upliftbackend.entity.Communication;
import com.uplift.upliftbackend.entity.Donor;
import com.uplift.upliftbackend.repository.CommunicationRepository;
import com.uplift.upliftbackend.repository.DonorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommunicationService {

    private final CommunicationRepository communicationRepository;
    private final DonorRepository donorRepository;

    public CommunicationService(
            CommunicationRepository communicationRepository,
            DonorRepository donorRepository) {

        this.communicationRepository = communicationRepository;
        this.donorRepository = donorRepository;
    }

    public List<Communication> getAllCommunications() {
        return communicationRepository.findAll();
    }

    public Communication createCommunication(CommunicationRequest request) {

        Donor donor = donorRepository.findById(request.getDonorId())
                .orElseThrow(() -> new RuntimeException("Donor not found"));

        Communication communication = new Communication();

        communication.setDonor(donor);
        communication.setCommunicationType(request.getCommunicationType());
        communication.setMessage(request.getMessage());
        communication.setCommunicationDate(request.getCommunicationDate());
        communication.setStatus(request.getStatus());

        return communicationRepository.save(communication);
    }
}
