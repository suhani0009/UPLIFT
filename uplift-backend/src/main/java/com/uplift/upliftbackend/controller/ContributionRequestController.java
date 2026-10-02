package com.uplift.upliftbackend.controller;

import com.uplift.upliftbackend.dto.ContributionRequestDTO;
import com.uplift.upliftbackend.entity.ContributionRequest;
import com.uplift.upliftbackend.service.ContributionRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contributions")
public class ContributionRequestController {

    private final ContributionRequestService contributionRequestService;

    public ContributionRequestController(
            ContributionRequestService contributionRequestService) {
        this.contributionRequestService = contributionRequestService;
    }

    @GetMapping
    public List<ContributionRequest> getAllRequests() {
        return contributionRequestService.getAllRequests();
    }

    @PostMapping
    public ContributionRequest createRequest(
            @RequestBody ContributionRequestDTO request) {

        return contributionRequestService.createRequest(request);
    }
}
