import express from 'express';
import axios from 'axios';

const router = express.Router();

// Configuración desde variables de entorno con fallback seguro para producción
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841435479434425';
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || process.env.INSTAGRAM_TOKEN || 'IGAAjSqVbaKZBhBZAFpYZAVl1RVAxMHFPWjFQUlpnRFdPampVVTlaLVhyUDN5VUN0ekg1UV9kRTU4aW55dGV6cGNuenRIejUyUlRlZA2hxUDR1endTU0NzZAWRmWTE3amdyUUpYbjNUZAlNFRHJsQkdMQVdGcWdUTHlsNmpOSGFsd0x6TQZDZD';
const CACHE_DURATION = 300; // 5 minutos en segundos (casi tiempo real)

// Validar que el token esté disponible
if (!process.env.INSTAGRAM_ACCESS_TOKEN && !process.env.INSTAGRAM_TOKEN) {
  console.warn('⚠️  INSTAGRAM_ACCESS_TOKEN no está configurado; usando fallback temporal para producción.');
}

// Cache en memoria
let cachedReels = null;
let cacheTimestamp = null;
let cachedStories = null;
let storiesCacheTimestamp = null;

/**
 * GET /api/instagram/reels
 * Obtiene los últimos 3 posts de Instagram con caché de 1 minuto
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

    // Validar token
    if (!INSTAGRAM_ACCESS_TOKEN) {
      console.warn('⚠️ Token no configurado');
      return res.status(200).json({
        status: 'ok',
        source: 'fallback',
        data: [],
        message: 'Instagram token not configured'
      });
    }

    // Fetch desde Instagram Graph API
    console.log('🔄 Fetching Instagram Reels...');
    const instagramUrl = `https://graph.instagram.com/${INSTAGRAM_ACCOUNT_ID}/media?fields=id,caption,media_type,media_url,timestamp,permalink,thumbnail_url&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

    const response = await axios.get(instagramUrl, { timeout: 8000 });
    const instagramData = response.data;

    if (!instagramData.data || !Array.isArray(instagramData.data)) {
      console.warn('⚠️ No data returned from Instagram API');
      return res.status(200).json({
        status: 'ok',
        source: 'empty',
        data: [],
        message: 'No posts found'
      });
    }

    // Procesar y formatear los últimos 3 posts
    const reels = instagramData.data
      .slice(0, 3)
      .map(post => {
        try {
          let thumbnail = '';
          
          if (post.media_type === 'VIDEO' || post.media_type === 'REELS') {
            thumbnail = post.thumbnail_url || post.media_url || '';
          } else {
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
        } catch (e) {
          console.error('Error mapping post:', e.message);
          return null;
        }
      })
      .filter(p => p !== null);

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
    console.error('Error fetching Instagram reels:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });

    // Si Meta bloquea el acceso a la API Graph, devolvemos un resultado controlado
    // para que la web no se rompa en producción.
    if (cachedReels && cachedReels.length > 0) {
      return res.status(200).json({
        status: 'ok',
        source: 'cache_fallback',
        message: 'Using cached data due to API error',
        data: cachedReels,
        cached_at: new Date(cacheTimestamp).toISOString()
      });
    }

    // Retornar error pero con status 200 para evitar que el frontend rompa
    res.status(200).json({
      status: 'error',
      error: 'Failed to fetch Instagram reels',
      message: error.message,
      data: [],
      tip: 'Check Instagram API token and permissions'
    });
  }
});

/**
 * GET /api/instagram/stories
 * Endpoint para historias de Instagram (puede no tener datos según permisos de Graph API)
 */
router.get('/stories', async (req, res) => {
  try {
    const now = Date.now();
    
    // Retornar caché si existe y es reciente
    if (cachedStories && storiesCacheTimestamp && (now - storiesCacheTimestamp) < (CACHE_DURATION * 1000)) {
      console.log('✅ Instagram Stories desde caché');
      return res.json({
        status: 'ok',
        source: 'cache',
        data: cachedStories,
        cached_at: new Date(storiesCacheTimestamp).toISOString()
      });
    }

    // Instagram Graph API NO soporta historias directamente
    // Las historias requieren acceso especial y solo están disponibles via Instagram Basic Display API
    // Por ahora, retornamos array vacío pero con status OK
    console.log('ℹ️ Instagram Stories no disponibles via Graph API (limitación de Instagram)');
    
    cachedStories = [];
    storiesCacheTimestamp = now;

    res.json({
      status: 'ok',
      source: 'api',
      data: [],
      message: 'Instagram Stories are not available via Graph API. Use Instagram app or web directly.',
      cached_until: new Date(now + CACHE_DURATION * 1000).toISOString()
    });

  } catch (error) {
    console.error('Error with Instagram stories:', error.message);
    res.status(200).json({
      status: 'ok',
      data: [],
      message: 'Stories endpoint is read-only and uses Graph API limitations'
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
