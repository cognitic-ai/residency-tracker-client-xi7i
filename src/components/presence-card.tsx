import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import * as AC from "@bacons/apple-colors";
import { PresenceStatus } from "@/types";

export default function PresenceCard({
  presence,
  onCheck,
  checking,
}: {
  presence: PresenceStatus;
  onCheck: () => void;
  checking: boolean;
}) {
  const isPresent = presence.present;
  const accentColor = isPresent ? AC.systemGreen : AC.systemRed;

  return (
    <View
      style={{
        backgroundColor: AC.secondarySystemBackground,
        borderRadius: 14,
        borderCurve: "continuous",
        padding: 16,
        gap: 12,
        borderLeftWidth: 4,
        borderLeftColor: accentColor,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {process.env.EXPO_OS === "ios" ? (
          <Image
            source={isPresent ? "sf:building.2.fill" : "sf:wifi.slash"}
            style={{ width: 24, height: 24, tintColor: accentColor }}
          />
        ) : (
          <Text style={{ fontSize: 22 }}>{isPresent ? "🏠" : "📡"}</Text>
        )}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: AC.label,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {isPresent ? "You are present" : "Not detected"}
          </Text>
          <Text style={{ color: AC.secondaryLabel, fontSize: 13 }}>
            Last seen: {presence.lastSeen}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onCheck}
        disabled={checking}
        style={({ pressed }) => ({
          backgroundColor: pressed ? AC.systemFill : AC.tertiarySystemBackground,
          borderRadius: 10,
          borderCurve: "continuous",
          padding: 10,
          alignItems: "center",
          opacity: checking ? 0.6 : 1,
        })}
      >
        {checking ? (
          <ActivityIndicator color={AC.label as any} />
        ) : (
          <Text style={{ color: AC.systemBlue, fontWeight: "600", fontSize: 14 }}>
            Check Now
          </Text>
        )}
      </Pressable>
    </View>
  );
}
