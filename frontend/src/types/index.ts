export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    created_at: string;
}

export interface TrafficRequest {
    id: number;
    user_id: number;
    traffic_type: string;
    quantity: number;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface TrafficProvider {
    id: number;
    name: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface RegisterForm extends LoginForm {
    email: string;
} 