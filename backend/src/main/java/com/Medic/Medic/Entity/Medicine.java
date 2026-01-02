package com.Medic.Medic.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "medicine")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String sideEffects;
    
    @Column(columnDefinition = "TEXT")
    private String warnings;

    @Column(name = "usage_info", columnDefinition = "TEXT")
    private String usage;

    private Double price;
    
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "pharmacy_id", nullable = true)
    private Pharmacy pharmacy;
}
