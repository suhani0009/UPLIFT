package com.uplift.upliftbackend.controller;

import com.uplift.upliftbackend.dto.PaymentTransactionRequest;
import com.uplift.upliftbackend.entity.PaymentTransaction;
import com.uplift.upliftbackend.service.PaymentTransactionService;
import com.uplift.upliftbackend.dto.TransactionStatusRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class PaymentTransactionController {

    private final PaymentTransactionService paymentTransactionService;

    public PaymentTransactionController(PaymentTransactionService paymentTransactionService) {
        this.paymentTransactionService = paymentTransactionService;
    }

    @GetMapping
    public List<PaymentTransaction> getAllTransactions() {
        return paymentTransactionService.getAllTransactions();
    }

    @GetMapping("/{id}")
    public PaymentTransaction getTransactionById(@PathVariable Long id) {
        return paymentTransactionService.getTransactionById(id);
    }

    @PostMapping
    public PaymentTransaction createTransaction(
            @RequestBody PaymentTransactionRequest request) {

        return paymentTransactionService.createTransaction(request);
    }
    @PutMapping("/{id}/status")
    public PaymentTransaction updateStatus(
            @PathVariable Long id,
            @RequestBody TransactionStatusRequest request) {

        return paymentTransactionService.updateStatus(id, request);
    }
}
