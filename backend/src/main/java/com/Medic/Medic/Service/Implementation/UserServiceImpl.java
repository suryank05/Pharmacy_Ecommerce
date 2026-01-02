package com.Medic.Medic.Service.Implementation;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.Medic.Medic.Entity.Pharmacy;
import com.Medic.Medic.Entity.User;
import com.Medic.Medic.Repository.PharmacyRepository;
import com.Medic.Medic.Repository.UserRepository;
import com.Medic.Medic.Service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PharmacyRepository pharmacyRepository;
    
    @Autowired
    private EmailService emailService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public User registerUser(User user) {

        user.setUsername(user.getEmailId());
        user.setRole("ROLE_USER");
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    @Override
    public User registerPharmacy(User user) {

        user.setUsername(user.getEmailId());
        user.setRole("ROLE_PHARMACY");
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the pharmacy user
        User savedUser = userRepository.save(user);

        // Create a pharmacy entry linked to saved user
        Pharmacy pharmacy = new Pharmacy();
        pharmacy.setPharmacyName(savedUser.getUsername() + "'s Store");
        pharmacy.setEmail("Not Provided");
        pharmacy.setUser(savedUser);

        pharmacyRepository.save(pharmacy);

        return savedUser;
    }
    
    public void forgetPassword(String email) {
    	User userentity = userRepository.findByEmailId(email)
    	        .orElseThrow(() -> new RuntimeException("Email not found"));

    	// Generate password reset token
    	String resetToken = UUID.randomUUID().toString();

    	// Set token and expiry on the instance
    	userentity.setPasswordResetToken(resetToken);
    	userentity.setPasswordResetTokenExpiry(Timestamp.valueOf(LocalDateTime.now().plusHours(1)));

    	userRepository.save(userentity);

    	// Send password reset email
    	try {
    	    emailService.sendPasswordResetEmail(email, resetToken);
    	} catch (Exception e) {
    	    throw new RuntimeException("Failed to send password reset email", e);
    	}
	}

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElse(null);
    }
    
    @Override
    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findAll().stream()
            .filter(u -> token.equals(u.getPasswordResetToken()))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Invalid or expired reset token"));
            
        // Check if token is expired (1 hour)
        if (user.getPasswordResetTokenExpiry().before(new java.util.Date())) {
            throw new RuntimeException("Reset token has expired");
        }
        
        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setPasswordResetToken(null);
        user.setPasswordResetTokenExpiry(null);
        
        userRepository.save(user);
    }
}
