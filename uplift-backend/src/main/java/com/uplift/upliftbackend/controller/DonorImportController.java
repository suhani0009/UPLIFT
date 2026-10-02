package com.uplift.upliftbackend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uplift.upliftbackend.dto.ColumnMappingRequest;
import com.uplift.upliftbackend.dto.ImportResult;
import com.uplift.upliftbackend.service.DonorImportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.uplift.upliftbackend.dto.ImportPreviewResponse;


import com.uplift.upliftbackend.dto.ImportResult;
import org.springframework.http.MediaType;


@RestController
@RequestMapping("/api/import")
public class DonorImportController {

    private final DonorImportService donorImportService;

    public DonorImportController(DonorImportService donorImportService) {
        this.donorImportService = donorImportService;
    }

    @PostMapping("/donors")
    public ResponseEntity<ImportResult> importDonors(
            @RequestParam("file") MultipartFile file) throws Exception {

        ImportResult result =
                donorImportService.readCsv(file);

        return ResponseEntity.ok(result);
    }
    @PostMapping("/donors/excel")
    public ResponseEntity<ImportResult> importDonorsExcel(
            @RequestParam("file") MultipartFile file) throws Exception {

        ImportResult result =
                donorImportService.readExcel(file);

        return ResponseEntity.ok(result);
    }
    @PostMapping("/preview")
    public ResponseEntity<ImportPreviewResponse> previewFile(
            @RequestParam("file") MultipartFile file) throws Exception {

        ImportPreviewResponse response =
                donorImportService.previewCsv(file);

        return ResponseEntity.ok(response);
    }
    @PostMapping("/test-mapping")
    public ResponseEntity<ColumnMappingRequest> testMapping(
            @RequestBody ColumnMappingRequest request) {

        return ResponseEntity.ok(request);
    }
    @PostMapping(
            value = "/donors/mapped",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ImportResult> importMappedDonors(
            @RequestPart("file") MultipartFile file,
            @RequestPart("mapping") String mappingJson) throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        ColumnMappingRequest request =
                objectMapper.readValue(
                        mappingJson,
                        ColumnMappingRequest.class
                );

        ImportResult result =
                donorImportService.importCsvWithMapping(
                        file,
                        request.getMappings()
                );

        return ResponseEntity.ok(result);
    }
    @PostMapping(
            value = "/donations/mapped",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ImportResult> importMappedDonations(
            @RequestPart("file") MultipartFile file,
            @RequestPart("mapping") String mappingJson) throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        ColumnMappingRequest request =
                objectMapper.readValue(
                        mappingJson,
                        ColumnMappingRequest.class
                );

        ImportResult result =
                donorImportService.importDonationsWithMapping(
                        file,
                        request.getMappings()
                );

        return ResponseEntity.ok(result);
    }
    @PostMapping(
            value = "/transactions/mapped",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ImportResult> importMappedTransactions(
            @RequestPart("file") MultipartFile file,
            @RequestPart("mapping") String mappingJson) throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        ColumnMappingRequest request =
                objectMapper.readValue(
                        mappingJson,
                        ColumnMappingRequest.class
                );

        ImportResult result =
                donorImportService.importTransactionsWithMapping(
                        file,
                        request.getMappings()
                );

        return ResponseEntity.ok(result);
    }
}
