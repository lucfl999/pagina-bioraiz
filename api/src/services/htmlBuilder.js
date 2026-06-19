import { validateCloudinaryUrl } from './cloudinaryService.js';

export function buildAdminHtml(type, fields) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => {
      // Si es URL de Cloudinary, mostrar como imagen embebida
      if (typeof v === 'string' && validateCloudinaryUrl(v)) {
        return `<tr>
          <td style="padding:8px 12px;font-weight:600;color:#2A3D24;background:#FAF6ED;">📷 ${k}</td>
          <td style="padding:8px 12px;color:#4A5C3A;">
            <a href="${v}" style="color:#6E9050;text-decoration:underline;">${v.substring(v.lastIndexOf('/') + 1)}</a><br/>
            <img src="${v}" style="max-width:200px;border-radius:4px;margin-top:8px;" />
          </td>
        </tr>`;
      }
      return `<tr><td style="padding:8px 12px;font-weight:600;color:#2A3D24;background:#FAF6ED;">${k}</td><td style="padding:8px 12px;color:#4A5C3A;">${v}</td></tr>`;
    })
    .join('');
  return `
    <div style="font-family:monospace;max-width:600px;">
      <h2 style="color:#2A3D24;border-bottom:2px solid #EDE4CF;padding-bottom:12px;">[BIORAIZ] ${type}</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #EDE4CF;border-radius:8px;overflow:hidden;">${rows}</table>
    </div>`;
}

export default buildAdminHtml;
