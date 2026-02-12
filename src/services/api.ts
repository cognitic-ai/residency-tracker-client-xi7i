import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DashboardData,
  DayPresence,
  NetworkDevice,
  TrackedDevice,
} from "@/types";

const SERVER_URL_KEY = "server_url";
const DEFAULT_SERVER_URL = "http://raspberrypi.local:5000";

export async function getServerUrl(): Promise<string> {
  const url = await AsyncStorage.getItem(SERVER_URL_KEY);
  return url || DEFAULT_SERVER_URL;
}

export async function setServerUrl(url: string): Promise<void> {
  await AsyncStorage.setItem(SERVER_URL_KEY, url);
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const baseUrl = await getServerUrl();
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getDashboard(): Promise<DashboardData> {
  return apiFetch<DashboardData>("/api/dashboard");
}

export async function getTrackedDevices(): Promise<TrackedDevice[]> {
  return apiFetch<TrackedDevice[]>("/api/devices");
}

export async function addDevice(
  mac: string,
  name: string
): Promise<TrackedDevice> {
  return apiFetch<TrackedDevice>("/api/devices", {
    method: "POST",
    body: JSON.stringify({ mac, name }),
  });
}

export async function removeDevice(mac: string): Promise<void> {
  await apiFetch(`/api/devices/${encodeURIComponent(mac)}`, {
    method: "DELETE",
  });
}

export async function renameDevice(
  mac: string,
  name: string
): Promise<TrackedDevice> {
  return apiFetch<TrackedDevice>(
    `/api/devices/${encodeURIComponent(mac)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ name }),
    }
  );
}

export async function checkPresence(): Promise<{ present: boolean }> {
  return apiFetch("/api/presence/check", { method: "POST" });
}

export async function scanNetwork(): Promise<NetworkDevice[]> {
  return apiFetch("/api/network/scan", { method: "POST" });
}

export async function getCalendar(
  year: number,
  month: number
): Promise<DayPresence[]> {
  return apiFetch(`/api/calendar?year=${year}&month=${month}`);
}

// --- Mock data for development ---

function generateMockCalendar(year: number, month: number): DayPresence[] {
  const days: DayPresence[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date();

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    if (date > today) break;
    const present = Math.random() > 0.4;
    days.push({
      date: `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      present,
      devicesDetected: present
        ? ["AA:BB:CC:DD:EE:01", "AA:BB:CC:DD:EE:02"]
        : [],
    });
  }
  return days;
}

export function getMockDashboard(): DashboardData {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const calendar = generateMockCalendar(year, month);
  const daysPresent = 17;
  const threshold = 183;

  return {
    year,
    daysPresent,
    daysRemaining: threshold - daysPresent,
    presence: {
      present: true,
      lastSeen: "2 minutes ago",
      devicesDetected: ["AA:BB:CC:DD:EE:01"],
    },
    projection: {
      projectedTotal: 142,
      pace: 4.2,
      daysRemaining: threshold - daysPresent,
      onTrack: false,
      message: `At your current pace of 4.2 days/month, you'll reach ~142 days by year-end — below the 183-day threshold.`,
    },
    trackedDevices: [
      { mac: "AA:BB:CC:DD:EE:01", name: "iPhone 15 Pro", notifications: true },
      {
        mac: "AA:BB:CC:DD:EE:02",
        name: "iPad Air",
        notifications: false,
      },
    ],
    deviceStats: [
      { mac: "AA:BB:CC:DD:EE:01", name: "iPhone 15 Pro", daysPresent: 17 },
      { mac: "AA:BB:CC:DD:EE:02", name: "iPad Air", daysPresent: 12 },
    ],
    calendar,
  };
}
