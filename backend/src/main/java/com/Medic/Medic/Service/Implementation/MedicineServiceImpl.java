package com.Medic.Medic.Service.Implementation;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.Medic.Medic.Entity.Medicine;
import com.Medic.Medic.Entity.Pharmacy;
import com.Medic.Medic.Repository.MedicineRepo;
import com.Medic.Medic.Service.MedicineService;
import com.Medic.Medic.Service.PharmacyService;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepo medicineRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private PharmacyService pharmacyService;

    @Override
    public Medicine saveMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    @Override
    public Medicine fetchMedicineFromFDA(String name) {
        try {
            // Map common drug names to FDA-recognized names
            String fdaName = mapToFDAName(name);
            
            // Try multiple FDA API endpoints
            String[] urls = {
                "https://api.fda.gov/drug/label.json?search=openfda.brand_name:" + fdaName.replace(" ", "+") + "&limit=1",
                "https://api.fda.gov/drug/label.json?search=openfda.generic_name:" + fdaName.replace(" ", "+") + "&limit=1",
                "https://api.fda.gov/drug/label.json?search=" + fdaName.replace(" ", "+") + "&limit=1"
            };

            for (String url : urls) {
                try {
                    ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

                    if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                        Map<String, Object> data = response.getBody();
                        List<Map<String, Object>> results = (List<Map<String, Object>>) data.get("results");

                        if (results != null && !results.isEmpty()) {
                            Map<String, Object> item = results.get(0);

                            Medicine med = new Medicine();
                            med.setName(name);

                            med.setDescription(
                                extractField(item, "description", "Pain reliever and fever reducer")
                            );

                            med.setUsage(
                                extractField(item, "indications_and_usage", "For relief of minor aches and pains")
                            );

                            med.setWarnings(
                                extractField(item, "warnings", "Do not exceed recommended dosage")
                            );

                            return med;
                        }
                    }
                } catch (Exception e) {
                    System.out.println("Trying next FDA endpoint...");
                }
            }
        } catch (Exception ex) {
            System.out.println("FDA API Error: " + ex.getMessage());
        }

        // Return default medicine info if FDA fails
        return createDefaultMedicine(name);
    }
    
    private String mapToFDAName(String name) {
        // Map common international names to US FDA names
        switch (name.toLowerCase()) {
            case "paracetamol": return "acetaminophen";
            case "aspirin": return "aspirin";
            case "ibuprofen": return "ibuprofen";
            case "diclofenac": return "diclofenac";
            default: return name;
        }
    }
    
    private Medicine createDefaultMedicine(String name) {
        Medicine med = new Medicine();
        med.setName(name);
        med.setDescription("Medicine information not available from FDA database");
        med.setUsage("Please consult your healthcare provider for usage instructions");
        med.setWarnings("Please read package insert for warnings and precautions");
        return med;
    }

    private String extractField(Map<String, Object> item, String field, String defaultValue) {
        try {
            if (item.containsKey(field)) {
                Object value = item.get(field);
                if (value instanceof List && !((List<?>) value).isEmpty()) {
                    String result = ((List<String>) value).get(0);
                    // Truncate if too long to prevent database errors
                    return result.length() > 1000 ? result.substring(0, 1000) + "..." : result;
                }
            }
        } catch (Exception e) {
            System.out.println("Error extracting field " + field + ": " + e.getMessage());
        }
        return defaultValue;
    }

    @Override
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @Override
    public Medicine getMedicine(Long id) {
        return medicineRepository.findById(id).orElse(null);
    }

    @Override
    public Medicine updateMedicine(Long id, Medicine updated) {
        Medicine existing = getMedicine(id);
        if (existing == null) return null;

        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setUsage(updated.getUsage());
        existing.setWarnings(updated.getWarnings());
        existing.setSideEffects(updated.getSideEffects());

        return medicineRepository.save(existing);
    }

    @Override
    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }

    @Override
    public Medicine addMedicineForPharmacy(Medicine medicine, String username) {
        try {
            Pharmacy pharmacy = pharmacyService.getPharmacyByUsername(username);
            
            if (pharmacy != null) {
                medicine.setPharmacy(pharmacy);
            }
            // If no pharmacy found, save medicine without pharmacy association
            
            return medicineRepository.save(medicine);
        } catch (Exception e) {
            // If pharmacy lookup fails, save medicine without pharmacy association
            System.out.println("Warning: Could not associate medicine with pharmacy: " + e.getMessage());
            return medicineRepository.save(medicine);
        }
    }

    @Override
    public List<Medicine> getMedicinesByPharmacy(Long pharmacyId) {
        return medicineRepository.findByPharmacyId(pharmacyId);
    }
}
