import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ── Company Info ──────────────────────────────────────
export const getCompanyInfo = async () => {
    const response = await api.get('company-info/');
    return response.data;
};

// ── Businesses (public) ───────────────────────────────
export const getBusinesses = async () => {
    const response = await api.get('businesses/');
    return response.data;
};

// ── Businesses (admin — all including hidden) ─────────
export const getAllBusinesses = async () => {
    const response = await api.get('businesses/all/');
    return response.data;
};

export const createBusiness = async (data) => {
    const response = await api.post('businesses/', data);
    return response.data;
};

export const updateBusiness = async (id, data) => {
    const response = await api.put(`businesses/${id}/`, data);
    return response.data;
};

export const deleteBusiness = async (id) => {
    const response = await api.delete(`businesses/${id}/`);
    return response.data;
};

export const toggleBusiness = async (id) => {
    const response = await api.patch(`businesses/${id}/toggle/`);
    return response.data;
};

// ── Enquiries ─────────────────────────────────────────
export const submitEnquiry = async (data) => {
    const response = await api.post('enquiries/', data);
    return response.data;
};

export const getEnquiries = async () => {
    const response = await api.get('enquiries/');
    return response.data;
};

export const syncEnquiryToSheets = async (id) => {
    const response = await api.post(`enquiries/${id}/sync_to_sheets/`);
    return response.data;
};

export default api;

