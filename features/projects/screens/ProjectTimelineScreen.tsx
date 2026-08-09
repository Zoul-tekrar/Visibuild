import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type StageStatus = "completed" | "current" | "upcoming";

type ProjectStage = {
  id: number;
  title: string;
  dates: string;
  description: string;
  status: StageStatus;
  progress?: number;
  progressWidth?: `${number}%`;
  taskProgress?: string;
};

const PROJECT_STAGES: ProjectStage[] = [
  {
    id: 1,
    title: "Pre-construction",
    dates: "Completed 18 Mar 2026",
    description: "Contracts, surveys, planning, and site preparation.",
    status: "completed",
  },
  {
    id: 2,
    title: "Foundations",
    dates: "Completed 22 Apr 2026",
    description: "Excavation, drainage, footings, and concrete.",
    status: "completed",
  },
  {
    id: 3,
    title: "Structural work",
    dates: "Completed 20 Jun 2026",
    description: "Structural steel, walls, floors, and supports.",
    status: "completed",
  },
  {
    id: 4,
    title: "Roof",
    dates: "12 Aug – 30 Aug 2026",
    description: "Roof structure, membrane, insulation, and tiles.",
    status: "current",
    progress: 60,
    progressWidth: "60%",
    taskProgress: "3 of 5 tasks complete",
  },
  {
    id: 5,
    title: "First fix",
    dates: "31 Aug – 25 Sep 2026",
    description: "Electrical, plumbing, heating, and ventilation.",
    status: "upcoming",
  },
  {
    id: 6,
    title: "Plastering",
    dates: "28 Sep – 16 Oct 2026",
    description: "Insulation, boarding, plastering, and drying.",
    status: "upcoming",
  },
  {
    id: 7,
    title: "Second fix",
    dates: "19 Oct – 27 Nov 2026",
    description: "Joinery, fittings, plumbing, and decorating.",
    status: "upcoming",
  },
  {
    id: 8,
    title: "Finishing and handover",
    dates: "30 Nov 2026 – 27 Jan 2027",
    description: "Finishing, snagging, certificates, and client sign-off.",
    status: "upcoming",
  },
];

type TimelineStageProps = {
  stage: ProjectStage;
  isLast: boolean;
};

