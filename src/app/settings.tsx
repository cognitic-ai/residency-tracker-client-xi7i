import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import * as AC from "@bacons/apple-colors";
import { getServerUrl, setServerUrl } from "@/services/api";

export default function SettingsScreen() {
  const [url, setUrl] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getServerUrl().then(setUrl);
  }, []);

  const handleSave = useCallback(async () => {
    await setServerUrl(url.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [url]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: AC.systemBackground }}
      contentContainerStyle={{ padding: 16, gap: 24 }}
    >
      {/* Server URL */}
      <View
        style={{
          backgroundColor: AC.secondarySystemBackground,
          borderRadius: 14,
          borderCurve: "continuous",
          padding: 16,
          gap: 12,
        }}
      >
        <Text style={{ color: AC.label, fontSize: 17, fontWeight: "600" }}>
          Server URL
        </Text>
        <Text style={{ color: AC.secondaryLabel, fontSize: 13 }}>
          Enter the address of your Raspberry Pi presence server
        </Text>
        <TextInput
          value={url}
          onChangeText={setUrl}
          placeholder="http://raspberrypi.local:5000"
          placeholderTextColor={AC.placeholderText as any}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          style={{
            backgroundColor: AC.tertiarySystemBackground,
            borderRadius: 10,
            borderCurve: "continuous",
            padding: 12,
            color: AC.label,
            fontSize: 15,
          }}
        />
        <Pressable
          onPress={handleSave}
          style={({ pressed }) => ({
            backgroundColor: pressed ? AC.systemFill : AC.systemBlue,
            borderRadius: 10,
            borderCurve: "continuous",
            padding: 12,
            alignItems: "center",
          })}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>
            {saved ? "Saved!" : "Save"}
          </Text>
        </Pressable>
      </View>

      {/* About */}
      <View
        style={{
          backgroundColor: AC.secondarySystemBackground,
          borderRadius: 14,
          borderCurve: "continuous",
          padding: 16,
          gap: 8,
        }}
      >
        <Text style={{ color: AC.label, fontSize: 17, fontWeight: "600" }}>
          About
        </Text>
        <Text
          style={{
            color: AC.secondaryLabel,
            fontSize: 14,
            lineHeight: 20,
          }}
        >
          Residency Tracker monitors your device presence on your home network
          to help you track days spent in-country for tax residency purposes.
        </Text>
        <Text
          style={{
            color: AC.secondaryLabel,
            fontSize: 14,
            lineHeight: 20,
          }}
        >
          The 183-day rule is commonly used to determine tax residency. This app
          helps you stay informed about your status throughout the year.
        </Text>
      </View>
    </ScrollView>
  );
}
