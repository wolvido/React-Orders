import React, { createContext, useContext, useState } from 'react';

type ApiContextType = {
  getApiUrl: () => string | undefined;  
  setApiUrl: (url: string) => void;
  hasApiUrl: () => boolean;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiUrl, setApiUrl] = useState<string | undefined>(undefined); 

  const getApiUrl = () => apiUrl;
  const setNewApiUrl = (url: string) => setApiUrl(url);
  const hasApiUrl = () => apiUrl !== undefined;

  return (
    <ApiContext.Provider value={{ getApiUrl, setApiUrl: setNewApiUrl, hasApiUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
