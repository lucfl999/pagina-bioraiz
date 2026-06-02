/**
 * BIORAIZ — API Client
 * Comunicación con backend Express en Railway
 */

const API_BASE = 'https://pagina-bioraiz-production.up.railway.app/api';

const ApiClient = {
    /**
     * Enviar email vía Brevo
     */
    async sendEmail(data) {
        try {
            const response = await fetch(`${API_BASE}/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('sendEmail error:', error);
            throw error;
        }
    },

    /**
     * Suscribirse a newsletter
     */
    async subscribe(email) {
        try {
            const response = await fetch(`${API_BASE}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('subscribe error:', error);
            throw error;
        }
    },

    /**
     * Verificar salud del servidor
     */
    async health() {
        try {
            const response = await fetch(`${API_BASE.replace('/api', '')}/health`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('health check error:', error);
            return null;
        }
    },

    /**
     * Enviar formulario de expositor
     */
    async submitExhibitorForm(formData) {
        try {
            const response = await fetch(`${API_BASE}/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: BZ_DATA.contact.email,
                    subject: `Nueva solicitud de expositor: ${formData.nombre}`,
                    template: 'exhibitor_request',
                    params: formData,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('submitExhibitorForm error:', error);
            throw error;
        }
    },

    /**
     * Enviar formulario de voluntario
     */
    async submitVolunteerForm(formData) {
        try {
            const response = await fetch(`${API_BASE}/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: BZ_DATA.contact.email,
                    subject: `Nueva solicitud de voluntario: ${formData.nombre}`,
                    template: 'volunteer_request',
                    params: formData,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('submitVolunteerForm error:', error);
            throw error;
        }
    },
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.ApiClient = ApiClient;
}
