package com.uplift.upliftbackend.controller;

import com.uplift.upliftbackend.dto.EngagementRequest;
import com.uplift.upliftbackend.entity.Engagement;
import com.uplift.upliftbackend.service.EngagementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/engagements")
public class EngagementController {

    private final EngagementService engagementService;

    public EngagementController(EngagementService engagementService) {
        this.engagementService = engagementService;
    }

    @GetMapping
    public List<Engagement> getAllEngagements() {
        return engagementService.getAllEngagements();
    }

    @PostMapping
    public Engagement createEngagement(
            @RequestBody EngagementRequest request) {

        return engagementService.createEngagement(request);
    }
}
