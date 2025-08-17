export interface EmailJSConfig {
  publicKey: string;
  serviceId: string;
  templates: {
    contact: {
      admin: string;
      user: string;
    };
    offers: {
      admin: string;
      user: string;
    };
  };
  turnstileSiteKey?: string;
  allowedDomains: string[];
  contactMode: 'emailjs' | 'off';
}

export const getEmailJSConfig = (): EmailJSConfig => {
  return {
    publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY || '',
    serviceId: import.meta.env.PUBLIC_EMAILJS_SERVICE_ID || '',
    templates: {
      contact: {
        admin: import.meta.env.PUBLIC_EMAILJS_ADMIN_TEMPLATE_CONTACT || '',
        user: import.meta.env.PUBLIC_EMAILJS_USER_TEMPLATE_CONTACT || '',
      },
      offers: {
        admin: import.meta.env.PUBLIC_EMAILJS_ADMIN_TEMPLATE_OFFERS || '',
        user: import.meta.env.PUBLIC_EMAILJS_USER_TEMPLATE_OFFERS || '',
      },
    },
    turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY,
    allowedDomains: (import.meta.env.PUBLIC_ALLOWED_DOMAINS || 'localhost').split(','),
    contactMode: (import.meta.env.PUBLIC_CONTACT_MODE || 'emailjs') as 'emailjs' | 'off',
  };
};

export const isValidDomain = (domain: string): boolean => {
  const config = getEmailJSConfig();
  const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';
  
  return config.allowedDomains.some(allowed => {
    if (allowed.startsWith('*.')) {
      const wildcardDomain = allowed.substring(2);
      return currentDomain.endsWith(wildcardDomain);
    }
    return currentDomain === allowed || domain === allowed;
  });
};