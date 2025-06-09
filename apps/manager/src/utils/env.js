// utils/env.js

export function isStandaloneDevMode() {
  const isWordPress = typeof window !== 'undefined' && (
    window.wp !== undefined || window.wpApiSettings !== undefined
  );

  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  const isDevHost =
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.endsWith('.local');

  const isEnvDev = process.env.NODE_ENV === 'development';

  return !isWordPress && (isDevHost || isEnvDev);
}