function TimelineStage({ stage, isLast }: TimelineStageProps) {
  const completed = stage.status === "completed";
  const current = stage.status === "current";

  const nodeBackground = completed
    ? "#078C7D"
    : current
      ? "#2868B2"
      : "#FFFFFF";

  const nodeBorder = completed ? "#078C7D" : current ? "#2868B2" : "#CBD5DC";

  return (
    <View className="flex-row">
      {/* Timeline line */}
      <View className="w-11 items-center">
        <View
          className="z-10 h-9 w-9 items-center justify-center rounded-full border-2"
          style={{
            backgroundColor: nodeBackground,
            borderColor: nodeBorder,
          }}
        >
          {completed ? (
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
          ) : current ? (
            <Ionicons name="construct" size={17} color="#FFFFFF" />
          ) : (
            <View className="h-2.5 w-2.5 rounded-full bg-[#CBD5DC]" />
          )}
        </View>

        {!isLast ? (
          <View
            className="min-h-20 w-0.5 flex-1"
            style={{
              backgroundColor: completed ? "#078C7D" : "#D7E0E5",
            }}
          />
        ) : null}
      </View>

      {/* Stage card */}
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/projects/[projectId]/stage/[stageId]",
            params: {
              projectId: "oakwood-house-extension",
              stageId: String(stage.id),
            },
          })
        }
        className={`mb-4 ml-2 flex-1 rounded-2xl border p-4 ${
          current
            ? "border-[#A7C7E9] bg-[#F3F8FD]"
            : "border-[#E1E7EA] bg-white"
        }`}
      >
        <View className="flex-row items-start">
          <View className="flex-1">
            <View className="flex-row flex-wrap items-center">
              <Text className="text-base font-bold text-[#14375F]">
                {stage.title}
              </Text>

              {current ? (
                <View className="ml-2 rounded-full bg-[#E8F1FB] px-2.5 py-1">
                  <Text className="text-xs font-semibold text-[#2868B2]">
                    In progress
                  </Text>
                </View>
              ) : null}
            </View>

            <Text className="mt-1 text-xs font-medium text-[#71808E]">
              {stage.dates}
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </View>

        <Text className="mt-3 text-sm leading-5 text-[#687987]">
          {stage.description}
        </Text>

        {completed ? (
          <View className="mt-4 flex-row items-center">
            <Ionicons name="checkmark-circle" size={18} color="#078C7D" />

            <Text className="ml-2 text-xs font-semibold text-[#078C7D]">
              Stage completed
            </Text>
          </View>
        ) : null}

        {current ? (
          <>
            <View className="mt-4 flex-row items-center justify-between">
              <Text className="text-xs font-medium text-[#71808E]">
                Stage progress
              </Text>

              <Text className="text-sm font-bold text-[#2868B2]">
                {stage.progress}%
              </Text>
            </View>

            <View className="mt-2 h-2 overflow-hidden rounded-full bg-[#DCE7F1]">
              <View
                className="h-full rounded-full bg-[#2868B2]"
                style={{ width: stage.progressWidth }}
              />
            </View>

            <View className="mt-4 flex-row items-center justify-between rounded-xl bg-white p-3">
              <View className="flex-row items-center">
                <Ionicons
                  name="checkmark-done-outline"
                  size={18}
                  color="#178F87"
                />

                <Text className="ml-2 text-xs font-medium text-[#536779]">
                  {stage.taskProgress}
                </Text>
              </View>

              <Text className="text-xs font-semibold text-[#2868B2]">
                View tasks
              </Text>
            </View>

            <View className="mt-4 flex-row gap-3">
              <View className="h-11 flex-1 flex-row items-center justify-center rounded-xl bg-[#2868B2]">
                <Ionicons name="camera-outline" size={18} color="#FFFFFF" />

                <Text className="ml-2 text-sm font-semibold text-white">
                  Log update
                </Text>
              </View>

              <View className="h-11 flex-1 flex-row items-center justify-center rounded-xl border border-[#B8CCE0] bg-white">
                <Ionicons name="open-outline" size={18} color="#2868B2" />

                <Text className="ml-2 text-sm font-semibold text-[#2868B2]">
                  View stage
                </Text>
              </View>
            </View>
          </>
        ) : null}

        {stage.status === "upcoming" ? (
          <View className="mt-4 flex-row items-center">
            <Ionicons name="time-outline" size={17} color="#94A3B8" />

            <Text className="ml-2 text-xs font-medium text-[#71808E]">
              Upcoming stage
            </Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

type NavigationItemProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  badge?: number;
};

function NavigationItem({
  label,
  icon,
  active = false,
  badge,
}: NavigationItemProps) {
  const color = active ? "#63D5C7" : "#9FB0C1";
  const href =
    label === "Home"
      ? "/home"
      : label === "Projects"
        ? "/projects"
        : `/${label.toLowerCase()}`;

  return (
    <Pressable
      onPress={() => router.navigate(href as never)}
      className="flex-1 items-center justify-center py-2 active:opacity-60"
    >
      <View className="relative">
        <Ionicons name={icon} size={22} color={color} />

        {badge ? (
          <View className="absolute -right-2 -top-1 h-4 min-w-4 items-center justify-center rounded-full bg-[#D84A3D] px-1">
            <Text className="text-[9px] font-bold text-white">{badge}</Text>
          </View>
        ) : null}
      </View>

      <Text
        className="mt-1 text-[10px]"
        style={{
          color,
          fontWeight: active ? "700" : "500",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function ProjectTimelineScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F8FBFC]" edges={["top", "bottom"]}>
      <StatusBar style="dark" backgroundColor="#F8FBFC" />

      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-[#E1E7EA] bg-white px-5 py-3">
        <Pressable
          onPress={() => router.back()}
          className="h-11 w-11 items-center justify-center rounded-full border border-[#DDE5EA] bg-white active:opacity-60"
        >
          <Ionicons name="chevron-back" size={22} color="#14375F" />
        </Pressable>

        <View className="items-center">
          <Text className="text-base font-bold text-[#14375F]">
            Project timeline
          </Text>

          <Text className="mt-0.5 text-xs text-[#71808E]">
            Oakwood House Extension
          </Text>
        </View>

        <View className="h-11 w-11 items-center justify-center rounded-full">
          <Ionicons name="ellipsis-horizontal" size={23} color="#14375F" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
      >
        {/* Project navigation */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 16,
          }}
        >
          <Pressable
            onPress={() =>
              router.replace({
                pathname: "/projects/[projectId]",
                params: { projectId: "oakwood-house-extension" },
              })
            }
            className="mr-2 rounded-full border border-[#DDE5EA] bg-white px-5 py-2.5 active:opacity-60"
          >
            <Text className="text-sm font-medium text-[#687987]">Overview</Text>
          </Pressable>

          <View className="mr-2 rounded-full bg-[#078C7D] px-5 py-2.5">
            <Text className="text-sm font-semibold text-white">Timeline</Text>
          </View>

          <Pressable
            onPress={() =>
              router.push({
                pathname: "/projects/[projectId]/[module]",
                params: {
                  projectId: "oakwood-house-extension",
                  module: "updates",
                },
              })
            }
            className="mr-2 rounded-full border border-[#DDE5EA] bg-white px-5 py-2.5 active:opacity-60"
          >
            <Text className="text-sm font-medium text-[#687987]">Updates</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              router.push({
                pathname: "/projects/[projectId]/[module]",
                params: {
                  projectId: "oakwood-house-extension",
                  module: "payments",
                },
              })
            }
            className="mr-2 rounded-full border border-[#DDE5EA] bg-white px-5 py-2.5 active:opacity-60"
          >
            <Text className="text-sm font-medium text-[#687987]">Payments</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/more")}
            className="rounded-full border border-[#DDE5EA] bg-white px-5 py-2.5 active:opacity-60"
          >
            <Text className="text-sm font-medium text-[#687987]">More</Text>
          </Pressable>
        </ScrollView>

        <View className="px-6">
          {/* Timeline summary */}
          <View className="rounded-2xl bg-[#14375F] p-5">
            <View className="flex-row items-start">
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Ionicons name="git-branch-outline" size={23} color="#63D5C7" />
              </View>

              <View className="ml-3 flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-bold text-white">
                    Project timeline
                  </Text>

                  <View className="rounded-full bg-[#DDF2EF] px-2.5 py-1.5">
                    <Text className="text-xs font-semibold text-[#087F72]">
                      On track
                    </Text>
                  </View>
                </View>

                <Text className="mt-1 text-xs text-[#C9D6E1]">
                  18 Mar 2026 – 27 Jan 2027
                </Text>
              </View>
            </View>

            <View className="mt-6 flex-row">
              <View className="flex-1">
                <Text className="text-xs text-[#C9D6E1]">Overall progress</Text>

                <Text className="mt-1 text-2xl font-bold text-white">68%</Text>
              </View>

              <View className="flex-1">
                <Text className="text-xs text-[#C9D6E1]">Current stage</Text>

                <Text className="mt-1 text-base font-bold text-white">
                  Roof
                </Text>
              </View>

              <View className="flex-1">
                <Text className="text-xs text-[#C9D6E1]">Completion</Text>

                <Text className="mt-1 text-base font-bold text-white">
                  27 Jan
                </Text>
              </View>
            </View>

            <View className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
              <View className="h-full w-[68%] rounded-full bg-[#48C8B8]" />
            </View>
          </View>

          {/* Stage source */}
          <View className="mt-4 flex-row items-center rounded-xl border border-[#CDE7E3] bg-[#EDF8F6] p-4">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#D8F0EC]">
              <Ionicons name="sparkles-outline" size={20} color="#178F87" />
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold text-[#14375F]">
                AI-assisted stages
              </Text>

              <Text className="mt-1 text-xs text-[#71808E]">
                Extracted from Oakwood Estimate.pdf
              </Text>
            </View>

            <Ionicons name="document-text-outline" size={19} color="#178F87" />
          </View>

          {/* Legend */}
          <View className="mb-6 mt-6 flex-row flex-wrap items-center">
            <View className="mr-4 flex-row items-center">
              <View className="h-2.5 w-2.5 rounded-full bg-[#078C7D]" />

              <Text className="ml-1.5 text-xs text-[#71808E]">Completed</Text>
            </View>

            <View className="mr-4 flex-row items-center">
              <View className="h-2.5 w-2.5 rounded-full bg-[#2868B2]" />

              <Text className="ml-1.5 text-xs text-[#71808E]">In progress</Text>
            </View>

            <View className="flex-row items-center">
              <View className="h-2.5 w-2.5 rounded-full border border-[#CBD5DC] bg-white" />

              <Text className="ml-1.5 text-xs text-[#71808E]">Upcoming</Text>
            </View>
          </View>

          {/* Timeline heading */}
          <View className="mb-5 flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-bold text-[#14375F]">
                Construction stages
              </Text>

              <Text className="mt-1 text-xs text-[#71808E]">
                3 completed · 1 in progress · 4 upcoming
              </Text>
            </View>

            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#EDF8F6]">
              <Ionicons name="options-outline" size={19} color="#178F87" />
            </View>
          </View>

          {/* Timeline stages */}
          {PROJECT_STAGES.map((stage, index) => (
            <TimelineStage
              key={stage.id}
              stage={stage}
              isLast={index === PROJECT_STAGES.length - 1}
            />
          ))}

          {/* Timeline warning */}
          <View className="mt-2 flex-row items-start rounded-2xl border border-[#CFE0EF] bg-[#F1F7FC] p-4">
            <Ionicons
              name="information-circle-outline"
              size={21}
              color="#2868B2"
            />

            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold text-[#14375F]">
                Schedule changes
              </Text>

              <Text className="mt-1 text-xs leading-5 text-[#687987]">
                Changing stage dates may affect later milestones, client
                decisions, and payment-request dates.
              </Text>
            </View>
          </View>

          {/* Visual-only edit button */}
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/project-setup/[mode]",
                params: { mode: "edit-timeline" },
              })
            }
            className="mt-6 h-14 flex-row items-center justify-center rounded-xl bg-[#078C7D] active:opacity-80"
          >
            <Ionicons name="create-outline" size={19} color="#FFFFFF" />

            <Text className="ml-2 text-base font-bold text-white">
              Edit project timeline
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Bottom navigation */}
      <View className="flex-row border-t border-white/10 bg-[#102F52] px-2">
        <NavigationItem label="Home" icon="home-outline" />

        <NavigationItem label="Projects" icon="briefcase" active />

        <NavigationItem label="Calendar" icon="calendar-outline" />

        <NavigationItem label="Messages" icon="chatbubble-outline" badge={3} />

        <NavigationItem
          label="More"
          icon="ellipsis-horizontal-circle-outline"
        />
      </View>
    </SafeAreaView>
  );
}
{
  /* When variation is added, timeline should change accordingly  */
}
{
  /* Builder should be able to add Stages to timeline when new work is added */
}
