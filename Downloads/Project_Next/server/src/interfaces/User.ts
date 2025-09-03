export interface User {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    birth_date?: string;
    gender?: 'male' | 'female' | 'other';
    avatar?: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
}

