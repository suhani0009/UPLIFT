package com.uplift.upliftbackend.controller;

import com.uplift.upliftbackend.entity.Centre;
import com.uplift.upliftbackend.service.CentreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/centres")
public class CentreController {

    private final CentreService centreService;

    public CentreController(CentreService centreService) {
        this.centreService = centreService;
    }

    @GetMapping
    public List<Centre> getAllCentres() {
        return centreService.getAllCentres();
    }

    @GetMapping("/{id}")
    public Centre getCentreById(@PathVariable Long id) {
        return centreService.getCentreById(id);
    }

    @PostMapping
    public Centre createCentre(@RequestBody Centre centre) {
        return centreService.createCentre(centre);
    }
}
