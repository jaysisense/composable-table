import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { SisenseContextProvider } from '@sisense/sdk-ui';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <SisenseContextProvider
      url="https://infusebi.sisensepoc.com"
      token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjBhNTgwMDQ4Y2FiNDUwMDJjMjdlZDliIiwiYXBpU2VjcmV0IjoiMmE5MTU0MmYtNDE3NC1hOTIzLTY5NDYtNmM1Y2YyYWMzZjljIiwiYWxsb3dlZFRlbmFudHMiOlsiNjA5YjA4Mzc4MjQ1MmYwMDFhYjUwZmY1Il0sInRlbmFudElkIjoiNjA5YjA4Mzc4MjQ1MmYwMDFhYjUwZmY1IiwiaWF0IjoxNjk1MDc0NTMzfQ.D0nbYlMWUMwRfD7kp5sNFZI2_1UxFG30C2KtgSO1z-A"
      defaultDataSource={'OrdersDB'}
    >
      <App tableConfigFile="https://infusebi.sisensepoc.com/plugins/financial-report.json" />
    </SisenseContextProvider>
  
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
//username="botadmin@sisense.com"
//password="S1sense1!"
