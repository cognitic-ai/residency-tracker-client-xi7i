import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import * as AC from "@bacons/apple-colors";
import { TrackedDevice } from "@/types";

function DeviceRow({
  device,
  onDelete,
  onRename,
}: {
  device: TrackedDevice;
  onDelete: (mac: string) => void;
  onRename: (mac: string, name: string) => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: AC.separator,
        gap: 10,
      }}
    >
      {process.env.EXPO_OS === "ios" ? (
        <Image
          source="sf:iphone.gen3"
          style={{ width: 20, height: 20, tintColor: AC.secondaryLabel }}
        />
      ) : (
        <Text style={{ fontSize: 18 }}>📱</Text>
      )}
      <View style={{ flex: 1 }}>
        <Text
          selectable
          style={{ color: AC.label, fontSize: 15, fontWeight: "500" }}
        >
          {device.name}
        </Text>
        <Text
          selectable
          style={{
            color: AC.secondaryLabel,
            fontSize: 12,
            fontFamily: "monospace",
          }}
        >
          {device.mac}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          Alert.alert(
            "Delete Device",
            `Remove "${device.name}" from tracking?`,
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => onDelete(device.mac),
              },
            ]
          );
        }}
        hitSlop={8}
      >
        {process.env.EXPO_OS === "ios" ? (
          <Image
            source="sf:trash"
            style={{ width: 18, height: 18, tintColor: AC.systemRed }}
          />
        ) : (
          <Text style={{ fontSize: 16, color: AC.systemRed as any }}>🗑</Text>
        )}
      </Pressable>
    </View>
  );
}

export default function DeviceSetupCard({
  devices,
  onScan,
  onDelete,
  onRename,
  scanning,
}: {
  devices: TrackedDevice[];
  onScan: () => void;
  onDelete: (mac: string) => void;
  onRename: (mac: string, name: string) => void;
  scanning: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: AC.secondarySystemBackground,
        borderRadius: 14,
        borderCurve: "continuous",
        padding: 16,
        gap: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {process.env.EXPO_OS === "ios" ? (
          <Image
            source="sf:wifi"
            style={{ width: 20, height: 20, tintColor: AC.systemBlue }}
          />
        ) : (
          <Text style={{ fontSize: 18 }}>📡</Text>
        )}
        <Text
          style={{
            color: AC.label,
            fontSize: 17,
            fontWeight: "600",
          }}
        >
          Device Setup
        </Text>
      </View>

      <Text style={{ color: AC.secondaryLabel, fontSize: 13 }}>
        Devices being tracked on your local network
      </Text>

      {devices.map((d) => (
        <DeviceRow
          key={d.mac}
          device={d}
          onDelete={onDelete}
          onRename={onRename}
        />
      ))}

      <Pressable
        onPress={onScan}
        disabled={scanning}
        style={({ pressed }) => ({
          backgroundColor: pressed ? AC.systemFill : AC.systemBlue,
          borderRadius: 10,
          borderCurve: "continuous",
          padding: 12,
          alignItems: "center",
          marginTop: 8,
          opacity: scanning ? 0.6 : 1,
        })}
      >
        {scanning ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>
            Scan Network
          </Text>
        )}
      </Pressable>
    </View>
  );
}
