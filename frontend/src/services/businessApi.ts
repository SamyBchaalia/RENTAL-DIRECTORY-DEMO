import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export enum BusinessCategory {
  VEHICLES = 'vehicles',
  PROPERTIES = 'properties',
  EQUIPMENT = 'equipment',
  EVENTS = 'events',
  RECREATION = 'recreation',
  ELECTRONICS = 'electronics',
  FURNITURE = 'furniture',
  TOOLS = 'tools',
  OTHER = 'other',
}

export interface Business {
  id: string;
  name: string;
  description: string;
  category: BusinessCategory;
  website?: string;
  phone?: string;
  email: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  rentalItems?: string[];
  amenities?: string[];
  images?: string[];
  logo?: string;
  operatingHours?: Record<string, string>;
  rating?: number;
  reviewCount?: number;
  isActive: boolean;
  isFeatured: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessResponse {
  data: Business[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchParams {
  query?: string;
  category?: BusinessCategory;
  city?: string;
  state?: string;
  country?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface CreateBusinessDto {
  name: string;
  description: string;
  category: BusinessCategory;
  website?: string;
  phone?: string;
  email: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  rentalItems?: string[];
  amenities?: string[];
  images?: string[];
  logo?: string;
  operatingHours?: Record<string, string>;
  rating?: number;
  reviewCount?: number;
  isActive?: boolean;
  isFeatured?: boolean;
}

export interface CategoryCount {
  category: string;
  count: number;
}

export interface LocationCount {
  city: string;
  state: string;
  country: string;
  count: number;
}

export interface Stats {
  total: number;
  active: number;
  inactive: number;
  featured: number;
  byCategory: CategoryCount[];
}

export const businessApi = {
  getAll: (params?: SearchParams) =>
    api.get<BusinessResponse>('/businesses', { params }),

  getOne: (id: string) =>
    api.get<Business>(`/businesses/${id}`),

  create: (data: CreateBusinessDto) =>
    api.post<Business>('/businesses', data),

  update: (id: string, data: Partial<CreateBusinessDto>) =>
    api.patch<Business>(`/businesses/${id}`, data),

  delete: (id: string) =>
    api.delete(`/businesses/${id}`),

  toggleActive: (id: string) =>
    api.patch<Business>(`/businesses/${id}/toggle-active`),

  toggleFeatured: (id: string) =>
    api.patch<Business>(`/businesses/${id}/toggle-featured`),

  getStats: () =>
    api.get<Stats>('/businesses/stats'),

  getCategories: () =>
    api.get<CategoryCount[]>('/businesses/categories'),

  getLocations: () =>
    api.get<LocationCount[]>('/businesses/locations'),
};

export default api;
