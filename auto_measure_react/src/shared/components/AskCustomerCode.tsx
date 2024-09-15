import React, { useEffect } from 'react';
import { Toaster } from '../services/notificationService';

export const AskCustomerCode: React.FC = () => {
  useEffect(() => {
    const getCustomerId = async () => {
      const toaster = new Toaster();
      const customer = localStorage.getItem('customerId');
      if (!customer) {
        await toaster.dialog.askCustomer();
      }
    };
    getCustomerId();
  }, []);

  return (
    <div></div>
  );
};