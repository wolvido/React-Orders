import { Product } from './product';

export interface Supplier {
    id: number;
    name: string;
    address: string;
    contactNumber: string;
    email: string;
    remarks: string;
    products: Product[];
}