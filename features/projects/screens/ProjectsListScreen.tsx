import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
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

type Project = {
  id: number;
  name: string;
  address: string;
  client: string;
  progress: number;
  progressWidth: `${number}%`;
  currentStage: string;
  nextMilestone: string;
  status: string;
  statusColor: string;
  statusBackground: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBackground: string;
  attention?: string;
  attentionColor?: string;
  attentionBackground?: string;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Oakwood House Extension",
    address: "12 Oakridge Drive, London",
    client: "Sarah Mitchell",
    progress: 68,
    progressWidth: "68%",
    currentStage: "Roof",
    nextMilestone: "First fix · 18 Aug",
    status: "On track",
    statusColor: "#087F72",
    statusBackground: "#E1F5F1",
    icon: "home-outline",
    iconColor: "#178F87",
    iconBackground: "#DDF2EF",
    attention: "1 decision required",
    attentionColor: "#B86B00",
    attentionBackground: "#FFF4DF",
  },
  {
    id: 2,
    name: "Riverside Renovation",
    address: "8 Riverside Lane, Manchester",
    client: "James Cooper",
    progress: 42,
    progressWidth: "42%",
    currentStage: "Foundations",
    nextMilestone: "Structure · 24 Aug",
    status: "On track",
    statusColor: "#087F72",
    statusBackground: "#E1F5F1",
    icon: "hammer-outline",
    iconColor: "#2868B2",
    iconBackground: "#E8F1FB",
  },
  {
    id: 3,
    name: "Loft Conversion",
    address: "45 Meadow Road, Brighton",
    client: "Emma Wilson",
    progress: 26,
    progressWidth: "26%",
    currentStage: "Structure",
    nextMilestone: "Roof · 29 Aug",
    status: "Attention",
    statusColor: "#B86B00",
    statusBackground: "#FFF4DF",
    icon: "layers-outline",
    iconColor: "#7857B8",
    iconBackground: "#F0EBFA",
    attention: "Timeline update needed",
    attentionColor: "#B86B00",
    attentionBackground: "#FFF4DF",
  },
  {
    id: 4,
    name: "Garden Studio",
    address: "3 Woodland Close, Bristol",
    client: "Daniel Brown",
    progress: 91,
    progressWidth: "91%",
    currentStage: "Finishing",
    nextMilestone: "Handover · 12 Aug",
    status: "On track",
    statusColor: "#087F72",
    statusBackground: "#E1F5F1",
    icon: "leaf-outline",
    iconColor: "#27824A",
    iconBackground: "#E6F5EA",
    attention: "Final payment due",
    attentionColor: "#B33B32",
    attentionBackground: "#FDECE9",
  },
];

type SummaryCardProps = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBackground: string;
};

