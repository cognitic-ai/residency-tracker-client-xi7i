export interface TrackedDevice {
  mac: string;
  name: string;
  notifications: boolean;
}

export interface PresenceStatus {
  present: boolean;
  lastSeen: string;
  devicesDetected: string[];
}

export interface DayPresence {
  date: string;
  present: boolean;
  devicesDetected: string[];
}

export interface DeviceStats {
  mac: string;
  name: string;
  daysPresent: number;
}

export interface YearProjection {
  projectedTotal: number;
  pace: number;
  daysRemaining: number;
  onTrack: boolean;
  message: string;
}

export interface DashboardData {
  year: number;
  daysPresent: number;
  daysRemaining: number;
  presence: PresenceStatus;
  projection: YearProjection;
  trackedDevices: TrackedDevice[];
  deviceStats: DeviceStats[];
  calendar: DayPresence[];
}

export interface NetworkDevice {
  mac: string;
  ip: string;
  hostname: string;
}

export interface ServerConfig {
  baseUrl: string;
}
