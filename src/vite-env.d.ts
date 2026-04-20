/// <reference types="vite/client" />

declare const __BASE_PATH__: string;

interface Window {
  REACT_APP_NAVIGATE?: any;
  __BASE_PATH__?: string;
}
