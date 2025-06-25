// Acest fișier implementează un serviciu de autentificare complet
// pentru conectarea cu backend-ul API

import axios, { AxiosError } from 'axios';

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    username?: string;
    email?: string;
    password: string;
}

export interface ServiceResponse<T = any> {
    data: T;
    success: boolean;
    message: string;
}

const TOKEN_KEY = 'authToken';
const USER_INFO_KEY = 'userInfo';

export const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error: AxiosError) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && originalRequest && !originalRequest.headers['_retry']) {
                originalRequest.headers['_retry'] = 'true';
                logout();
            }

            return Promise.reject(error);
        }
    );
};

export const authService = {
    register: async (registerData: RegisterRequest): Promise<ServiceResponse<String>> => {
        try {
            const response = await axios.post<ServiceResponse<String>>(
                '/api/Auth/register',
                registerData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);

            if (error.response) {
                return {
                    success: false,
                    message: error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`,
                    data: null
                };
            }

            return {
                success: false,
                message: error.message || 'An error occurred during registration',
                data: null
            };
        }
    },

    login: async (loginData: LoginRequest): Promise<ServiceResponse<string>> => {
        try {
            const response = await axios.post<ServiceResponse<String>>(
                '/api/Auth/login',
                loginData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success && response.data.data) {
                localStorage.setItem(TOKEN_KEY, response.data.data);
            }

            return response.data;
        } catch (error) {
            console.error('Login error:', error);

            if (error.response) {
                return {
                    success: false,
                    message: error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`,
                    data: null
                };
            }

            return {
                success: false,
                message: error.message || 'An error occurred during login',
                data: null
            };
        }
    },

    isAuthenticated: (): boolean => {
        return localStorage.getItem(TOKEN_KEY) !== null;
    },

    getToken: (): string | null => {
        return localStorage.getItem(TOKEN_KEY);
    },

    logout: (): void => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_INFO_KEY);
        window.location.href = '/login';
    }
};

export const { isAuthenticated, getToken, logout, register, login } = authService;