function SummaryCard({
  label,
  value,
  icon,
  iconColor,
  iconBackground,
}: SummaryCardProps) {
  return (
    <View
      className="mr-3 w-32 rounded-2xl p-3"
      style={{ backgroundColor: iconBackground }}
    >
      <View className="h-9 w-9 items-center justify-center rounded-lg bg-white/70">
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>

      <Text className="mt-3 text-xl font-bold" style={{ color: iconColor }}>
        {value}
      </Text>

      <Text className="mt-1 text-xs text-[#71808E]">{label}</Text>
    </View>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/projects/[projectId]",
          params: { projectId: String(project.id) },
        })
      }
      className="mb-4 overflow-hidden rounded-2xl border border-[#E1E7EA] bg-white active:opacity-80"
    >
      <View className="p-4">
        {/* Project header */}
        <View className="flex-row items-start">
          <View
            className="h-14 w-14 items-center justify-center rounded-xl"
            style={{ backgroundColor: project.iconBackground }}
          >
            <Ionicons name={project.icon} size={26} color={project.iconColor} />
          </View>

          <View className="ml-3 flex-1">
            <View className="flex-row items-start">
              <Text
                numberOfLines={2}
                className="mr-2 flex-1 text-base font-bold leading-5 text-[#14375F]"
              >
                {project.name}
              </Text>

              <View
                className="rounded-full px-2.5 py-1.5"
                style={{ backgroundColor: project.statusBackground }}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{ color: project.statusColor }}
                >
                  {project.status}
                </Text>
              </View>
            </View>

            <View className="mt-1.5 flex-row items-center">
              <Ionicons name="location-outline" size={14} color="#94A3B8" />

              <Text
                numberOfLines={1}
                className="ml-1 flex-1 text-xs text-[#71808E]"
              >
                {project.address}
              </Text>
            </View>
          </View>
        </View>

        {/* Progress */}
        <View className="mt-5 flex-row items-center justify-between">
          <Text className="text-xs font-medium text-[#71808E]">
            Project progress
          </Text>

          <Text className="text-sm font-bold text-[#078C7D]">
            {project.progress}%
          </Text>
        </View>

        <View className="mt-2 h-2 overflow-hidden rounded-full bg-[#E6ECEF]">
          <View
            className="h-full rounded-full bg-[#078C7D]"
            style={{ width: project.progressWidth }}
          />
        </View>

        {/* Stage information */}
        <View className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-xl bg-[#F4F7F8] p-3">
            <View className="flex-row items-center">
              <Ionicons name="construct-outline" size={15} color="#178F87" />

              <Text className="ml-1.5 text-xs text-[#71808E]">
                Current stage
              </Text>
            </View>

            <Text className="mt-2 text-sm font-bold text-[#14375F]">
              {project.currentStage}
            </Text>
          </View>

          <View className="flex-1 rounded-xl bg-[#F4F7F8] p-3">
            <View className="flex-row items-center">
              <Ionicons name="flag-outline" size={15} color="#2868B2" />

              <Text className="ml-1.5 text-xs text-[#71808E]">
                Next milestone
              </Text>
            </View>

            <Text
              numberOfLines={1}
              className="mt-2 text-sm font-bold text-[#14375F]"
            >
              {project.nextMilestone}
            </Text>
          </View>
        </View>

        {/* Client */}
        <View className="mt-4 flex-row items-center">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-[#E8EEF3]">
            <Text className="text-xs font-bold text-[#536779]">
              {project.client
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </Text>
          </View>

          <View className="ml-2 flex-1">
            <Text className="text-xs text-[#94A3B8]">Client</Text>

            <Text className="text-sm font-semibold text-[#14375F]">
              {project.client}
            </Text>
          </View>

          <View className="h-9 w-9 items-center justify-center rounded-full bg-[#F1F4F6]">
            <Ionicons name="chevron-forward" size={19} color="#71808E" />
          </View>
        </View>
      </View>

      {/* Attention banner */}
      {project.attention ? (
        <View
          className="flex-row items-center border-t border-[#E8ECEF] px-4 py-3"
          style={{ backgroundColor: project.attentionBackground }}
        >
          <Ionicons
            name="alert-circle-outline"
            size={17}
            color={project.attentionColor}
          />

          <Text
            className="ml-2 flex-1 text-xs font-semibold"
            style={{ color: project.attentionColor }}
          >
            {project.attention}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={16}
            color={project.attentionColor}
          />
        </View>
      ) : null}
    </Pressable>
  );
}

export default function ProjectsListScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#102F52]" edges={["top", "bottom"]}>
      <StatusBar style="light" backgroundColor="#102F52" />
      <View className="flex-1 bg-[#F3F7F9]">
        <MainPageHero
          eyebrow="Project portfolio"
          title="Projects"
          subtitle="Five active builds across your workspace."
          icon="briefcase-outline"
          actionIcon="add"
          actionLabel="Create a project"
          onAction={() => router.push("/create-project/details")}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <View className="px-6 pt-6">
            <View className="h-14 flex-row items-center rounded-2xl bg-white px-4">
              <Ionicons name="search-outline" size={20} color="#71808E" />
              <TextInput
                placeholder="Search projects"
                placeholderTextColor="#94A3B8"
                className="ml-3 flex-1 text-base text-[#14375F]"
              />
              <View className="h-9 w-9 items-center justify-center rounded-xl bg-[#DDF2EF]">
                <Ionicons name="options-outline" size={19} color="#178F87" />
              </View>
            </View>
          </View>

          {/* Summary */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingTop: 16,
            }}
          >
            <SummaryCard
              label="Active projects"
              value="5"
              icon="construct-outline"
              iconColor="#178F87"
              iconBackground="#DDF2EF"
            />

            <SummaryCard
              label="Need attention"
              value="2"
              icon="alert-circle-outline"
              iconColor="#B86B00"
              iconBackground="#FFF4DF"
            />

            <SummaryCard
              label="Completed"
              value="12"
              icon="checkmark-done-outline"
              iconColor="#2868B2"
              iconBackground="#E8F1FB"
            />
          </ScrollView>

          {/* Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingTop: 22,
              paddingBottom: 20,
            }}
          >
            <View className="mr-2 rounded-full bg-[#078C7D] px-5 py-2.5">
              <Text className="text-sm font-semibold text-white">Active</Text>
            </View>

            <View className="mr-2 rounded-full border border-[#DDE5EA] bg-white px-5 py-2.5">
              <Text className="text-sm font-medium text-[#687987]">
                Upcoming
              </Text>
            </View>

            <View className="mr-2 rounded-full border border-[#DDE5EA] bg-white px-5 py-2.5">
              <Text className="text-sm font-medium text-[#687987]">
                Completed
              </Text>
            </View>

            <View className="rounded-full border border-[#DDE5EA] bg-white px-5 py-2.5">
              <Text className="text-sm font-medium text-[#687987]">
                Archived
              </Text>
            </View>
          </ScrollView>

          {/* Project list */}
          <View className="px-6">
            <View className="mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-bold text-[#14375F]">
                  Active projects
                </Text>

                <Text className="mt-1 text-xs text-[#71808E]">
                  4 of 5 projects shown
                </Text>
              </View>

              <View className="flex-row items-center">
                <Ionicons
                  name="swap-vertical-outline"
                  size={17}
                  color="#178F87"
                />

                <Text className="ml-1 text-sm font-semibold text-[#178F87]">
                  Sort
                </Text>
              </View>
            </View>

            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* Visual-only load more */}
            <Pressable
              onPress={() =>
                Alert.alert(
                  "All projects shown",
                  "The prototype currently contains the four sample projects above.",
                )
              }
              className="mt-1 flex-row items-center justify-center rounded-xl border border-[#DDE5EA] bg-white py-4 active:bg-[#F4F7F8]"
            >
              <Ionicons name="chevron-down-outline" size={18} color="#71808E" />

              <Text className="ml-2 text-sm font-semibold text-[#687987]">
                Show more projects
              </Text>
            </Pressable>
          </View>
        </ScrollView>
        <PrototypeBottomNav />
      </View>
    </SafeAreaView>
  );
}
