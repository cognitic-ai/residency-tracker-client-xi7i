import { View, Text } from "react-native";
import * as AC from "@bacons/apple-colors";

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: any;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AC.secondarySystemBackground,
        borderRadius: 14,
        borderCurve: "continuous",
        padding: 16,
        alignItems: "center",
        gap: 4,
      }}
    >
      <Text
        selectable
        style={{
          color,
          fontSize: 36,
          fontWeight: "700",
          fontVariant: ["tabular-nums"],
        }}
      >
        {value}
      </Text>
      <Text style={{ color: AC.secondaryLabel, fontSize: 13 }}>{label}</Text>
    </View>
  );
}

export default function StatsRow({
  daysPresent,
  daysRemaining,
}: {
  daysPresent: number;
  daysRemaining: number;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 12 }}>
      <StatCard label="Days Present" value={daysPresent} color={AC.systemBlue} />
      <StatCard
        label="Days Remaining"
        value={daysRemaining}
        color={AC.systemOrange}
      />
    </View>
  );
}
