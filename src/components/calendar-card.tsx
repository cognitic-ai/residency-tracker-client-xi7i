import { useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import * as AC from "@bacons/apple-colors";
import { DayPresence } from "@/types";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function CalendarCard({
  year,
  month,
  calendar,
  onPrevMonth,
  onNextMonth,
}: {
  year: number;
  month: number;
  calendar: DayPresence[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
}) {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const monthLabel = new Date(year, month - 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const presenceMap = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const day of calendar) {
      map.set(day.date, day.present);
    }
    return map;
  }, [calendar]);

  const cells = useMemo(() => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const items: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) items.push(null);
    for (let d = 1; d <= daysInMonth; d++) items.push(d);
    return items;
  }, [year, month]);

  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth() + 1;
  const isFutureBlocked =
    year > today.getFullYear() ||
    (year === today.getFullYear() && month >= today.getMonth() + 1);

  return (
    <View
      style={{
        backgroundColor: AC.secondarySystemBackground,
        borderRadius: 14,
        borderCurve: "continuous",
        padding: 16,
        gap: 12,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={onPrevMonth} hitSlop={12}>
          {process.env.EXPO_OS === "ios" ? (
            <Image
              source="sf:chevron.left"
              style={{ width: 18, height: 18, tintColor: AC.systemBlue }}
            />
          ) : (
            <Text style={{ color: AC.systemBlue as any, fontSize: 20 }}>
              ‹
            </Text>
          )}
        </Pressable>
        <Text style={{ color: AC.label, fontSize: 16, fontWeight: "600" }}>
          {monthLabel}
        </Text>
        <Pressable
          onPress={onNextMonth}
          hitSlop={12}
          disabled={isFutureBlocked}
          style={{ opacity: isFutureBlocked ? 0.3 : 1 }}
        >
          {process.env.EXPO_OS === "ios" ? (
            <Image
              source="sf:chevron.right"
              style={{ width: 18, height: 18, tintColor: AC.systemBlue }}
            />
          ) : (
            <Text style={{ color: AC.systemBlue as any, fontSize: 20 }}>
              ›
            </Text>
          )}
        </Pressable>
      </View>

      {/* Weekday headers */}
      <View style={{ flexDirection: "row" }}>
        {WEEKDAYS.map((d, i) => (
          <View key={i} style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                color: AC.tertiaryLabel,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {d}
            </Text>
          </View>
        ))}
      </View>

      {/* Day grid */}
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {cells.map((day, i) => {
          if (day === null) {
            return <View key={`e-${i}`} style={{ width: "14.28%" }} />;
          }

          const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isPresent = presenceMap.get(dateStr) === true;
          const isToday = dateStr === todayStr;
          const isFuture = new Date(year, month - 1, day) > today;

          return (
            <View
              key={dateStr}
              style={{
                width: "14.28%",
                aspectRatio: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isPresent
                    ? (AC.systemGreen as any)
                    : "transparent",
                  borderWidth: isToday ? 2 : 0,
                  borderColor: isToday ? AC.systemGray : "transparent",
                  opacity: isFuture ? 0.3 : 1,
                }}
              >
                <Text
                  style={{
                    color: isPresent ? "#fff" : AC.label,
                    fontSize: 14,
                    fontWeight: isToday ? "700" : "400",
                    fontVariant: ["tabular-nums"],
                  }}
                >
                  {day}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
