import api from "./api";

/* Fetch medicine info from FDA */
export const fetchMedicineFromFDA = (name) => {
  return api.get(`/medicine/fetch/${name}`);
};

/* Add medicine (JWT REQUIRED) */
export const addMedicine = (medicine) => {
  return api.post("/medicine/add", medicine);
};

/* Get all medicines */
export const getAllMedicines = () => {
  return api.get("/medicine/all");
};

/* Get medicine by ID */
export const getMedicineById = (id) => {
  return api.get(`/medicine/${id}`);
};

/* Update medicine */
export const updateMedicine = (id, medicine) => {
  return api.put(`/medicine/update/${id}`, medicine);
};

/* Delete medicine */
export const deleteMedicine = (id) => {
  return api.delete(`/medicine/delete/${id}`);
};
