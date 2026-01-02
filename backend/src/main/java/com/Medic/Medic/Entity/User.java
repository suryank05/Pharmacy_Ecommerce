package com.Medic.Medic.Entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String emailId;
    
    @Column(name = "password_reset_token")
    private String passwordResetToken;

    @Column(name = "password_reset_token_expiry")
    private Timestamp passwordResetTokenExpiry;

    @Column(unique = true, nullable = false)
    private String username;

    private String password;

    private String role;
    
    @Column(nullable = false)
    private String fullName;
    
    @Column(nullable = false)
    private String dateOfBirth;
    
    @Column(nullable = false)
    private String phoneNumber;
    
    @Column(nullable = false)
    private String gender;
    
    private String address;
    
    public void setPasswordResetToken(String passwordResetToken) {
        this.passwordResetToken = passwordResetToken;
    }
    
    public void setPasswordResetTokenExpiry(Timestamp passwordResetTokenExpiry) {
        this.passwordResetTokenExpiry = passwordResetTokenExpiry;
    }
    
}
