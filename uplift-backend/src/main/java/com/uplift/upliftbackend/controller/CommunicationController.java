package com.uplift.upliftbackend.controller;

import com.uplift.upliftbackend.dto.CommunicationRequest;
import com.uplift.upliftbackend.entity.Communication;
import com.uplift.upliftbackend.service.CommunicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/communications")
public class CommunicationController {

    private final CommunicationService communicationService;

    public CommunicationController(CommunicationService communicationService) {
        this.communicationService = communicationService;
    }

    @GetMapping
    public List<Communication> getAllCommunications() {
        return communicationService.getAllCommunications();
    }

    @PostMapping
    public Communication createCommunication(
            @RequestBody CommunicationRequest request) {

        return communicationService.createCommunication(request);
    }
}