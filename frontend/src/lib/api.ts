export interface FleetVehicle {
  id: string;
  makeModel: string;
  type: string;
  route: string;
  riskLevel: 'high' | 'medium' | 'low';
  riskScore: number;
  engineTemp: string;
  vibration: string;
  roadStress: string;
  lastService: string;
  status?: string;
  spec?: string;
  confidence?: number;
  telemetry?: any;
}

export interface FleetSummary {
  totalFleet: number;
  flaggedCount: number;
  optimalCount: number;
  avgRiskScore: string;
}

export interface DbStatus {
  connected: boolean;
  provider: string;
  database: string;
  vehicles_tracked: number;
  diagnostic_scans_logged: number;
  mode: string;
  message: string;
}

export function getApiBase(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('fleetguard_api_url');
    if (saved) return saved.replace(/\/+$/, '');
  }
  return 'http://localhost:8000/api';
}

export async function fetchFleetVehicles(signal?: AbortSignal): Promise<FleetVehicle[]> {
  const res = await fetch(`${getApiBase()}/fleet`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch fleet: ${res.statusText}`);
  return res.json();
}

export async function fetchFleetSummary(signal?: AbortSignal): Promise<FleetSummary> {
  const res = await fetch(`${getApiBase()}/fleet/summary`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch fleet summary: ${res.statusText}`);
  return res.json();
}

export async function fetchHighRiskVehicles(signal?: AbortSignal): Promise<FleetVehicle[]> {
  const res = await fetch(`${getApiBase()}/fleet/high-risk`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch high-risk vehicles: ${res.statusText}`);
  return res.json();
}

export async function fetchDbStatus(signal?: AbortSignal): Promise<DbStatus> {
  const res = await fetch(`${getApiBase()}/db/status`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch database status: ${res.statusText}`);
  return res.json();
}

export interface PlatformStats {
  activeFleetTracked: string;
  diagnosticAccuracy: string;
  unscheduledDowntimeSaved: string;
  inspectionsDirected: string;
  totalRoutesMonitored: number;
  avgFleetRiskScore: string;
  flaggedVehicles: number;
  optimalVehicles: number;
}

export interface RoadRoute {
  id: string;
  route: string;
  type: string;
  roughness: number;
  impact: string;
  inspectArea: string;
  dailyTruckVolume?: number;
  potholeCountPerKm?: number;
  avgSpeedKmh?: number;
}

export interface CaseAnalysis {
  vehicleId: string;
  spec: string;
  route: string;
  status: string;
  riskLevel: 'high' | 'medium' | 'low';
  probability: number;
  recommendations: string[];
}

export async function fetchPlatformStats(signal?: AbortSignal): Promise<PlatformStats> {
  const res = await fetch(`${getApiBase()}/stats`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch platform stats: ${res.statusText}`);
  return res.json();
}

export async function fetchRoadRoutes(signal?: AbortSignal): Promise<RoadRoute[]> {
  const res = await fetch(`${getApiBase()}/routes`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch routes: ${res.statusText}`);
  return res.json();
}

export async function fetchCaseAnalysis(signal?: AbortSignal): Promise<CaseAnalysis> {
  const res = await fetch(`${getApiBase()}/case-analysis`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch case analysis: ${res.statusText}`);
  return res.json();
}
