import { CustomerAdapter } from "@/src/infrastructure/adapter/customer-adapter";
import app from "@/app.json";
import { useApiConfig } from "@/src/shared/lib/api/api-config-context";
import { Customer } from "@/src/entities/customer/type/customers";

export interface ICustomerRepository {
    getAllCustomers(): Promise<Customer[]>;
}

export class CustomerRepository implements ICustomerRepository {
    private baseUrl: string;

    constructor() {
        const { getApiUrl, hasApiUrl } = useApiConfig();

        if (hasApiUrl()) {
            this.baseUrl = getApiUrl() + '/Customer';
        }
        else{
            this.baseUrl = app.api.main + '/Customer';
        }
    }

    private async handleResponseCustomers<T>(response: Response): Promise<T> {
        if (!response.ok) {
            if (response.status === 404) {
                return null as T;
            }
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();

        //check if data is an array
        if (Array.isArray(data)) {
            const customers = data.map((customer: any) => CustomerAdapter.adapt(customer));
            return await customers as T;
        }
        
        return await CustomerAdapter.adapt(data) as T;
    }

    async getAllCustomers(): Promise<Customer[]> {
        const response = await fetch(`${this.baseUrl}/fetch-customers`);
        return await this.handleResponseCustomers<Customer[]>(response);
    }
}