package com.Medic.Medic.Dto;

import java.util.List;

import lombok.Data;

@Data
public class OrderRequest {
    private List<OrderItemRequest> items;
    private Double totalAmount;
}