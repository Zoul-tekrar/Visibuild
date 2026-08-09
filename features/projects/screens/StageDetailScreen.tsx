import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type StageTaskStatus = "completed" | "in-progress" | "upcoming";

type StageTask = {
  id: number;
  title: string;
  assignee: string;
  status: StageTaskStatus;
  dueDate?: string;
};

const STAGE_TASKS: StageTask[] = [
  {
    id: 1,
    title: "Complete roof structure",
    assignee: "Site team",
    status: "completed",
  },
  {
    id: 2,
    title: "Install waterproof membrane",
    assignee: "Roofing contractor",
    status: "completed",
  },
  {
    id: 3,
    title: "Install roof insulation",
    assignee: "Site team",
    status: "completed",
  },
  {
    id: 4,
    title: "Install roof tiles",
    assignee: "Roofing contractor",
    status: "in-progress",
    dueDate: "Due 24 Aug",
  },
  {
    id: 5,
    title: "Complete roof inspection",
    assignee: "Site manager",
    status: "upcoming",
    dueDate: "Due 30 Aug",
  },
];

function StageTaskRow({ task }: { task: StageTask }) {
  const completed = task.status === "completed";
  const inProgress = task.status === "in-progress";

  return (
    <View className="flex-row items-start py-4">
      <View
        className={`h-7 w-7 items-center justify-center rounded-full border ${
          completed
            ? "border-[#078C7D] bg-[#078C7D]"
            : inProgress
              ? "border-[#2868B2] bg-[#E8F1FB]"
              : "border-[#CBD5DC] bg-white"
        }`}
      >
        {completed ? (
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        ) : inProgress ? (
          <View className="h-2.5 w-2.5 rounded-full bg-[#2868B2]" />
        ) : (
          <View className="h-2.5 w-2.5 rounded-full bg-[#CBD5DC]" />
        )}
      </View>

      <View className="ml-3 flex-1">
        <Text
          className={`text-sm font-semibold ${
            completed ? "text-[#71808E]" : "text-[#14375F]"
          }`}
        >
          {task.title}
        </Text>

        <View className="mt-1.5 flex-row items-center">
          <Ionicons name="person-outline" size={13} color="#94A3B8" />

          <Text className="ml-1 text-xs text-[#71808E]">{task.assignee}</Text>

          {task.dueDate ? (
            <>
              <View className="mx-2 h-1 w-1 rounded-full bg-[#CBD5DC]" />

              <Text
                className={`text-xs font-medium ${
                  inProgress ? "text-[#2868B2]" : "text-[#71808E]"
                }`}
              >
                {task.dueDate}
              </Text>
            </>
          ) : null}
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
    </View>
  );
}

type EvidenceTileProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  backgroundColor: string;
};

