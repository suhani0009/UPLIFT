package com.uplift.upliftbackend.controller;

import com.uplift.upliftbackend.entity.Donor;
import com.uplift.upliftbackend.service.DonorService;
import org.springframework.web.bind.annotation.*;
import com.uplift.upliftbackend.dto.Donor360Response;
import com.uplift.upliftbackend.dto.DonorRequest;
import java.util.List;

@RestController
@RequestMapping("/api/donors")
public class DonorController {

    private final DonorService donorService;

    public DonorController(DonorService donorService) {
        this.donorService = donorService;
    }

    @GetMapping
    public List<Donor> getAllDonors() {
        return donorService.getAllDonors();
    }

    @GetMapping("/{id}")
    public Donor getDonorById(@PathVariable Long id) {
        return donorService.getDonorById(id);
    }

    @PostMapping
    public Donor createDonor(@RequestBody DonorRequest request) {
        Donor donor = new Donor();

        donor.setName(request.getName());
        donor.setEmail(request.getEmail());
        donor.setPhone(request.getPhone());
        donor.setDonorType(request.getDonorType());
        donor.setAddress(request.getAddress());
        donor.setCity(request.getCity());
        donor.setState(request.getState());
        donor.setPincode(request.getPincode());
        donor.setAnonymous(request.isAnonymous());

        return donorService.createDonor(donor);
    }
    @GetMapping("/{id}/360")
    public Donor360Response getDonor360(@PathVariable Long id) {
        return donorService.getDonor360(id);
    }
}
