import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MainPageHero } from "@/components/main-page-hero";
import { PrototypeBottomNav } from "@/components/prototype-bottom-nav";

const THREADS = [
  {
    id: "site-team",
    initials: "ST",
    title: "Site Team",
    project: "Oakwood House Extension",
    address: "12 Oakridge Drive, London",
    time: "10:30",
    unread: 2,
    color: "#078C7D",
    background: "#DDF2EF",
  },
  {
    id: "client",
    initials: "SM",
    title: "Sarah Mitchell",
    project: "Oakwood House Extension",
    address: "12 Oakridge Drive, London",
    time: "09:15",
    unread: 1,
    color: "#2868B2",
    background: "#E8F1FB",
  },
  {
    id: "roofing",
    initials: "TW",
    title: "Roofing Contractor",
    project: "Oakwood House Extension",
    address: "12 Oakridge Drive, London",
    time: "Yesterday",
    unread: 0,
    color: "#7857B8",
    background: "#F0EBFA",
  },
  {
    id: "architect",
    initials: "AR",
    title: "Architect",
    project: "Loft Conversion",
    address: "45 Meadow Road, Brighton",
    time: "Monday",
    unread: 0,
    color: "#B86B00",
    background: "#FFF4DF",
  },
];

export default function MessagesScreen() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const normalizedQuery = query.trim().toLowerCase();
  const visible = THREADS.filter((thread) => {
    const searchableDetails = [thread.title, thread.project, thread.address]
      .join(" ")
      .toLowerCase();

    return (
      searchableDetails.includes(normalizedQuery) &&
      (filter === "all" || thread.unread > 0)
    );
  });

  return (
    <SafeAreaView className="flex-1 bg-[#102F52]" edges={["top", "bottom"]}>
      <StatusBar style="light" backgroundColor="#102F52" />
      <View className="flex-1 bg-[#F3F7F9]">
        <MainPageHero
          eyebrow="Project communication"
          title="Messages"
          subtitle="Three unread messages across two conversations."
          icon="chatbubbles-outline"
          actionIcon="create-outline"
          actionLabel="Start a conversation"
          badge={3}
          onAction={() =>
            Alert.alert(
              "New conversation",
              "Choose a client or team member to start a local prototype conversation.",
            )
          }
        />
        <View className="mx-6 mt-6 h-14 flex-row items-center rounded-2xl bg-white px-4">
          <Ionicons name="search-outline" size={20} color="#71808E" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search names, projects or addresses"
            placeholderTextColor="#94A3B8"
            className="ml-3 flex-1 text-base text-[#14375F]"
          />
          {query ? (
            <Pressable onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={20} color="#94A3B8" />
            </Pressable>
          ) : null}
        </View>

        <View className="flex-row px-6 pb-4 pt-6">
          <Pressable
            onPress={() => setFilter("all")}
            className={`mr-2 flex-row items-center rounded-full px-4 py-2.5 ${filter === "all" ? "bg-[#14375F]" : "bg-white"}`}
          >
            <Text
              className={`text-xs font-bold ${filter === "all" ? "text-white" : "text-[#71808E]"}`}
            >
              All
            </Text>
            <View
              className={`ml-2 rounded-full px-2 py-0.5 ${filter === "all" ? "bg-white/15" : "bg-[#EDF1F3]"}`}
            >
              <Text
                className={`text-[10px] font-bold ${filter === "all" ? "text-white" : "text-[#71808E]"}`}
              >
                4
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => setFilter("unread")}
            className={`flex-row items-center rounded-full px-4 py-2.5 ${filter === "unread" ? "bg-[#078C7D]" : "bg-white"}`}
          >
            <Text
              className={`text-xs font-bold ${filter === "unread" ? "text-white" : "text-[#71808E]"}`}
            >
              Unread
            </Text>
            <View
              className={`ml-2 rounded-full px-2 py-0.5 ${filter === "unread" ? "bg-white/15" : "bg-[#DDF2EF]"}`}
            >
              <Text
                className={`text-[10px] font-bold ${filter === "unread" ? "text-white" : "text-[#078C7D]"}`}
              >
                2
              </Text>
            </View>
          </Pressable>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 28 }}
        >
          {visible.map((thread) => (
            <Pressable
              key={thread.id}
              onPress={() =>
                router.push({
                  pathname: "/messages/[threadId]",
                  params: { threadId: thread.id, title: thread.title },
                })
              }
              className="mb-3 overflow-hidden rounded-2xl bg-white active:opacity-70"
              style={{ borderLeftColor: thread.color, borderLeftWidth: 4 }}
            >
              <View className="flex-row items-center p-4">
                <View
                  className="h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: thread.background }}
                >
                  <Text
                    className="text-sm font-bold"
                    style={{ color: thread.color }}
                  >
                    {thread.initials}
                  </Text>
                </View>
                <View className="ml-3 flex-1">
                  <View className="flex-row items-center">
                    <Text className="flex-1 text-sm font-bold text-[#14375F]">
                      {thread.title}
                    </Text>
                    <Text className="text-[11px] text-[#94A3B8]">
                      {thread.time}
                    </Text>
                  </View>
                  <View className="mt-2 flex-row items-center">
                    <Ionicons
                      name="briefcase-outline"
                      size={13}
                      color={thread.color}
                    />
                    <Text
                      numberOfLines={1}
                      className="ml-1.5 flex-1 text-xs font-semibold text-[#536779]"
                    >
                      {thread.project}
                    </Text>
                  </View>
                  <View className="mt-1.5 flex-row items-center">
                    <Ionicons
                      name="location-outline"
                      size={13}
                      color="#94A3B8"
                    />
                    <Text
                      numberOfLines={1}
                      className="ml-1.5 flex-1 text-[11px] text-[#71808E]"
                    >
                      {thread.address}
                    </Text>
                  </View>
                </View>
                {thread.unread ? (
                  <View
                    className="ml-3 h-7 min-w-7 items-center justify-center rounded-full px-2"
                    style={{ backgroundColor: thread.color }}
                  >
                    <Text className="text-[10px] font-bold text-white">
                      {thread.unread}
                    </Text>
                  </View>
                ) : (
                  <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                )}
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <PrototypeBottomNav />
      </View>
    </SafeAreaView>
  );
}