function EvidenceTile({ icon, label, backgroundColor }: EvidenceTileProps) {
  return (
    <View
      className="h-28 w-[31%] items-center justify-center rounded-xl"
      style={{ backgroundColor }}
    >
      <Ionicons name={icon} size={25} color="#536779" />

      <Text className="mt-2 text-center text-[10px] font-medium text-[#536779]">
        {label}
      </Text>
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

export default function StageDetailScreen() {
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
            Stage detail
          </Text>

          <Text className="mt-0.5 text-xs text-[#71808E]">
            Oakwood House Extension
          </Text>
        </View>

        <Pressable
          onPress={() => router.push("/more")}
          className="h-11 w-11 items-center justify-center rounded-full active:opacity-60"
        >
          <Ionicons name="ellipsis-horizontal" size={23} color="#14375F" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
      >
        <View className="px-6 pt-5">
          {/* Stage summary */}
          <View className="overflow-hidden rounded-2xl bg-[#14375F]">
            <View className="p-5">
              <View className="flex-row items-start">
                <View className="h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                  <Ionicons
                    name="construct-outline"
                    size={27}
                    color="#63D5C7"
                  />
                </View>

                <View className="ml-3 flex-1">
                  <View className="flex-row items-start">
                    <View className="flex-1">
                      <Text className="text-xl font-bold text-white">Roof</Text>

                      <Text className="mt-1 text-xs text-[#C9D6E1]">
                        Stage 4 of 8
                      </Text>
                    </View>

                    <View className="rounded-full bg-[#E8F1FB] px-2.5 py-1.5">
                      <Text className="text-xs font-semibold text-[#2868B2]">
                        In progress
                      </Text>
                    </View>
                  </View>

                  <View className="mt-3 flex-row items-center">
                    <Ionicons
                      name="calendar-outline"
                      size={14}
                      color="#C9D6E1"
                    />

                    <Text className="ml-1.5 text-xs text-[#C9D6E1]">
                      12 Aug – 30 Aug 2026
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mt-6 flex-row items-end justify-between">
                <View>
                  <Text className="text-xs text-[#C9D6E1]">Stage progress</Text>

                  <Text className="mt-1 text-3xl font-bold text-white">
                    60%
                  </Text>
                </View>

                <View className="items-end">
                  <Text className="text-xs text-[#C9D6E1]">Time remaining</Text>

                  <Text className="mt-1 text-base font-bold text-white">
                    12 days
                  </Text>
                </View>
              </View>

              <View className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                <View className="h-full w-[60%] rounded-full bg-[#48C8B8]" />
              </View>
            </View>

            <View className="flex-row border-t border-white/10">
              <View className="flex-1 items-center py-4">
                <Text className="text-xs text-[#C9D6E1]">Tasks complete</Text>

                <Text className="mt-1 text-sm font-bold text-white">
                  3 of 5
                </Text>
              </View>

              <View className="w-px bg-white/10" />

              <View className="flex-1 items-center py-4">
                <Text className="text-xs text-[#C9D6E1]">Updates</Text>

                <Text className="mt-1 text-sm font-bold text-white">4</Text>
              </View>

              <View className="w-px bg-white/10" />

              <View className="flex-1 items-center py-4">
                <Text className="text-xs text-[#C9D6E1]">Documents</Text>

                <Text className="mt-1 text-sm font-bold text-white">2</Text>
              </View>
            </View>
          </View>

          {/* Stage navigation */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 18,
              paddingBottom: 20,
            }}
          >
            <View className="mr-2 rounded-full bg-[#078C7D] px-5 py-2.5">
              <Text className="text-sm font-semibold text-white">Overview</Text>
            </View>

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
              className="mr-2 rounded-full border border-[#DDE5EA] bg-white px-5 py-2.5 active:opacity-60"
            >
              <Text className="text-sm font-medium text-[#687987]">Tasks</Text>
            </Pressable>

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
              <Text className="text-sm font-medium text-[#687987]">
                Updates
              </Text>
            </Pressable>

            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/projects/[projectId]/[module]",
                  params: {
                    projectId: "oakwood-house-extension",
                    module: "documents",
                  },
                })
              }
              className="rounded-full border border-[#DDE5EA] bg-white px-5 py-2.5 active:opacity-60"
            >
              <Text className="text-sm font-medium text-[#687987]">
                Documents
              </Text>
            </Pressable>
          </ScrollView>

          {/* Stage description */}
          <View className="rounded-2xl border border-[#E1E7EA] bg-white p-4">
            <View className="flex-row items-center">
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#EDF8F6]">
                <Ionicons
                  name="information-circle-outline"
                  size={21}
                  color="#178F87"
                />
              </View>

              <Text className="ml-3 text-base font-bold text-[#14375F]">
                About this stage
              </Text>
            </View>

            <Text className="mt-4 text-sm leading-6 text-[#687987]">
              Complete the roof structure, install waterproofing, insulation,
              battens, and roof tiles. The stage ends after inspection and
              approval by the site manager.
            </Text>

            <View className="mt-4 rounded-xl bg-[#F4F7F8] p-4">
              <Text className="text-xs font-semibold uppercase tracking-wide text-[#71808E]">
                Completion requirement
              </Text>

              <Text className="mt-2 text-sm font-medium leading-5 text-[#14375F]">
                Roof installation complete, watertight, photographed, and
                inspected.
              </Text>
            </View>
          </View>

          {/* Progress evidence */}
          <View className="mb-4 mt-8 flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-bold text-[#14375F]">
                Progress evidence
              </Text>

              <Text className="mt-1 text-xs text-[#71808E]">
                Photos shared with the client
              </Text>
            </View>

            <Text
              onPress={() =>
                router.push({
                  pathname: "/projects/[projectId]/[module]",
                  params: {
                    projectId: "oakwood-house-extension",
                    module: "updates",
                  },
                })
              }
              className="text-sm font-semibold text-[#178F87]"
            >
              See all
            </Text>
          </View>

          <View className="flex-row justify-between">
            <EvidenceTile
              icon="home-outline"
              label="Roof structure"
              backgroundColor="#E6EFED"
            />

            <EvidenceTile
              icon="layers-outline"
              label="Membrane"
              backgroundColor="#E8F1FB"
            />

            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/projects/[projectId]/[module]/new",
                  params: {
                    projectId: "oakwood-house-extension",
                    module: "updates",
                  },
                })
              }
              className="h-28 w-[31%] items-center justify-center rounded-xl border border-dashed border-[#8FCBC4] bg-[#EDF8F6] active:opacity-70"
            >
              <Ionicons name="camera-outline" size={24} color="#178F87" />

              <Text className="mt-2 text-xs font-semibold text-[#178F87]">
                Add photo
              </Text>
            </Pressable>
          </View>

          {/* Tasks */}
          <View className="mb-4 mt-8 flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-bold text-[#14375F]">
                Stage tasks
              </Text>

              <Text className="mt-1 text-xs text-[#71808E]">
                3 of 5 tasks completed
              </Text>
            </View>

            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/projects/[projectId]/[module]/new",
                  params: {
                    projectId: "oakwood-house-extension",
                    module: "tasks",
                  },
                })
              }
              className="flex-row items-center active:opacity-60"
            >
              <Ionicons name="add" size={17} color="#178F87" />

              <Text className="ml-1 text-sm font-semibold text-[#178F87]">
                Add task
              </Text>
            </Pressable>
          </View>

          <View className="rounded-2xl border border-[#E1E7EA] bg-white px-4">
            {STAGE_TASKS.map((task, index) => (
              <View key={task.id}>
                <StageTaskRow task={task} />

                {index < STAGE_TASKS.length - 1 ? (
                  <View className="h-px bg-[#EDF1F3]" />
                ) : null}
              </View>
            ))}
          </View>

          {/* Stage notes */}
          <View className="mb-4 mt-8 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-[#14375F]">
              Stage notes
            </Text>

            <Text
              onPress={() =>
                router.push({
                  pathname: "/projects/[projectId]/[module]/new",
                  params: {
                    projectId: "oakwood-house-extension",
                    module: "updates",
                  },
                })
              }
              className="text-sm font-semibold text-[#178F87]"
            >
              Edit
            </Text>
          </View>

          <View className="rounded-2xl border border-[#E1E7EA] bg-white p-4">
            <View className="flex-row items-start">
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#178F87"
              />

              <Text className="ml-3 flex-1 text-sm leading-6 text-[#687987]">
                Roof tiles are scheduled for delivery on 21 August. The
                building-control inspection is booked for 30 August.
              </Text>
            </View>

            <View className="mt-4 flex-row items-center border-t border-[#EDF1F3] pt-3">
              <View className="h-7 w-7 items-center justify-center rounded-full bg-[#14375F]">
                <Text className="text-[10px] font-bold text-white">AB</Text>
              </View>

              <Text className="ml-2 text-xs text-[#71808E]">
                Updated by Alex Builder · Today
              </Text>
            </View>
          </View>

          {/* Documents */}
          <View className="mb-4 mt-8 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-[#14375F]">Documents</Text>

            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/projects/[projectId]/[module]/new",
                  params: {
                    projectId: "oakwood-house-extension",
                    module: "documents",
                  },
                })
              }
              className="flex-row items-center active:opacity-60"
            >
              <Ionicons name="cloud-upload-outline" size={17} color="#178F87" />

              <Text className="ml-1 text-sm font-semibold text-[#178F87]">
                Upload
              </Text>
            </Pressable>
          </View>

          <View className="overflow-hidden rounded-2xl border border-[#E1E7EA] bg-white">
            <View className="flex-row items-center p-4">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#FDECE9]">
                <Ionicons
                  name="document-text-outline"
                  size={21}
                  color="#B33B32"
                />
              </View>

              <View className="ml-3 flex-1">
                <Text className="text-sm font-bold text-[#14375F]">
                  Roof Plan.pdf
                </Text>

                <Text className="mt-1 text-xs text-[#71808E]">
                  PDF · 2.4 MB
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </View>

            <View className="h-px bg-[#EDF1F3]" />

            <View className="flex-row items-center p-4">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#E8F1FB]">
                <Ionicons
                  name="shield-checkmark-outline"
                  size={21}
                  color="#2868B2"
                />
              </View>

              <View className="ml-3 flex-1">
                <Text className="text-sm font-bold text-[#14375F]">
                  Roof Specification.pdf
                </Text>

                <Text className="mt-1 text-xs text-[#71808E]">
                  PDF · 1.8 MB
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </View>
          </View>

          {/* Primary actions */}
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/projects/[projectId]/[module]/new",
                params: {
                  projectId: "oakwood-house-extension",
                  module: "updates",
                },
              })
            }
            className="mt-8 h-14 flex-row items-center justify-center rounded-xl bg-[#078C7D] active:opacity-80"
          >
            <Ionicons name="camera-outline" size={19} color="#FFFFFF" />

            <Text className="ml-2 text-base font-bold text-white">
              Log progress update
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert(
                "Complete this stage?",
                "This prototype will mark Roof as complete locally.",
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "Mark complete" },
                ],
              )
            }
            className="mt-3 h-14 flex-row items-center justify-center rounded-xl border border-[#078C7D] bg-white active:bg-[#EDF8F6]"
          >
            <Ionicons name="checkmark-done-outline" size={19} color="#078C7D" />

            <Text className="ml-2 text-base font-bold text-[#078C7D]">
              Mark stage complete
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
