import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
};

export const userAPI = {
  getProfile: () => API.get('/users/profile'),
  updateProfile: (data) => API.put('/users/update', data),
  completeOnboarding: () => API.post('/users/onboarding-complete'),
};

export const memorialAPI = {
  getAll: (params) => API.get('/memorials', { params }),
  getById: (id) => API.get(`/memorials/${id}`),
};

export const reservationAPI = {
  getUserReservations: () => API.get('/reservations/user-reservations'),
  create: (data) => API.post('/reservations/create', data),
};

export const favoriteAPI = {
  getAll: () => API.get('/favorites'),
  add: (memorial_id) => API.post('/favorites/add', { memorial_id }),
  remove: (id) => API.delete(`/favorites/remove/${id}`),
};

export const paymentAPI = {
  getAll: () => API.get('/payments'),
  create: (reservation_id) => API.post('/payments/create', { reservation_id }),
};

export default API;
