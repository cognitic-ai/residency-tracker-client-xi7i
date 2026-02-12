import { View, Text } from "react-native";
import { Image } from "expo-image";
import * as AC from "@bacons/apple-colors";
import { DeviceStats } from "@/types";

export default function PerDeviceCard({
  devices,
  year,
}: {
  devices: DeviceStats[];
  year: number;
}) {
  return (
    <View
      style={{
        backgroundColor: AC.secondarySystemBackground,
        borderRadius: 14,
        borderCurve: "continuous",
        padding: 16,
        gap: 10,
      }}
    >
      <Text style={{ color: AC.label, fontSize: 17, fontWeight: "600" }}>
        Per Device · {year}
      </Text>

      {devices.map((d) => (
        <View
          key={d.mac}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
            borderBottomWidth: 0.5,
            borderBottomColor: AC.separator,
            gap: 10,
          }}
        >
          {process.env.EXPO_OS === "ios" ? (
            <Image
              source="sf:iphone.gen3"
              style={{ width: 18, height: 18, tintColor: AC.secondaryLabel }}
            />
          ) : (
            <Text style={{ fontSize: 16 }}>📱</Text>
          )}
          <Text
            selectable
            style={{ color: AC.label, fontSize: 15, flex: 1 }}
          >
            {d.name}
          </Text>
          <Text
            selectable
            style={{
              color: AC.systemBlue,
              fontSize: 17,
              fontWeight: "600",
              fontVariant: ["tabular-nums"],
            }}
          >
            {d.daysPresent}
          </Text>
          <Text style={{ color: AC.secondaryLabel, fontSize: 13 }}>days</Text>
        </View>
      ))}
    </View>
  );
}
