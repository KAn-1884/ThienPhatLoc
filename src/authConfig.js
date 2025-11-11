export const msalConfig = {
  auth: {
    // Client ID
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,

    // Tenant ID
    authority: import.meta.env.VITE_MSAL_AUTHORITY,

    // Link localhost
    redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};
