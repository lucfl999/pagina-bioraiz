// Configuración de API para BIORAIZ
window.API_CONFIG = {
  BASE_URL: 'https://pagina-bioraiz-production.up.railway.app',
  ENDPOINTS: {
    SEND_EMAIL: '/api/send-email',
    SUBSCRIBE: '/api/subscribe',
    HEALTH: '/health'
  }
};

// Helper para hacer peticiones a la API
window.apiCall = async (endpoint, method = 'POST', data = null) => {
  const url = window.API_CONFIG.BASE_URL + window.API_CONFIG.ENDPOINTS[endpoint];
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Error en la petición');
    }
    
    return result;
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    throw error;
  }
};

// Ejemplo de uso en el HTML:
// await window.apiCall('SUBSCRIBE', 'POST', {
//   email: 'usuario@example.com',
//   firstName: 'Juan'
// });
