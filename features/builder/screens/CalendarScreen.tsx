import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MainPageHero } from "@/components/main-page-hero";
import { PrototypeBottomNav } from "@/components/prototype-bottom-nav";

const DAYS = [
  { day: "Mon", date: 17 },
  { day: "Tue", date: 18 },
  { day: "Wed", date: 19 },
  { day: "Thu", date: 20 },
  { day: "Fri", date: 21 },
];

type CalendarEvent = {
  time: string;
  title: string;
  project: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  background: string;
};

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    time: "09:00",
    title: "Site walk",
    project: "Oakwood House Extension",
    icon: "walk-outline",
    color: "#078C7D",
    background: "#DDF2EF",
  },
  {
    time: "11:00",
    title: "Roof inspection",
    project: "Oakwood House Extension",
    icon: "search-outline",
    color: "#2868B2",
    background: "#E8F1FB",
  },
  {
    time: "14:30",
    title: "Client review",
    project: "Riverside Residences",
    icon: "people-outline",
    color: "#7857B8",
    background: "#F0EBFA",
  },
];

export default function CalendarScreen() {
  const [selected, setSelected] = useState(19);
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const addEvent = () => {
    setEvents((current) => [
      ...current,
      {
        time: "16:00",
        title: "New site appointment",
        project: "Oakwood House Extension",
        icon: "calendar-outline",
        color: "#B86B00",
        background: "#FFF4DF",
      },
    ]);
    Alert.alert("Event added", "A sample appointment was added to this day.");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#102F52]" edges={["top", "bottom"]}>
      <StatusBar style="light" backgroundColor="#102F52" />
      <View className="flex-1 bg-[#F3F7F9]">
        <MainPageHero
          eyebrow="Work programme"
          title="Calendar"
          subtitle="August 2026 · Three appointments today"
          icon="calendar-outline"
          actionIcon="add"
          actionLabel="Add an event"
          onAction={addEvent}
        />
        <View className="mx-6 mt-6 rounded-2xl bg-white p-4">
          <View className="mb-5 flex-row items-center justify-between">
            <Pressable
              onPress={() => Alert.alert("Previous week")}
              className="h-9 w-9 items-center justify-center rounded-xl bg-[#F1F4F6]"
            >
              <Ionicons name="chevron-back" size={20} color="#14375F" />
            </Pressable>
            <View className="items-center">
              <Text className="text-base font-bold text-[#14375F]">
                17 – 21 August
              </Text>
              <Text className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#078C7D]">
                This week
              </Text>
            </View>
            <Pressable
              onPress={() => Alert.alert("Next week")}
              className="h-9 w-9 items-center justify-center rounded-xl bg-[#F1F4F6]"
            >
              <Ionicons name="chevron-forward" size={20} color="#14375F" />
            </Pressable>
          </View>
          <View className="flex-row justify-between">
            {DAYS.map((item) => {
              const active = selected === item.date;
              return (
                <Pressable
                  key={item.date}
                  onPress={() => setSelected(item.date)}
                  className={`h-16 w-14 items-center justify-center rounded-2xl ${active ? "bg-[#078C7D]" : "bg-[#F1F4F6]"}`}
                >
                  <Text
                    className={`text-xs font-medium ${active ? "text-[#CFF5EF]" : "text-[#71808E]"}`}
                  >
                    {item.day}
                  </Text>
                  <Text
                    className={`mt-1 text-base font-bold ${active ? "text-white" : "text-[#14375F]"}`}
                  >
                    {item.date}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 28 }}
        >
          <View className="px-6">
            <View className="mb-4 mt-7 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="h-9 w-9 items-center justify-center rounded-xl bg-[#E8F1FB]">
                  <Ionicons name="today-outline" size={18} color="#2868B2" />
                </View>
                <View className="ml-3">
                  <Text className="text-lg font-bold text-[#14375F]">
                    Wednesday, {selected} August
                  </Text>
                  <Text className="mt-1 text-xs text-[#71808E]">
                    {events.length} scheduled events
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={addEvent}
                className="h-9 w-9 items-center justify-center rounded-full bg-[#DDF2EF]"
              >
                <Ionicons name="add" size={19} color="#078C7D" />
              </Pressable>
            </View>

            {events.map((event, index) => (
              <Pressable
                key={`${event.time}-${index}`}
                onPress={() =>
                  Alert.alert(event.title, `${event.time} · ${event.project}`)
                }
                className="mb-3 overflow-hidden rounded-2xl bg-white active:opacity-70"
              >
                <View
                  className="h-1"
                  style={{ backgroundColor: event.color }}
                />
                <View className="flex-row items-center p-4">
                  <View className="w-14">
                    <Text className="text-sm font-bold text-[#14375F]">
                      {event.time}
                    </Text>
                    <Text className="mt-1 text-xs text-[#94A3B8]">1 hr</Text>
                  </View>
                  <View
                    className="h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: event.background }}
                  >
                    <Ionicons name={event.icon} size={20} color={event.color} />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-sm font-bold text-[#14375F]">
                      {event.title}
                    </Text>
                    <Text className="mt-1 text-xs text-[#71808E]">
                      {event.project}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        <PrototypeBottomNav />
      </View>
    </SafeAreaView>
  );
}
