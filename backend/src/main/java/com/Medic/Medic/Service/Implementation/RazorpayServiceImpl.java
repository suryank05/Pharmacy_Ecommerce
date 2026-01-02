package com.Medic.Medic.Service.Implementation;

import java.util.HashMap;
import java.util.Map;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.Medic.Medic.Dto.RazorpayRequestDTO;
import com.Medic.Medic.Service.RazorpayService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
public class RazorpayServiceImpl implements RazorpayService {

    @Value("${razorpay.key_id}")
    private String keyId;

    @Value("${razorpay.key_secret}")
    private String keySecret;

    @Override
    public Map<String, Object> createRazorpayOrder(RazorpayRequestDTO request) {
        try {
            RazorpayClient razorpay = new RazorpayClient(keyId, keySecret);
            
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", request.getAmount() * 100);
            orderRequest.put("currency", request.getCurrency());
            orderRequest.put("receipt", request.getReceipt());
            
            Order order = razorpay.orders.create(orderRequest);
            
            Map<String, Object> response = new HashMap<>();
            response.put("orderId", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));
            response.put("key", keyId);
            
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Razorpay order", e);
        }
    }
}
