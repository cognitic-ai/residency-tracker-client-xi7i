import { ScrollView, View, Text, RefreshControl } from "react-native";
import { useCallback, useEffect, useState } from "react";
import * as AC from "@bacons/apple-colors";
import DeviceSetupCard from "@/components/device-setup-card";
import PresenceCard from "@/components/presence-card";
import StatsRow from "@/components/stats-row";
import ProjectionCard from "@/components/projection-card";
import PerDeviceCard from "@/components/per-device-card";
import CalendarCard from "@/components/calendar-card";
import { DashboardData } from "@/types";
import { getMockDashboard } from "@/services/api";

export default function DashboardScreen() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [checking, setChecking] = useState(false);

  const now = new Date();
  const [calMonth, setCalMonth] = useState(now.getMonth() + 1);
  const [calYear, setCalYear] = useState(now.getFullYear());

  const loadData = useCallback(async () => {
    try {
      const dashboard = getMockDashboard();
      setData(dashboard);
    } catch (e) {
      console.error("Failed to load dashboard", e);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const handleScan = useCallback(async () => {
    setScanning(true);
    await new Promise((r) => setTimeout(r, 2000));
    setScanning(false);
  }, []);

  const handleCheckPresence = useCallback(async () => {
    setChecking(true);
    await new Promise((r) => setTimeout(r, 1500));
    setChecking(false);
  }, []);

  const handleDeleteDevice = useCallback((mac: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        trackedDevices: prev.trackedDevices.filter((d) => d.mac !== mac),
      };
    });
  }, []);

  const handleRenameDevice = useCallback((mac: string, name: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        trackedDevices: prev.trackedDevices.map((d) =>
          d.mac === mac ? { ...d, name } : d
        ),
      };
    });
  }, []);

  const handlePrevMonth = useCallback(() => {
    setCalMonth((m) => {
      if (m === 1) {
        setCalYear((y) => y - 1);
        return 12;
      }
      return m - 1;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    const now = new Date();
    setCalMonth((m) => {
      const nextM = m === 12 ? 1 : m + 1;
      const nextY = m === 12 ? calYear + 1 : calYear;
      if (
        nextY > now.getFullYear() ||
        (nextY === now.getFullYear() && nextM > now.getMonth() + 1)
      ) {
        return m;
      }
      if (m === 12) setCalYear((y) => y + 1);
      return nextM;
    });
  }, [calYear]);

  if (!data) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: AC.systemBackground,
        }}
      >
        <Text style={{ color: AC.secondaryLabel, fontSize: 16 }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: AC.systemBackground }}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 40,
        gap: 20,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text
        style={{
          color: AC.secondaryLabel,
          fontSize: 14,
          textAlign: "center",
        }}
      >
        Tax Residency Status · {data.year}
      </Text>

      <DeviceSetupCard
        devices={data.trackedDevices}
        onScan={handleScan}
        onDelete={handleDeleteDevice}
        onRename={handleRenameDevice}
        scanning={scanning}
      />

      <PresenceCard
        presence={data.presence}
        onCheck={handleCheckPresence}
        checking={checking}
      />

      <StatsRow
        daysPresent={data.daysPresent}
        daysRemaining={data.daysRemaining}
      />

      <ProjectionCard projection={data.projection} />

      <PerDeviceCard devices={data.deviceStats} year={data.year} />

      <CalendarCard
        year={calYear}
        month={calMonth}
        calendar={data.calendar}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
    </ScrollView>
  );
}
