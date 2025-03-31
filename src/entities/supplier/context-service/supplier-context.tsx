// context/supplier-context.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Supplier } from '../type/supplier';
import { DeliveryRepository } from '@/src/infrastructure/repositories/delivery-repository';

interface SupplierContextType {
    suppliers: Supplier[];
    isLoading: boolean;
    error: string | null;
    refreshSuppliers: () => Promise<void>;
}

const SupplierContext = createContext<SupplierContextType | undefined>(undefined);

export function SupplierProvider({ children }: { children: ReactNode }) {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supplierRepository = new DeliveryRepository();

    const loadSuppliers = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await supplierRepository.getAllSuppliers();
            setSuppliers(data);
        } catch (err) {
            setError('Failed to load suppliers');
            console.error('Error loading suppliers:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshSuppliers = async () => {
        await loadSuppliers();
    };

    return (
        <SupplierContext.Provider value={{
            suppliers,
            isLoading,
            error,
            refreshSuppliers
        }}>
            {children}
        </SupplierContext.Provider>
    );
}

// Custom hook to use the supplier context
export function useSuppliers() {
    const context = useContext(SupplierContext);
    if (context === undefined) {
        throw new Error('useSuppliers must be used within a SupplierProvider');
    }
    return context;
}