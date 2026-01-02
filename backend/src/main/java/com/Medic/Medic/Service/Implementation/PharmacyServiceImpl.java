package com.Medic.Medic.Service.Implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.Medic.Medic.Entity.Pharmacy;
import com.Medic.Medic.Entity.User;
import com.Medic.Medic.Repository.PharmacyRepository;
import com.Medic.Medic.Repository.UserRepository;
import com.Medic.Medic.Service.PharmacyService;

@Service
public class PharmacyServiceImpl implements PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
  
    @Override
    public Pharmacy getPharmacyByUser(User user) {
        return pharmacyRepository.findByUser(user).orElse(null);
    }

    @Override
    public Pharmacy getPharmacyById(Long id) {
        return pharmacyRepository.findById(id).orElse(null);
    }

    @Override
    public Pharmacy getPharmacyByUsername(String username) {

        User user = userRepository.findByUsername(username)
                .orElse(null);

        if (user == null) {
            return null;
        }

        return pharmacyRepository.findByUser(user).orElse(null);
    }

    @Override
    public Pharmacy createPharmacy(Pharmacy pharmacy) {
        // Check if user already exists
        User existingUser = userRepository.findByUsername(pharmacy.getEmail()).orElse(null);
        
        User user;
        if (existingUser != null) {
            user = existingUser;
        } else {
            user = new User();
            user.setEmailId(pharmacy.getEmail());           
            user.setUsername(pharmacy.getEmail());
            user.setPassword(passwordEncoder.encode(pharmacy.getPassword()));
            user.setRole("ROLE_PHARMACY");
            user = userRepository.save(user);
        }

        // Attach User to Pharmacy
        pharmacy.setUser(user);

        // Save Pharmacy
        return pharmacyRepository.save(pharmacy);
    }
    
	@Override
	public List<Pharmacy> getAllPharmacy() {
		return pharmacyRepository.findAll();
		
	}
    
     
}
