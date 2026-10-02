package com.uplift.upliftbackend.service;

import com.uplift.upliftbackend.repository.ContributionRequestRepository;
import com.uplift.upliftbackend.entity.Donor;
import com.uplift.upliftbackend.repository.DonorRepository;
import org.springframework.stereotype.Service;
import com.uplift.upliftbackend.dto.Donor360Response;
import com.uplift.upliftbackend.entity.Donation;
import com.uplift.upliftbackend.repository.DonationRepository;
import java.math.BigDecimal;
import com.uplift.upliftbackend.dto.DonationSummary;
import com.uplift.upliftbackend.repository.PaymentTransactionRepository;
import com.uplift.upliftbackend.repository.CommunicationRepository;
import com.uplift.upliftbackend.dto.CommunicationSummary;
import com.uplift.upliftbackend.entity.Communication;
import com.uplift.upliftbackend.entity.Engagement;
import com.uplift.upliftbackend.repository.EngagementRepository;
import com.uplift.upliftbackend.dto.EngagementSummary;

import java.util.List;
import com.uplift.upliftbackend.dto.ContributionRequestSummary;
import com.uplift.upliftbackend.entity.ContributionRequest;

@Service
public class DonorService {

    private final DonorRepository donorRepository;
    private final DonationRepository donationRepository;
    private final PaymentTransactionRepository paymentTransactionRepository;
    private final CommunicationRepository communicationRepository;
    private final EngagementRepository engagementRepository;
    private final ContributionRequestRepository contributionRequestRepository;

    public DonorService(
            DonorRepository donorRepository,
            DonationRepository donationRepository,
            PaymentTransactionRepository paymentTransactionRepository,
            CommunicationRepository communicationRepository,
            EngagementRepository engagementRepository,
            ContributionRequestRepository contributionRequestRepository) {

        this.donorRepository = donorRepository;
        this.donationRepository = donationRepository;
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.communicationRepository = communicationRepository;
        this.engagementRepository = engagementRepository;
        this.contributionRequestRepository = contributionRequestRepository;
    }

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    public Donor getDonorById(Long id) {
        return donorRepository.findById(id).orElse(null);
    }

    public Donor createDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    public Donor360Response getDonor360(Long donorId) {

        Donor donor = donorRepository.findById(donorId)
                .orElseThrow(() -> new RuntimeException("Donor not found"));

        List<Donation> donations =
                donationRepository.findByDonorDonorId(donorId);

        BigDecimal totalDonated = donations.stream()
                .map(Donation::getAmount)
                .filter(amount -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<DonationSummary> donationSummaries = donations.stream()
                .map(donation -> {
                    DonationSummary summary = new DonationSummary();

                    summary.setDonationId(donation.getDonationId());
                    summary.setAmount(donation.getAmount());
                    summary.setDonationDate(donation.getDonationDate());
                    summary.setDonationCategory(donation.getDonationCategory());
                    summary.setDonationType(donation.getDonationType());
                    summary.setPaymentMethod(donation.getPaymentMethod());
                    summary.setStatus(donation.getStatus());
                    summary.setSource(donation.getSource());

                    if (donation.getCentre() != null) {
                        summary.setCentreName(donation.getCentre().getCentreName());
                    }

                    paymentTransactionRepository
                            .findByDonationDonationId(donation.getDonationId())
                            .ifPresent(transaction -> {
                                summary.setPaymentStatus(transaction.getPaymentStatus());
                                summary.setVerificationStatus(transaction.getVerificationStatus());
                                summary.setReconciliationStatus(transaction.getReconciliationStatus());
                            });

                    return summary;
                })
                .toList();

        List<Communication> communications =
                communicationRepository.findByDonorDonorId(donorId);

        List<CommunicationSummary> communicationSummaries =
                communications.stream()
                        .map(communication -> {
                            CommunicationSummary summary =
                                    new CommunicationSummary();

                            summary.setCommunicationId(
                                    communication.getCommunicationId());

                            summary.setCommunicationType(
                                    communication.getCommunicationType());

                            summary.setMessage(
                                    communication.getMessage());

                            summary.setCommunicationDate(
                                    communication.getCommunicationDate());

                            summary.setStatus(
                                    communication.getStatus());

                            return summary;
                        })
                        .toList();

        List<Engagement> engagements =
                engagementRepository.findByDonorDonorId(donorId);

        List<EngagementSummary> engagementSummaries =
                engagements.stream()
                        .map(engagement -> {
                            EngagementSummary summary =
                                    new EngagementSummary();

                            summary.setEngagementId(
                                    engagement.getEngagementId());

                            summary.setActivityType(
                                    engagement.getActivityType());

                            summary.setCampaignName(
                                    engagement.getCampaignName());

                            summary.setEngagementDate(
                                    engagement.getEngagementDate());

                            summary.setStatus(
                                    engagement.getStatus());

                            summary.setNotes(
                                    engagement.getNotes());

                            return summary;
                        })
                        .toList();
        List<ContributionRequest> contributionRequests =
                contributionRequestRepository.findByDonorDonorId(donorId);

        List<ContributionRequestSummary> contributionSummaries =
                contributionRequests.stream()
                        .map(request -> {
                            ContributionRequestSummary summary =
                                    new ContributionRequestSummary();

                            summary.setRequestId(request.getRequestId());
                            summary.setCategory(request.getCategory());
                            summary.setQuantity(request.getQuantity());
                            summary.setDescription(request.getDescription());
                            summary.setRemarks(request.getRemarks());
                            summary.setStatus(request.getStatus());
                            summary.setCreatedAt(request.getCreatedAt());

                            return summary;
                        })
                        .toList();

        Donor360Response response = new Donor360Response();

        response.setDonorId(donor.getDonorId());
        response.setName(donor.getName());
        response.setEmail(donor.getEmail());
        response.setPhone(donor.getPhone());
        response.setDonorType(donor.getDonorType());
        response.setTotalDonated(totalDonated);
        response.setTotalDonations(donations.size());

        response.setDonations(donationSummaries);
        response.setCommunications(communicationSummaries);
        response.setEngagements(engagementSummaries);
        response.setContributions(contributionSummaries);

        return response;
    }
}
