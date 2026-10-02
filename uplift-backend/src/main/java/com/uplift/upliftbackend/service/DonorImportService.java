package com.uplift.upliftbackend.service;

import com.uplift.upliftbackend.dto.DonorImportRow;
import com.uplift.upliftbackend.dto.ImportResult;
import com.uplift.upliftbackend.entity.Donor;
import com.uplift.upliftbackend.repository.DonationRepository;
import com.uplift.upliftbackend.repository.DonorRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import com.uplift.upliftbackend.dto.ImportPreviewResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.uplift.upliftbackend.dto.ColumnMapping;
import com.uplift.upliftbackend.entity.Donation;

import java.math.BigDecimal;
import com.uplift.upliftbackend.entity.PaymentTransaction;
import com.uplift.upliftbackend.repository.PaymentTransactionRepository;

@Service
public class DonorImportService {

    private final DonorRepository donorRepository;
    private final DonationRepository donationRepository;
    private final PaymentTransactionRepository paymentTransactionRepository;

    public DonorImportService(
            DonorRepository donorRepository,
            DonationRepository donationRepository,
            PaymentTransactionRepository paymentTransactionRepository) {

        this.donorRepository = donorRepository;
        this.donationRepository = donationRepository;
        this.paymentTransactionRepository = paymentTransactionRepository;
    }

    // =========================
    // CSV IMPORT
    // =========================

