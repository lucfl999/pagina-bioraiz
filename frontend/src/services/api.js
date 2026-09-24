import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL || '/api';
const API_URL = configuredApiUrl.replace(/\/$/, '').endsWith('/api')
  ? configuredApiUrl.replace(/\/$/, '')
  : `${configuredApiUrl.replace(/\/$/, '')}/api`;

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
// source: 'newsletter' | 'entradas' | 'grilla'
export const subscribeNewsletter = async (email, source = 'newsletter') => {
  return api.post('/subscribers', { email, source });
};

export const notifySubscribers = async (subject, content) => {
  return api.post('/subscribers/notify-all', { subject, content });
};

// Tickets
export const createTicketCheckout = async (ticketData) => {
  return api.post('/tickets/create', ticketData);
};

export const createTicketPreference = async (data) => {
  const { data: response } = await api.post('/tickets/create-preference', data);
  return response;
};

export default api;
