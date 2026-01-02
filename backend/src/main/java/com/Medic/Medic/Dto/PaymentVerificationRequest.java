package com.Medic.Medic.Dto;

import lombok.Data;

@Data
public class PaymentVerificationRequest {
    private String paymentId;
    private String orderId;
    private String signature;
    private Long orderEntityId;
}