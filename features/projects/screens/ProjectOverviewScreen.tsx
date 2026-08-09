import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type QuickActionProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  backgroundColor: string;
};

function QuickAction({
  label,
  icon,
  iconColor,
  backgroundColor,
}: QuickActionProps) {
  const module = label.includes("payment")
    ? "payments"
    : label.includes("variation")
      ? "variations"
      : label.includes("decision")
        ? "decisions"
        : "updates";
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/projects/[projectId]/[module]/new",
          params: { projectId: "oakwood-house-extension", module },
        })
      }
      className="w-[48%] flex-row items-center rounded-xl border border-[#E1E7EA] bg-white p-3 active:bg-[#F4F7F8]"
    >
      <View
        className="h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor }}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>

      <Text className="ml-3 flex-1 text-sm font-semibold text-[#14375F]">
        {label}
      </Text>

      <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
    </Pressable>
  );
}

type AttentionItemProps = {
  title: string;
  description: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  backgroundColor: string;
};

function AttentionItem({
  title,
  description,
  label,
  icon,
  color,
  backgroundColor,
}: AttentionItemProps) {
  const module = title.toLowerCase().includes("payment")
    ? "payments"
    : "decisions";
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/projects/[projectId]/[module]",
          params: { projectId: "oakwood-house-extension", module },
        })
      }
      className="flex-row items-start py-4 active:opacity-60"
    >
      <View
        className="h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor }}
      >
        <Ionicons name={icon} size={20} color={color} />
      </View>

      <View className="ml-3 flex-1">
        <Text className="text-sm font-bold text-[#14375F]">{title}</Text>

        <Text className="mt-1 text-xs leading-5 text-[#71808E]">
          {description}
        </Text>

        <Text className="mt-2 text-xs font-semibold" style={{ color }}>
          {label}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
    </Pressable>
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

