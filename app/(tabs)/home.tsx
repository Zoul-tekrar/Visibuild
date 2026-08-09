import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MainPageHero } from "@/components/main-page-hero";
import { PrototypeBottomNav } from "@/components/prototype-bottom-nav";

const QUICK_ACTIONS = [
  {
    label: "New project",
    icon: "add-circle-outline" as const,
    color: "#078C7D",
    background: "#DDF2EF",
    onPress: () => router.push("/create-project/details"),
  },
  {
    label: "Add update",
    icon: "images-outline" as const,
    color: "#2868B2",
    background: "#E8F1FB",
    onPress: () =>
      router.push({
        pathname: "/projects/[projectId]/[module]/new",
        params: { projectId: "oakwood-house-extension", module: "updates" },
      }),
  },
  {
    label: "Request payment",
    icon: "card-outline" as const,
    color: "#7857B8",
    background: "#F0EBFA",
    onPress: () =>
      router.push({
        pathname: "/projects/[projectId]/[module]/new",
        params: { projectId: "oakwood-house-extension", module: "payments" },
      }),
  },
];

const ACTIVE_PROJECTS = [
  {
    id: "oakwood-house-extension",
    name: "Oakwood House Extension",
    stage: "Roof",
    progress: 68,
    width: "68%" as const,
    icon: "home-outline" as const,
    color: "#078C7D",
    background: "#DDF2EF",
  },
  {
    id: "riverside-renovation",
    name: "Riverside Renovation",
    stage: "Foundations",
    progress: 42,
    width: "42%" as const,
    icon: "hammer-outline" as const,
    color: "#2868B2",
    background: "#E8F1FB",
  },
  {
    id: "loft-conversion",
    name: "Loft Conversion",
    stage: "Structure",
    progress: 26,
    width: "26%" as const,
    icon: "layers-outline" as const,
    color: "#7857B8",
    background: "#F0EBFA",
  },
];

const TODAY_SCHEDULE = [
  {
    time: "09:00",
    title: "Site walk",
    project: "Oakwood House Extension",
    person: "Mike Johnson",
    location: "12 Oakridge Drive",
    icon: "walk-outline" as const,
    color: "#078C7D",
    background: "#DDF2EF",
  },
  {
    time: "11:00",
    title: "Roof inspection",
    project: "Oakwood House Extension",
    person: "Building Control",
    location: "Rear extension",
    icon: "search-outline" as const,
    color: "#2868B2",
    background: "#E8F1FB",
  },
  {
    time: "14:30",
    title: "Client review",
    project: "Riverside Renovation",
    person: "James Cooper",
    location: "8 Riverside Lane",
    icon: "people-outline" as const,
    color: "#7857B8",
    background: "#F0EBFA",
  },
];

const DUE_TASKS = [
  {
    id: "inspection",
    title: "Book roof inspection",
    project: "Oakwood House Extension",
    due: "Today",
    color: "#B86B00",
    background: "#FFF4DF",
  },
  {
    id: "scaffolding",
    title: "Confirm scaffolding collection",
    project: "Oakwood House Extension",
    due: "Tomorrow",
    color: "#2868B2",
    background: "#E8F1FB",
  },
  {
    id: "drawings",
    title: "Review revised drawings",
    project: "Loft Conversion",
    due: "22 Aug",
    color: "#7857B8",
    background: "#F0EBFA",
  },
];

