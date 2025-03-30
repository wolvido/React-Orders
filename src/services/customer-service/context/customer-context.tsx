// context/customer-context.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Customer } from '@/src/entities/customer/type/customers';
import { CustomerRepository } from '@/src/Infrastructure/repositories/customer-repository';

interface CustomerContextType {
    customers: Customer[];
    isLoading: boolean;
    error: string | null;
    refreshCustomers: () => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const customerRepository = new CustomerRepository();

    const loadCustomers = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await customerRepository.getAllCustomers();
            setCustomers(data);
        } catch (err) {
            setError('Failed to load customers');
            console.error('Error loading customers:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshCustomers = async () => {
        await loadCustomers();
    };

    return (
        <CustomerContext.Provider value={{
            customers,
            isLoading,
            error,
            refreshCustomers
        }}>
            {children}
        </CustomerContext.Provider>
    );
}

// Custom hook to use the customer context
export function useCustomers() {
    const context = useContext(CustomerContext);
    if (context === undefined) {
        throw new Error('useCustomers must be used within a CustomerProvider');
    }
    return context;
}