package com.Medic.Medic.Dto;

import lombok.Data;

@Data
public class OrderItemRequest {
    private Long medicineId;
    private Integer quantity;
    private Double price;
}