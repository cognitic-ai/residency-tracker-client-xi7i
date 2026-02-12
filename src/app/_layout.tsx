import { ThemeProvider } from "@/components/theme-provider";
import * as AC from "@bacons/apple-colors";
import Stack from "expo-router/stack";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { StatusBar } from "expo-status-bar";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

const AppleStackPreset: NativeStackNavigationOptions =
  process.env.EXPO_OS !== "ios"
    ? {}
    : isLiquidGlassAvailable()
      ? {
          headerTransparent: true,
          headerShadowVisible: false,
          headerLargeTitleShadowVisible: false,
          headerLargeStyle: { backgroundColor: "transparent" },
          headerTitleStyle: { color: AC.label as any },
          headerBlurEffect: "none",
          headerBackButtonDisplayMode: "minimal",
        }
      : {
          headerTransparent: true,
          headerShadowVisible: true,
          headerLargeTitleShadowVisible: false,
          headerLargeStyle: { backgroundColor: "transparent" },
          headerBlurEffect: "systemChromeMaterial",
          headerBackButtonDisplayMode: "default",
        };

export default function Layout() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          ...AppleStackPreset,
          headerLargeTitle: true,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Residency Tracker" }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
            presentation: "modal",
            headerLargeTitle: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
