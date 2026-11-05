export interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
  database: string;
}