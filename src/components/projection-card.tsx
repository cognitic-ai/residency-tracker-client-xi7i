import { View, Text } from "react-native";
import * as AC from "@bacons/apple-colors";
import { YearProjection } from "@/types";

export default function ProjectionCard({
  projection,
}: {
  projection: YearProjection;
}) {
  const statusColor = projection.onTrack ? AC.systemGreen : AC.systemRed;
  const statusLabel = projection.onTrack ? "On Track" : "Below Target";

  return (
    <View
      style={{
        backgroundColor: AC.secondarySystemBackground,
        borderRadius: 14,
        borderCurve: "continuous",
        padding: 16,
        gap: 10,
        borderLeftWidth: 4,
        borderLeftColor: statusColor,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text
          style={{ color: AC.label, fontSize: 17, fontWeight: "600", flex: 1 }}
        >
          Year-End Projection
        </Text>
        <View
          style={{
            backgroundColor: statusColor,
            borderRadius: 8,
            borderCurve: "continuous",
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600" }}>
            {statusLabel}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 16 }}>
        <View style={{ gap: 2 }}>
          <Text
            selectable
            style={{
              color: AC.label,
              fontSize: 24,
              fontWeight: "700",
              fontVariant: ["tabular-nums"],
            }}
          >
            {projection.projectedTotal}
          </Text>
          <Text style={{ color: AC.secondaryLabel, fontSize: 12 }}>
            Projected days
          </Text>
        </View>
        <View style={{ gap: 2 }}>
          <Text
            selectable
            style={{
              color: AC.label,
              fontSize: 24,
              fontWeight: "700",
              fontVariant: ["tabular-nums"],
            }}
          >
            {projection.pace.toFixed(1)}
          </Text>
          <Text style={{ color: AC.secondaryLabel, fontSize: 12 }}>
            Days/month
          </Text>
        </View>
      </View>

      <Text
        selectable
        style={{ color: AC.secondaryLabel, fontSize: 13, lineHeight: 18 }}
      >
        {projection.message}
      </Text>
    </View>
  );
}
