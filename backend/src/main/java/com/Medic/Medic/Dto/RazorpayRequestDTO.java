package com.Medic.Medic.Dto;

import lombok.Data;

@Data
public class RazorpayRequestDTO {
    private Double amount;
    private String currency;
    private String receipt;
}
