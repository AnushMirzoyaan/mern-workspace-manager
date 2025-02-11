'use client';
import React, { createContext, useContext, useState } from 'react';

import { IClientCookiesProviderProps } from './types';

const cookieContext = createContext<
  { token?: string; setAccessToken: (arg: string) => void } | undefined
>(undefined);

export const ClientCookiesProvider = ({ children, token }: IClientCookiesProviderProps) => {
  const [accessToken, setAccessToken] = useState(token);

  return (
    <cookieContext.Provider value={{ token: accessToken, setAccessToken }}>
      {children}
    </cookieContext.Provider>
  );
};

export const useCookieContext = () => {
  const context = useContext(cookieContext);
  if (!context) {
    throw new Error('useCookieContext must be used within an cookieContext');
  }

  return context;
};
