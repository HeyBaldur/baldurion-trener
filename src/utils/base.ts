const b = import.meta.env.BASE_URL;
export const base = b.endsWith('/') ? b : b + '/';
