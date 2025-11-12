import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Metric {
  id: string;
  name: string;
  type: string;
  value: number;
  unit?: string;
  metadata?: Record<string, any>;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MetricsResponse {
  data: Metric[];
  total: number;
  page: number;
  limit: number;
}

export interface Stats {
  count: number;
  total: number;
  average: number;
  min: number;
  max: number;
}

export interface QueryParams {
  type?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface CreateMetricDto {
  name: string;
  type: string;
  value: number;
  unit?: string;
  metadata?: Record<string, any>;
  userId?: string;
}

export const metricsApi = {
  getAll: (params?: QueryParams) =>
    api.get<MetricsResponse>('/metrics', { params }),

  getOne: (id: string) =>
    api.get<Metric>(`/metrics/${id}`),

  create: (data: CreateMetricDto) =>
    api.post<Metric>('/metrics', data),

  update: (id: string, data: Partial<CreateMetricDto>) =>
    api.patch<Metric>(`/metrics/${id}`, data),

  delete: (id: string) =>
    api.delete(`/metrics/${id}`),

  getStats: (params?: QueryParams) =>
    api.get<Stats>('/metrics/stats', { params }),

  exportCsv: (params?: QueryParams) =>
    api.get('/metrics/export/csv', { params, responseType: 'blob' }),

  exportJson: (params?: QueryParams) =>
    api.get('/metrics/export/json', { params, responseType: 'blob' }),

  exportPdf: (params?: QueryParams) =>
    api.get('/metrics/export/pdf', { params, responseType: 'blob' }),
};

export default api;