function SectionHeader({
  title,
  count,
  icon,
  color,
  background,
  action,
  onAction,
}: {
  title: string;
  count?: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  background: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View className="mb-4 mt-8 flex-row items-center">
      <View
        className="h-9 w-9 items-center justify-center rounded-xl"
        style={{ backgroundColor: background }}
      >
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <View className="ml-3 flex-1">
        <View className="flex-row items-center">
          <Text className="text-lg font-bold text-[#14375F]">{title}</Text>
          {count ? (
            <View
              className="ml-2 rounded-full px-2 py-0.5"
              style={{ backgroundColor: background }}
            >
              <Text className="text-[10px] font-bold" style={{ color }}>
                {count}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      {action && onAction ? (
        <Pressable onPress={onAction}>
          <Text className="text-sm font-semibold text-[#078C7D]">{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#102F52]" edges={["top", "bottom"]}>
      <StatusBar style="light" />
      <View className="flex-1 bg-[#F3F7F9]">
        <MainPageHero
          eyebrow="Builder workspace"
          title="Good morning, Alex"
          subtitle="Three projects are active and today has three scheduled appointments."
          icon="sparkles-outline"
          actionIcon="notifications-outline"
          actionLabel="Open notifications"
          badge={3}
          onAction={() => router.push("/notifications")}
        />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 36 }}
        >
          <SectionHeader
            title="Quick actions"
            icon="flash-outline"
            color="#078C7D"
            background="#DDF2EF"
          />
          <View className="flex-row gap-3">
            {QUICK_ACTIONS.map((action) => (
              <Pressable
                key={action.label}
                onPress={action.onPress}
                className="flex-1 items-center rounded-2xl px-2 py-5 active:opacity-70"
                style={{ backgroundColor: action.background }}
              >
                <View className="h-11 w-11 items-center justify-center rounded-xl bg-white/70">
                  <Ionicons name={action.icon} size={22} color={action.color} />
                </View>
                <Text
                  className="mt-3 text-center text-xs font-bold"
                  style={{ color: action.color }}
                >
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <SectionHeader
            title="Active projects"
            count="3"
            icon="briefcase-outline"
            color="#2868B2"
            background="#E8F1FB"
            action="View all"
            onAction={() => router.push("/projects")}
          />
          <View className="overflow-hidden rounded-2xl bg-white">
            {ACTIVE_PROJECTS.map((project, index) => (
              <View key={project.id}>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/projects/[projectId]",
                      params: { projectId: project.id },
                    })
                  }
                  className="p-4 active:bg-[#F4F7F8]"
                >
                  <View className="flex-row items-center">
                    <View
                      className="h-12 w-12 items-center justify-center rounded-xl"
                      style={{ backgroundColor: project.background }}
                    >
                      <Ionicons
                        name={project.icon}
                        size={23}
                        color={project.color}
                      />
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="text-sm font-bold text-[#14375F]">
                        {project.name}
                      </Text>
                      <View className="mt-1 flex-row items-center">
                        <Ionicons
                          name="construct-outline"
                          size={13}
                          color={project.color}
                        />
                        <Text className="ml-1 text-xs text-[#71808E]">
                          {project.stage}
                        </Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text
                        className="text-lg font-bold"
                        style={{ color: project.color }}
                      >
                        {project.progress}%
                      </Text>
                      <Text className="mt-0.5 text-[10px] text-[#94A3B8]">
                        complete
                      </Text>
                    </View>
                  </View>
                  <View className="ml-16 mt-3 h-1.5 overflow-hidden rounded-full bg-[#E7EDF0]">
                    <View
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: project.color,
                        width: project.width,
                      }}
                    />
                  </View>
                </Pressable>
                {index < ACTIVE_PROJECTS.length - 1 ? (
                  <View className="ml-20 h-px bg-[#EDF1F3]" />
                ) : null}
              </View>
            ))}
          </View>

          <SectionHeader
            title="Today’s Schedule"
            count="3"
            icon="calendar-outline"
            color="#078C7D"
            background="#DDF2EF"
            action="Calendar"
            onAction={() => router.push("/calendar")}
          />
          {TODAY_SCHEDULE.map((item) => (
            <Pressable
              key={`${item.time}-${item.title}`}
              onPress={() =>
                Alert.alert(
                  item.title,
                  `${item.time} · ${item.project}\nWith: ${item.person}\nWhere: ${item.location}`,
                )
              }
              className="mb-3 overflow-hidden rounded-2xl bg-white active:opacity-70"
            >
              <View className="h-1" style={{ backgroundColor: item.color }} />
              <View className="flex-row p-4">
                <View className="items-center">
                  <View
                    className="rounded-xl px-3 py-2"
                    style={{ backgroundColor: item.background }}
                  >
                    <Text
                      className="text-sm font-bold"
                      style={{ color: item.color }}
                    >
                      {item.time}
                    </Text>
                  </View>
                  <View
                    className="mt-2 h-9 w-9 items-center justify-center rounded-xl"
                    style={{ backgroundColor: item.background }}
                  >
                    <Ionicons name={item.icon} size={18} color={item.color} />
                  </View>
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-sm font-bold text-[#14375F]">
                    {item.title}
                  </Text>
                  <View className="mt-2 flex-row items-center">
                    <Ionicons
                      name="briefcase-outline"
                      size={14}
                      color="#71808E"
                    />
                    <Text
                      numberOfLines={1}
                      className="ml-2 flex-1 text-xs font-semibold text-[#536779]"
                    >
                      {item.project}
                    </Text>
                  </View>
                  <View className="mt-2 flex-row">
                    <View className="mr-3 flex-1 flex-row items-center">
                      <Ionicons
                        name="person-outline"
                        size={14}
                        color="#94A3B8"
                      />
                      <Text
                        numberOfLines={1}
                        className="ml-1.5 flex-1 text-[11px] text-[#71808E]"
                      >
                        {item.person}
                      </Text>
                    </View>
                    <View className="flex-1 flex-row items-center">
                      <Ionicons
                        name="location-outline"
                        size={14}
                        color="#94A3B8"
                      />
                      <Text
                        numberOfLines={1}
                        className="ml-1.5 flex-1 text-[11px] text-[#71808E]"
                      >
                        {item.location}
                      </Text>
                    </View>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </Pressable>
          ))}

          <SectionHeader
            title="Tasks due soon"
            count="3"
            icon="checkbox-outline"
            color="#B86B00"
            background="#FFF4DF"
            action="All tasks"
            onAction={() =>
              router.push({
                pathname: "/projects/[projectId]/[module]",
                params: {
                  projectId: "oakwood-house-extension",
                  module: "tasks",
                },
              })
            }
          />
          <View className="overflow-hidden rounded-2xl bg-white">
            {DUE_TASKS.map((task, index) => (
              <View key={task.id}>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/projects/[projectId]/[module]",
                      params: {
                        projectId: "oakwood-house-extension",
                        module: "tasks",
                      },
                    })
                  }
                  className="flex-row items-center p-4 active:bg-[#F4F7F8]"
                >
                  <View
                    className="h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: task.background }}
                  >
                    <Ionicons
                      name="ellipse-outline"
                      size={20}
                      color={task.color}
                    />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-sm font-bold text-[#14375F]">
                      {task.title}
                    </Text>
                    <Text className="mt-1 text-xs text-[#71808E]">
                      {task.project}
                    </Text>
                  </View>
                  <View
                    className="rounded-full px-3 py-1.5"
                    style={{ backgroundColor: task.background }}
                  >
                    <Text
                      className="text-[10px] font-bold"
                      style={{ color: task.color }}
                    >
                      {task.due}
                    </Text>
                  </View>
                </Pressable>
                {index < DUE_TASKS.length - 1 ? (
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
