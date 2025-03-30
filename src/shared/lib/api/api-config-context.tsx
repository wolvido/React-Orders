import React, { createContext, useContext, useState } from 'react';

type ApiContextType = {
  getApiUrl: () => string | undefined;  
  setApiUrl: (url: string) => void;
  hasApiUrl: () => boolean;
};

const ApiConfigContext = createContext<ApiContextType | undefined>(undefined);

export const ApiConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiUrl, setApiUrl] = useState<string | undefined>(undefined); 

  const getApiUrl = () => apiUrl;
  const setNewApiUrl = (url: string) => setApiUrl(url);
  const hasApiUrl = () => apiUrl !== undefined;

  return (
    <ApiConfigContext.Provider value={{ getApiUrl, setApiUrl: setNewApiUrl, hasApiUrl }}>
      {children}
    </ApiConfigContext.Provider>
  );
};

// Custom hook to use the API context
export const useApiConfig  = () => {
  const context = useContext(ApiConfigContext);
  if (context === undefined) {
    throw new Error('ApiConfigContext must be used within an ApiConfigProvider');
  }
  return context;
};
