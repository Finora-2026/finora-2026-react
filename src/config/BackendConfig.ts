export const BackendConfig = {
  springApiUrl: getSpringApiUrl(window.location.hostname)
};

export function getSpringApiUrl(hostname: string): string {
  return hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://api.bellamyphan.com';
}
