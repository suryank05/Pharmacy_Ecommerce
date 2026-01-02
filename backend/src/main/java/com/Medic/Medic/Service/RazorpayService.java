package com.Medic.Medic.Service;

import java.util.Map;

import com.Medic.Medic.Dto.RazorpayRequestDTO;

public interface RazorpayService {
    Map<String, Object> createRazorpayOrder(RazorpayRequestDTO request);
}
