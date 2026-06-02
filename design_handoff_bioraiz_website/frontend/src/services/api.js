import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Forms
export const submitContactForm = async (data) => {
  return api.post('/forms/contact', data);
};

export const submitParticipationForm = async (data) => {
  return api.post('/forms/participa', data);
};

export const submitPressKitForm = async (data) => {
  return api.post('/forms/press-kit', data);
};

// Subscribers
export const subscribeNewsletter = async (email) => {
  return api.post('/subscribers', { email });
};

export const notifySubscribers = async (subject, content) => {
  return api.post('/subscribers/notify-all', { subject, content });
};

// Tickets
export const createTicketCheckout = async (ticketData) => {
  return api.post('/tickets/create', ticketData);
};

export default api;