    public ImportResult readCsv(MultipartFile file) throws Exception {

        int totalRows = 0;
        int imported = 0;
        int duplicates = 0;
        int invalid = 0;

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                        file.getInputStream(),
                        StandardCharsets.UTF_8))) {

            CSVParser parser = CSVFormat.DEFAULT
                    .builder()
                    .setHeader()
                    .setSkipHeaderRecord(true)
                    .get()
                    .parse(reader);

            for (CSVRecord record : parser) {

                totalRows++;

                DonorImportRow row = new DonorImportRow();

                row.setName(record.get("name"));
                row.setEmail(record.get("email"));
                row.setPhone(record.get("phone"));
                row.setDonorType(record.get("donorType"));
                row.setAddress(record.get("address"));
                row.setCity(record.get("city"));
                row.setState(record.get("state"));
                row.setPincode(record.get("pincode"));

                if (record.isMapped("anonymous")) {
                    String anonymousValue = record.get("anonymous");

                    if (anonymousValue != null && !anonymousValue.isBlank()) {
                        row.setAnonymous(Boolean.parseBoolean(anonymousValue));
                    } else {
                        row.setAnonymous(false);
                    }
                } else {
                    row.setAnonymous(false);
                }

                boolean hasEmail =
                        row.getEmail() != null &&
                                !row.getEmail().isBlank();

                boolean hasPhone =
                        row.getPhone() != null &&
                                !row.getPhone().isBlank();

                if (!hasEmail && !hasPhone) {
                    invalid++;
                    continue;
                }

                Donor donor = new Donor();

                donor.setName(row.getName());
                donor.setEmail(row.getEmail());
                donor.setPhone(row.getPhone());
                donor.setDonorType(row.getDonorType());
                donor.setAddress(row.getAddress());
                donor.setCity(row.getCity());
                donor.setState(row.getState());
                donor.setPincode(row.getPincode());
                donor.setAnonymous(row.getAnonymous());

                boolean duplicateEmail =
                        row.getEmail() != null &&
                                !row.getEmail().isBlank() &&
                                donorRepository.findByEmail(row.getEmail()).isPresent();

                boolean duplicatePhone =
                        row.getPhone() != null &&
                                !row.getPhone().isBlank() &&
                                donorRepository.findByPhone(row.getPhone()).isPresent();

                if (!duplicateEmail && !duplicatePhone) {
                    donorRepository.save(donor);
                    imported++;
                } else {
                    duplicates++;
                }
            }
        }

        return new ImportResult(
                totalRows,
                imported,
                duplicates,
                invalid
        );
    }


    // =========================
    // EXCEL IMPORT
    // =========================

    public ImportPreviewResponse previewCsv(MultipartFile file) throws Exception {

        List<String> columns = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                        file.getInputStream(),
                        StandardCharsets.UTF_8))) {

            CSVParser parser = CSVFormat.DEFAULT
                    .builder()
                    .setHeader()
                    .setSkipHeaderRecord(true)
                    .get()
                    .parse(reader);

            columns.addAll(parser.getHeaderNames());
        }

        return new ImportPreviewResponse(
                file.getOriginalFilename(),
                columns
        );
    }

    public ImportResult readExcel(MultipartFile file) throws Exception {

        int totalRows = 0;
        int imported = 0;
        int duplicates = 0;
        int invalid = 0;

        try (InputStream inputStream = file.getInputStream();
             Workbook workbook = WorkbookFactory.create(inputStream)) {

            Sheet sheet = workbook.getSheetAt(0);

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {

                Row excelRow = sheet.getRow(i);

                if (excelRow == null) {
                    continue;
                }

                totalRows++;

                DataFormatter formatter = new DataFormatter();

                String name = formatter.formatCellValue(excelRow.getCell(0));
                String email = formatter.formatCellValue(excelRow.getCell(1));
                String phone = formatter.formatCellValue(excelRow.getCell(2));
                String donorType = formatter.formatCellValue(excelRow.getCell(3));
                String address = formatter.formatCellValue(excelRow.getCell(4));
                String city = formatter.formatCellValue(excelRow.getCell(5));
                String state = formatter.formatCellValue(excelRow.getCell(6));
                String pincode = formatter.formatCellValue(excelRow.getCell(7));

                String anonymousValue =
                        formatter.formatCellValue(excelRow.getCell(8));

                boolean anonymous =
                        Boolean.parseBoolean(anonymousValue);

                // Validation
                if ((email == null || email.isBlank()) &&
                        (phone == null || phone.isBlank())) {

                    invalid++;
                    continue;
                }

                // Duplicate check
                boolean duplicateEmail =
                        email != null &&
                                !email.isBlank() &&
                                donorRepository.findByEmail(email).isPresent();

                boolean duplicatePhone =
                        phone != null &&
                                !phone.isBlank() &&
                                donorRepository.findByPhone(phone).isPresent();

                if (duplicateEmail || duplicatePhone) {
                    duplicates++;
                    continue;
                }

                // Create donor
                Donor donor = new Donor();

                donor.setName(name);
                donor.setEmail(email);
                donor.setPhone(phone);
                donor.setDonorType(donorType);
                donor.setAddress(address);
                donor.setCity(city);
                donor.setState(state);
                donor.setPincode(pincode);
                donor.setAnonymous(anonymous);

                donorRepository.save(donor);
                imported++;
            }
        }

        return new ImportResult(
                totalRows,
                imported,
                duplicates,
                invalid
        );
    }
    private String getMappedValue(
            CSVRecord record,
            List<ColumnMapping> mappings,
            String targetField) {

        for (ColumnMapping mapping : mappings) {

            if (mapping.getTargetField().equals(targetField)) {

                return record.get(mapping.getSourceColumn());
            }
        }

        return null;
    }

    public ImportResult importCsvWithMapping(
            MultipartFile file,
            List<ColumnMapping> mappings) throws Exception {

        int totalRows = 0;
        int imported = 0;
        int duplicates = 0;
        int invalid = 0;

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                        file.getInputStream(),
                        StandardCharsets.UTF_8))) {

            CSVParser parser = CSVFormat.DEFAULT
                    .builder()
                    .setHeader()
                    .setSkipHeaderRecord(true)
                    .get()
                    .parse(reader);

            for (CSVRecord record : parser) {

                totalRows++;

                String name = getMappedValue(record, mappings, "name");
                String email = getMappedValue(record, mappings, "email");
                String phone = getMappedValue(record, mappings, "phone");
                String city = getMappedValue(record, mappings, "city");

                if ((email == null || email.isBlank()) &&
                        (phone == null || phone.isBlank())) {

                    invalid++;
                    continue;
                }

                boolean duplicateEmail =
                        email != null &&
                                !email.isBlank() &&
                                donorRepository.findByEmail(email).isPresent();

                boolean duplicatePhone =
                        phone != null &&
                                !phone.isBlank() &&
                                donorRepository.findByPhone(phone).isPresent();

                if (duplicateEmail || duplicatePhone) {
                    duplicates++;
                    continue;
                }

                Donor donor = new Donor();

                donor.setName(name);
                donor.setEmail(email);
                donor.setPhone(phone);
                donor.setCity(city);
                donor.setAnonymous(false);

                donorRepository.save(donor);

                imported++;
            }
        }
        return new ImportResult(
                totalRows,
                imported,
                duplicates,
                invalid
        );
    }
    public ImportResult importDonationsWithMapping(
            MultipartFile file,
            List<ColumnMapping> mappings) throws Exception {

        int totalRows = 0;
        int imported = 0;
        int invalid = 0;
        int duplicates = 0;

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                        file.getInputStream(),
                        StandardCharsets.UTF_8))) {

            CSVParser parser = CSVFormat.DEFAULT
                    .builder()
                    .setHeader()
                    .setSkipHeaderRecord(true)
                    .get()
                    .parse(reader);

            for (CSVRecord record : parser) {

                totalRows++;

                String donorEmail =
                        getMappedValue(record, mappings, "donorEmail");

                String amountValue =
                        getMappedValue(record, mappings, "amount");

                String dateValue =
                        getMappedValue(record, mappings, "donationDate");

                String paymentMethod =
                        getMappedValue(record, mappings, "paymentMethod");

                String category =
                        getMappedValue(record, mappings, "category");

                if (donorEmail == null || donorEmail.isBlank()
                        || amountValue == null || amountValue.isBlank()) {

                    invalid++;
                    continue;
                }

                Donor donor = donorRepository
                        .findByEmail(donorEmail)
                        .orElse(null);

                if (donor == null) {
                    invalid++;
                    continue;
                }

                BigDecimal amount = new BigDecimal(amountValue);

                LocalDateTime donationDate = null;

                if (dateValue != null && !dateValue.isBlank()) {
                    donationDate = LocalDate.parse(dateValue).atStartOfDay();
                }

// Check whether this donation already exists
                if (donationRepository
                        .findByDonorDonorIdAndAmountAndDonationDate(
                                donor.getDonorId(),
                                amount,
                                donationDate
                        )
                        .isPresent()) {

                    duplicates++;
                    continue;
                }

                Donation donation = new Donation();

                donation.setDonor(donor);
                donation.setAmount(amount);
                donation.setPaymentMethod(paymentMethod);
                donation.setDonationCategory(category);
                donation.setDonationDate(donationDate);
                donation.setStatus("IMPORTED");
                donation.setSource("CSV");

                donationRepository.save(donation);

                imported++;
            }
        }

        return new ImportResult(
                totalRows,
                imported,
                duplicates,
                invalid
        );
    }
    public ImportResult importTransactionsWithMapping(
            MultipartFile file,
            List<ColumnMapping> mappings) throws Exception {

        int totalRows = 0;
        int imported = 0;
        int duplicates = 0;
        int invalid = 0;

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                        file.getInputStream(),
                        StandardCharsets.UTF_8))) {

            CSVParser parser = CSVFormat.DEFAULT
                    .builder()
                    .setHeader()
                    .setSkipHeaderRecord(true)
                    .get()
                    .parse(reader);

            for (CSVRecord record : parser) {

                totalRows++;

                String transactionReference =
                        getMappedValue(
                                record,
                                mappings,
                                "transactionReference"
                        );

                String donorEmail =
                        getMappedValue(
                                record,
                                mappings,
                                "donorEmail"
                        );

                String amountValue =
                        getMappedValue(
                                record,
                                mappings,
                                "amount"
                        );

                String dateValue =
                        getMappedValue(
                                record,
                                mappings,
                                "transactionDate"
                        );

                String paymentStatus =
                        getMappedValue(
                                record,
                                mappings,
                                "paymentStatus"
                        );

                if (transactionReference == null
                        || transactionReference.isBlank()
                        || donorEmail == null
                        || donorEmail.isBlank()
                        || amountValue == null
                        || amountValue.isBlank()) {

                    invalid++;
                    continue;
                }

                if (paymentTransactionRepository
                        .findByGatewayReference(transactionReference)
                        .isPresent()) {

                    duplicates++;
                    continue;
                }

                Donor donor = donorRepository
                        .findByEmail(donorEmail)
                        .orElse(null);

                if (donor == null) {
                    invalid++;
                    continue;
                }

                BigDecimal amount = new BigDecimal(amountValue);

                LocalDateTime transactionDate = null;

                if (dateValue != null && !dateValue.isBlank()) {
                    transactionDate =
                            LocalDate.parse(dateValue).atStartOfDay();
                }

                // Find the corresponding donation
                Donation donation = donationRepository
                        .findByDonorDonorIdAndAmountAndDonationDate(
                                donor.getDonorId(),
                                amount,
                                transactionDate
                        )
                        .orElse(null);

                if (donation == null) {
                    invalid++;
                    continue;
                }

                PaymentTransaction transaction =
                        new PaymentTransaction();

                transaction.setDonation(donation);
                transaction.setGatewayReference(transactionReference);
                transaction.setAmount(amount);
                transaction.setTransactionDate(transactionDate);
                transaction.setPaymentStatus(paymentStatus);
                transaction.setVerificationStatus("PENDING");
                transaction.setReconciliationStatus("PENDING");
                transaction.setSource("CSV");

                paymentTransactionRepository.save(transaction);

                imported++;
            }
        }

        return new ImportResult(
                totalRows,
                imported,
                duplicates,
                invalid
        );
    }
}