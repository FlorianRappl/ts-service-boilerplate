export interface StatusResponseEntity {
  status: 'healthy' | 'unhealthy';
  name: string;
  version: string;
  id: string;
}
