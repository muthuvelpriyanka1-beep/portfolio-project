const rawApi = (process.env.REACT_APP_API || '').trim();

const normalizeApiBase = () => {
  if (!rawApi) {
    return '';
  }

  const withoutSlash = rawApi.replace(/\/+$/, '');
  const isLocalApi = /localhost|127\.0\.0\.1/.test(withoutSlash);
  const isLocalFrontend = /localhost|127\.0\.0\.1/.test(window.location.hostname);

  if (process.env.NODE_ENV === 'production' && isLocalApi && !isLocalFrontend) {
    console.error(
      'REACT_APP_API points to localhost in production. Set REACT_APP_API in Vercel to your Render backend URL.'
    );
    return '';
  }

  return withoutSlash;
};

export const API_BASE = normalizeApiBase();

if (typeof window !== 'undefined') {
  console.log('[API DEBUG] NODE_ENV:', process.env.NODE_ENV);
  console.log('[API DEBUG] API_BASE:', API_BASE || '<missing>');
}

export const buildApiUrl = (path) => {
  if (!API_BASE) {
    throw new Error('API is not configured. Set REACT_APP_API to your deployed backend URL.');
  }

  const fullUrl = `${API_BASE}${path}`;
  console.log('[API DEBUG] Request URL:', fullUrl);
  return fullUrl;
};