export default function ProjectOverviewScreen() {
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
            Project overview
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
        {/* Project section tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 16,
          }}
        >
          <View className="mr-2 rounded-full bg-[#078C7D] px-5 py-2.5">
            <Text className="text-sm font-semibold text-white">Overview</Text>
          </View>

          <Pressable
            onPress={() =>
              router.push({
                pathname: "/projects/[projectId]/timeline",
                params: { projectId: "oakwood-house-extension" },
              })
            }
            className="mr-2 rounded-full border border-[#DDE5EA] bg-white px-5 py-2.5 active:opacity-60"
          >
            <Text className="text-sm font-medium text-[#687987]">Timeline</Text>
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
          {/* Project summary */}
          <View className="overflow-hidden rounded-2xl bg-[#14375F]">
            <View className="p-5">
              <View className="flex-row items-start">
                <View className="h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                  <Ionicons name="home-outline" size={27} color="#63D5C7" />
                </View>

                <View className="ml-3 flex-1">
                  <View className="flex-row items-start">
                    <Text className="mr-2 flex-1 text-lg font-bold leading-6 text-white">
                      Oakwood House Extension
                    </Text>

                    <View className="rounded-full bg-[#DDF2EF] px-2.5 py-1.5">
                      <Text className="text-xs font-semibold text-[#087F72]">
                        On track
                      </Text>
                    </View>
                  </View>

                  <View className="mt-2 flex-row items-center">
                    <Ionicons
                      name="location-outline"
                      size={14}
                      color="#C9D6E1"
                    />

                    <Text className="ml-1 text-xs text-[#C9D6E1]">
                      12 Oakridge Drive, London
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mt-6 flex-row items-end justify-between">
                <View>
                  <Text className="text-xs text-[#C9D6E1]">
                    Overall progress
                  </Text>

                  <Text className="mt-1 text-3xl font-bold text-white">
                    68%
                  </Text>
                </View>

                <Text className="text-xs font-medium text-[#63D5C7]">
                  Last updated today
                </Text>
              </View>

              <View className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                <View className="h-full w-[68%] rounded-full bg-[#48C8B8]" />
              </View>
            </View>

            <View className="flex-row border-t border-white/10">
              <View className="flex-1 items-center py-4">
                <Text className="text-xs text-[#C9D6E1]">Current stage</Text>

                <Text className="mt-1 text-sm font-bold text-white">Roof</Text>
              </View>

              <View className="w-px bg-white/10" />

              <View className="flex-1 items-center py-4">
                <Text className="text-xs text-[#C9D6E1]">Time remaining</Text>

                <Text className="mt-1 text-sm font-bold text-white">
                  11 weeks
                </Text>
              </View>

              <View className="w-px bg-white/10" />

              <View className="flex-1 items-center py-4">
                <Text className="text-xs text-[#C9D6E1]">Client</Text>

                <Text className="mt-1 text-sm font-bold text-white">
                  S. Mitchell
                </Text>
              </View>
            </View>
          </View>

          {/* Quick actions */}
          <View className="mb-4 mt-7 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-[#14375F]">
              Quick actions
            </Text>

            <Text
              onPress={() => router.push("/more")}
              className="text-sm font-semibold text-[#178F87]"
            >
              View all
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between gap-y-3">
            <QuickAction
              label="Add update"
              icon="camera-outline"
              iconColor="#178F87"
              backgroundColor="#DDF2EF"
            />

            <QuickAction
              label="Request payment"
              icon="card-outline"
              iconColor="#2868B2"
              backgroundColor="#E8F1FB"
            />

            <QuickAction
              label="New variation"
              icon="git-compare-outline"
              iconColor="#7857B8"
              backgroundColor="#F0EBFA"
            />

            <QuickAction
              label="Request decision"
              icon="checkmark-done-outline"
              iconColor="#B86B00"
              backgroundColor="#FFF4DF"
            />
          </View>

          {/* Attention required */}
          <View className="mb-4 mt-8 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-lg font-bold text-[#14375F]">
                Attention required
              </Text>

              <View className="ml-2 h-6 min-w-6 items-center justify-center rounded-full bg-[#D84A3D] px-1.5">
                <Text className="text-xs font-bold text-white">2</Text>
              </View>
            </View>

            <Text
              onPress={() => router.push("/notifications")}
              className="text-sm font-semibold text-[#178F87]"
            >
              View all
            </Text>
          </View>

          <View className="rounded-2xl border border-[#E1E7EA] bg-white px-4">
            <AttentionItem
              title="Kitchen worktop decision"
              description="The client needs to select their preferred option."
              label="Due in 2 days"
              icon="help-circle-outline"
              color="#B86B00"
              backgroundColor="#FFF4DF"
            />

            <View className="h-px bg-[#EDF1F3]" />

            <AttentionItem
              title="Roof stage payment"
              description="Payment request has been viewed but remains unpaid."
              label="£31,000 · Due today"
              icon="card-outline"
              color="#B33B32"
              backgroundColor="#FDECE9"
            />
          </View>

          {/* Current stage */}
          <View className="mb-4 mt-8 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-[#14375F]">
              Current stage
            </Text>

            <Text
              onPress={() =>
                router.push({
                  pathname: "/projects/[projectId]/timeline",
                  params: { projectId: "oakwood-house-extension" },
                })
              }
              className="text-sm font-semibold text-[#178F87]"
            >
              View timeline
            </Text>
          </View>

          <View className="rounded-2xl border border-[#CDE7E3] bg-white p-4">
            <View className="flex-row items-start">
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-[#DDF2EF]">
                <Ionicons name="construct-outline" size={23} color="#178F87" />
              </View>

              <View className="ml-3 flex-1">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-base font-bold text-[#14375F]">
                      Roof
                    </Text>

                    <Text className="mt-1 text-xs text-[#71808E]">
                      12 Aug – 30 Aug 2026
                    </Text>
                  </View>

                  <View className="rounded-full bg-[#E1F5F1] px-2.5 py-1.5">
                    <Text className="text-xs font-semibold text-[#087F72]">
                      In progress
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="mt-5 flex-row items-center justify-between">
              <Text className="text-xs font-medium text-[#71808E]">
                Stage progress
              </Text>

              <Text className="text-sm font-bold text-[#078C7D]">60%</Text>
            </View>

            <View className="mt-2 h-2 overflow-hidden rounded-full bg-[#E6ECEF]">
              <View className="h-full w-[60%] rounded-full bg-[#078C7D]" />
            </View>

            <View className="mt-5 rounded-xl bg-[#F4F7F8] p-4">
              <View className="mb-3 flex-row items-center">
                <Ionicons name="checkmark-circle" size={18} color="#178F87" />

                <Text className="ml-2 text-sm text-[#536779]">
                  Roof structure completed
                </Text>
              </View>

              <View className="mb-3 flex-row items-center">
                <Ionicons name="checkmark-circle" size={18} color="#178F87" />

                <Text className="ml-2 text-sm text-[#536779]">
                  Waterproof membrane installed
                </Text>
              </View>

              <View className="flex-row items-center">
                <Ionicons name="ellipse-outline" size={18} color="#94A3B8" />

                <Text className="ml-2 text-sm text-[#71808E]">
                  Roof tiles in progress
                </Text>
              </View>
            </View>

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
              className="mt-4 h-12 flex-row items-center justify-center rounded-xl bg-[#078C7D] active:opacity-80"
            >
              <Ionicons name="camera-outline" size={18} color="#FFFFFF" />

              <Text className="ml-2 text-sm font-bold text-white">
                Log stage update
              </Text>
            </Pressable>
          </View>

          {/* Latest update */}
          <View className="mb-4 mt-8 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-[#14375F]">
              Latest update
            </Text>

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
              View updates
            </Text>
          </View>

          <View className="overflow-hidden rounded-2xl border border-[#E1E7EA] bg-white">
            <View className="h-40 items-center justify-center bg-[#E6EFED]">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-white/80">
                <Ionicons name="images-outline" size={29} color="#178F87" />
              </View>

              <Text className="mt-3 text-xs font-medium text-[#536779]">
                6 progress photos
              </Text>
            </View>

            <View className="p-4">
              <View className="flex-row items-center">
                <View className="rounded-full bg-[#DDF2EF] px-2.5 py-1.5">
                  <Text className="text-xs font-semibold text-[#087F72]">
                    Roof
                  </Text>
                </View>

                <Text className="ml-auto text-xs text-[#94A3B8]">
                  Today · 10:30
                </Text>
              </View>

              <Text className="mt-3 text-base font-bold text-[#14375F]">
                Roof tile installation in progress
              </Text>

              <Text className="mt-2 text-sm leading-6 text-[#687987]">
                The waterproof membrane is complete and roof tiles are now being
                installed. Work remains on schedule.
              </Text>

              <View className="mt-4 flex-row items-center">
                <View className="h-8 w-8 items-center justify-center rounded-full bg-[#14375F]">
                  <Text className="text-xs font-bold text-white">AB</Text>
                </View>

                <Text className="ml-2 text-xs font-medium text-[#536779]">
                  Alex Builder
                </Text>

                <View className="ml-auto flex-row items-center">
                  <Ionicons name="heart-outline" size={17} color="#71808E" />

                  <Text className="ml-1 text-xs text-[#71808E]">2</Text>

                  <Ionicons
                    name="chatbubble-outline"
                    size={16}
                    color="#71808E"
                    style={{ marginLeft: 14 }}
                  />

                  <Text className="ml-1 text-xs text-[#71808E]">1</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Financial overview */}
          <View className="mb-4 mt-8 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-[#14375F]">
              Financial overview
            </Text>

            <Text
              onPress={() =>
                router.push({
                  pathname: "/projects/[projectId]/[module]",
                  params: {
                    projectId: "oakwood-house-extension",
                    module: "payments",
                  },
                })
              }
              className="text-sm font-semibold text-[#178F87]"
            >
              View payments
            </Text>
          </View>

          <View className="rounded-2xl border border-[#E1E7EA] bg-white p-4">
            <View className="flex-row gap-3">
              <View className="flex-1 rounded-xl bg-[#E7F5F3] p-3">
                <Text className="text-xs text-[#536779]">Paid</Text>

                <Text className="mt-2 text-lg font-bold text-[#078C7D]">
                  £60,000
                </Text>
              </View>

              <View className="flex-1 rounded-xl bg-[#FFF4DF] p-3">
                <Text className="text-xs text-[#536779]">Due</Text>

                <Text className="mt-2 text-lg font-bold text-[#B86B00]">
                  £31,000
                </Text>
              </View>

              <View className="flex-1 rounded-xl bg-[#F1F4F6] p-3">
                <Text className="text-xs text-[#536779]">Remaining</Text>

                <Text className="mt-2 text-lg font-bold text-[#14375F]">
                  £53,000
                </Text>
              </View>
            </View>

            <View className="mt-5 flex-row items-center justify-between">
              <View>
                <Text className="text-xs text-[#71808E]">
                  Total project value
                </Text>

                <Text className="mt-1 text-base font-bold text-[#14375F]">
                  £144,000.00
                </Text>
              </View>

              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/projects/[projectId]/[module]/new",
                    params: {
                      projectId: "oakwood-house-extension",
                      module: "payments",
                    },
                  })
                }
                className="h-10 flex-row items-center rounded-xl bg-[#078C7D] px-4 active:opacity-80"
              >
                <Ionicons name="add" size={17} color="#FFFFFF" />

                <Text className="ml-1 text-sm font-semibold text-white">
                  Request
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Client */}
          <View className="mb-4 mt-8">
            <Text className="text-lg font-bold text-[#14375F]">Client</Text>
          </View>

          <View className="flex-row items-center rounded-2xl border border-[#E1E7EA] bg-white p-4">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-[#DDF2EF]">
              <Text className="text-sm font-bold text-[#178F87]">SM</Text>
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold text-[#14375F]">
                Sarah Mitchell
              </Text>

              <Text className="mt-1 text-xs text-[#71808E]">
                Main homeowner
              </Text>
            </View>

            <Pressable
              onPress={() =>
                Alert.alert(
                  "Call client",
                  "Calling Sarah Mitchell is simulated in this local prototype.",
                )
              }
              className="mr-2 h-10 w-10 items-center justify-center rounded-full bg-[#E8F1FB] active:opacity-60"
            >
              <Ionicons name="call-outline" size={19} color="#2868B2" />
            </Pressable>

            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/messages/[threadId]",
                  params: { threadId: "client", title: "Sarah Mitchell" },
                })
              }
              className="h-10 w-10 items-center justify-center rounded-full bg-[#DDF2EF] active:opacity-60"
            >
              <Ionicons name="chatbubble-outline" size={19} color="#178F87" />
            </Pressable>
          </View>
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
  /* When updating Log stage update - The builder should be able to set stage as Complete */
}
