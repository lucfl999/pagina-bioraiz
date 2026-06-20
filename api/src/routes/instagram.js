import express from 'express';
import axios from 'axios';

const router = express.Router();

// Configuración desde variables de entorno
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841435479434425';
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const CACHE_DURATION = 300; // 5 minutos en segundos (casi tiempo real)

// Validar que el token esté disponible
if (!INSTAGRAM_ACCESS_TOKEN) {
  console.warn('⚠️  INSTAGRAM_ACCESS_TOKEN no está configurado. Instagram Reels no funcionará.');
}

// Cache en memoria
let cachedReels = null;
let cacheTimestamp = null;

/**
 * GET /api/instagram/reels
 * Obtiene los últimos 3 posts de Instagram con caché de 1 hora
 */
router.get('/reels', async (req, res) => {
  try {
    // Verificar caché
    const now = Date.now();
    if (cachedReels && cacheTimestamp && (now - cacheTimestamp) < (CACHE_DURATION * 1000)) {
      console.log('✅ Instagram Reels desde caché');
      return res.json({
        status: 'ok',
        source: 'cache',
        data: cachedReels,
        cached_at: new Date(cacheTimestamp).toISOString()
      });
    }

    // Fetch desde Instagram Graph API
    console.log('🔄 Fetching Instagram Reels...');
    const instagramUrl = `https://graph.instagram.com/${INSTAGRAM_ACCOUNT_ID}/media?fields=id,caption,media_type,media_url,timestamp,permalink,thumbnail_url&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

    const response = await axios.get(instagramUrl);
    const instagramData = response.data;

    if (!instagramData.data) {
      throw new Error('No data from Instagram API');
    }

    // Procesar y formatear los últimos 3 posts
    const reels = instagramData.data
      .slice(0, 3)
      .map(post => {
        let thumbnail = '';
        
        // Para videos, intentar usar thumbnail_url; si no funciona, usar un placeholder
        // Para carousels e imágenes, usar media_url
        if (post.media_type === 'VIDEO' || post.media_type === 'REELS') {
          // Para videos, el thumbnail_url debería ser una imagen
          thumbnail = post.thumbnail_url || 
                     'https://via.placeholder.com/400x500/1A2812/BEIGE?text=Video+Preview';
        } else {
          // Para imágenes y carousels, usar la URL directa
          thumbnail = post.media_url || '';
        }
        
        return {
          id: post.id,
          thumbnail: thumbnail,
          permalink: post.permalink || `https://instagram.com/p/${post.id}`,
          caption: post.caption || '',
          timestamp: post.timestamp,
          media_type: post.media_type
        };
      });

    // Guardar en caché
    cachedReels = reels;
    cacheTimestamp = now;

    console.log(`✅ Instagram Reels actualizado: ${reels.length} posts`);

    res.json({
      status: 'ok',
      source: 'api',
      data: reels,
      cached_until: new Date(now + CACHE_DURATION * 1000).toISOString()
    });

  } catch (error) {
    console.error('Error fetching Instagram reels:', error.message);

    // Si falla totalmente, retornar caché si existe
    if (cachedReels) {
      return res.status(200).json({
        status: 'error_with_cache',
        message: error.message,
        data: cachedReels,
        cached_at: new Date(cacheTimestamp).toISOString()
      });
    }

    res.status(500).json({
      error: 'Failed to fetch Instagram reels',
      message: error.message
    });
  }
});

/**
 * GET /api/instagram/reels/clear-cache
 * Limpia el caché (útil para testing)
 */
router.get('/reels/clear-cache', (req, res) => {
  cachedReels = null;
  cacheTimestamp = null;
  console.log('🗑️ Instagram Reels caché limpiado');
  res.json({ status: 'ok', message: 'Cache cleared' });
});

export default router;
