import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MainPageHero } from "@/components/main-page-hero";
import { PrototypeBottomNav } from "@/components/prototype-bottom-nav";
import type { ModuleKey } from "@/data/prototype-modules";

const PROJECT_TOOLS: {
  module: ModuleKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  background: string;
}[] = [
  {
    module: "updates",
    label: "Progress updates",
    icon: "images-outline",
    color: "#078C7D",
    background: "#DDF2EF",
  },
  {
    module: "decisions",
    label: "Client decisions",
    icon: "checkmark-done-outline",
    color: "#B86B00",
    background: "#FFF4DF",
  },
  {
    module: "variations",
    label: "Variations",
    icon: "git-compare-outline",
    color: "#7857B8",
    background: "#F0EBFA",
  },
  {
    module: "payments",
    label: "Payments",
    icon: "card-outline",
    color: "#2868B2",
    background: "#E8F1FB",
  },
  {
    module: "documents",
    label: "Documents",
    icon: "folder-open-outline",
    color: "#2868B2",
    background: "#E8F1FB",
  },
  {
    module: "tasks",
    label: "Tasks",
    icon: "checkbox-outline",
    color: "#078C7D",
    background: "#DDF2EF",
  },
  {
    module: "handover",
    label: "Handover",
    icon: "home-outline",
    color: "#078C7D",
    background: "#DDF2EF",
  },
  {
    module: "aftercare",
    label: "Aftercare",
    icon: "shield-checkmark-outline",
    color: "#2868B2",
    background: "#E8F1FB",
  },
];

const WORKSPACE = [
  {
    label: "Notifications",
    subtitle: "Alerts and reminders",
    icon: "notifications-outline" as const,
    route: "/notifications" as const,
    color: "#B86B00",
    background: "#FFF4DF",
  },
  {
    label: "Company settings",
    subtitle: "Profile and preferences",
    icon: "business-outline" as const,
    route: "/settings" as const,
    color: "#2868B2",
    background: "#E8F1FB",
  },
  {
    label: "Help & support",
    subtitle: "Guides and assistance",
    icon: "help-circle-outline" as const,
    route: "/support" as const,
    color: "#7857B8",
    background: "#F0EBFA",
  },
];

export default function MoreScreen() {
  const openModule = (module: ModuleKey) =>
    router.push({
      pathname: "/projects/[projectId]/[module]",
      params: { projectId: "oakwood-house-extension", module },
    });

  return (
    <SafeAreaView className="flex-1 bg-[#102F52]" edges={["top", "bottom"]}>
      <StatusBar style="light" backgroundColor="#102F52" />
      <View className="flex-1 bg-[#F3F7F9]">
        <MainPageHero
          eyebrow="Builder workspace"
          title="More"
          subtitle="Project tools, company controls, and support."
          icon="grid-outline"
          actionIcon="settings-outline"
          actionLabel="Open settings"
          onAction={() => router.push("/settings")}
        />
        <Pressable
          onPress={() => router.push("/settings")}
          className="mx-6 mt-6 flex-row items-center rounded-2xl bg-white p-4 active:bg-[#F4F7F8]"
        >
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-[#63D5C7]">
            <Text className="text-base font-bold text-[#102F52]">AB</Text>
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-base font-bold text-[#14375F]">
              Alex Builder
            </Text>
            <Text className="mt-1 text-xs text-[#71808E]">
              VisiBuild Construction Ltd.
            </Text>
          </View>
          <View className="rounded-full bg-[#DDF2EF] px-3 py-1.5">
            <Text className="text-[10px] font-bold text-[#078C7D]">OWNER</Text>
          </View>
        </Pressable>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 30 }}
        >
          <View className="mb-4 mt-7 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-xl bg-[#DDF2EF]">
              <Ionicons name="construct-outline" size={18} color="#078C7D" />
            </View>
            <View className="ml-3">
              <Text className="text-lg font-bold text-[#14375F]">
                Project tools
              </Text>
              <Text className="mt-0.5 text-xs text-[#71808E]">
                Oakwood House Extension
              </Text>
            </View>
          </View>
          <View className="flex-row flex-wrap justify-between">
            {PROJECT_TOOLS.map((item) => (
              <Pressable
                key={item.module}
                onPress={() => openModule(item.module)}
                className="mb-3 w-[48%] rounded-2xl p-4 active:opacity-70"
                style={{ backgroundColor: item.background }}
              >
                <View className="flex-row items-start justify-between">
                  <View className="h-11 w-11 items-center justify-center rounded-xl bg-white/70">
                    <Ionicons name={item.icon} size={21} color={item.color} />
                  </View>
                  <Ionicons
                    name="arrow-up-outline"
                    size={16}
                    color={item.color}
                    style={{ transform: [{ rotate: "45deg" }] }}
                  />
                </View>
                <Text
                  className="mt-4 text-sm font-bold"
                  style={{ color: item.color }}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="mb-4 mt-5 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-xl bg-[#E8F1FB]">
              <Ionicons name="business-outline" size={18} color="#2868B2" />
            </View>
            <Text className="ml-3 text-lg font-bold text-[#14375F]">
              Workspace
            </Text>
          </View>
          <View className="overflow-hidden rounded-2xl bg-white">
            {WORKSPACE.map((item, index) => (
              <View key={item.label}>
                <Pressable
                  onPress={() => router.push(item.route)}
                  className="flex-row items-center p-4 active:bg-[#F4F7F8]"
                >
                  <View
                    className="h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: item.background }}
                  >
                    <Ionicons name={item.icon} size={21} color={item.color} />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-sm font-bold text-[#14375F]">
                      {item.label}
                    </Text>
                    <Text className="mt-1 text-xs text-[#71808E]">
                      {item.subtitle}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                </Pressable>
                {index < WORKSPACE.length - 1 ? (
                  <View className="ml-16 h-px bg-[#EDF1F3]" />
                ) : null}
              </View>
            ))}
          </View>
        </ScrollView>
        <PrototypeBottomNav />
      </View>
    </SafeAreaView>
  );
}
