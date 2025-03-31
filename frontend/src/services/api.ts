import axios from 'axios';
import { AuthResponse, LoginForm, RegisterForm, TrafficRequest, TrafficProvider, Advertiser, Request } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Добавляем токен к каждому запросу
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Аутентификация
export const authService = {
    login: async (data: LoginForm): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/token', data);
        localStorage.setItem('token', response.data.access_token);
        return response.data;
    },

    register: async (data: RegisterForm) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    },
};

// Заявки на трафик
export const trafficRequestService = {
    getAll: async (): Promise<TrafficRequest[]> => {
        const response = await api.get<TrafficRequest[]>('/requests');
        return response.data;
    },

    getMy: async (): Promise<TrafficRequest[]> => {
        const response = await api.get<TrafficRequest[]>('/requests/my');
        return response.data;
    },

    create: async (data: Omit<TrafficRequest, 'id' | 'user_id' | 'created_at' | 'status'>): Promise<TrafficRequest> => {
        const response = await api.post<TrafficRequest>('/requests', data);
        return response.data;
    },

    updateStatus: async (id: number, status: TrafficRequest['status']): Promise<void> => {
        await api.put(`/requests/${id}/status`, { status });
    },
};

// Поставщики трафика
export const trafficProviderService = {
    getAll: () => api.get<TrafficProvider[]>('/providers').then(response => response.data),
    getById: (id: number) => api.get<TrafficProvider>(`/providers/${id}`).then(response => response.data),
};

export const advertiserService = {
    getAll: () => api.get<Advertiser[]>('/advertisers').then(response => response.data),
    getById: (id: number) => api.get<Advertiser>(`/advertisers/${id}`).then(response => response.data),
};

export const requestService = {
    create: (data: Omit<Request, 'id' | 'status' | 'created_at'>) => 
        api.post<Request>('/requests', data).then(response => response.data),
}; 