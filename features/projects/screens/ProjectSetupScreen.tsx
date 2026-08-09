import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STAGES = [
  "Pre-construction",
  "Foundations",
  "Structure",
  "Roof",
  "First fix",
  "Plastering",
  "Second fix",
  "Handover",
];

export default function ProjectSetupScreen() {
  const { mode = "manual-stage-builder" } = useLocalSearchParams<{
    mode: string;
  }>();
  const [stages, setStages] = useState(STAGES);
  const [scanned, setScanned] = useState(mode !== "ai-document-scan");
  const ai = mode === "ai-document-scan";
  const edit = mode === "edit-timeline";
  const title = ai
    ? "AI stage extraction"
    : edit
      ? "Edit project timeline"
      : "Create stages manually";
  const move = (index: number, direction: number) => {
    const target = index + direction;
    if (target < 0 || target >= stages.length) return;
    setStages((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };
  return (
    <SafeAreaView className="flex-1 bg-[#F8FBFC]" edges={["top", "bottom"]}>
      <View className="flex-row items-center border-b border-[#E1E7EA] bg-white px-5 py-3">
        <Pressable
          onPress={() => router.back()}
          className="h-11 w-11 items-center justify-center rounded-full border border-[#DDE5EA]"
        >
          <Ionicons name="chevron-back" size={22} color="#14375F" />
        </Pressable>
        <View className="flex-1 items-center">
          <Text className="text-base font-bold text-[#14375F]">{title}</Text>
          <Text className="mt-0.5 text-xs text-[#71808E]">
            Oakwood House Extension
          </Text>
        </View>
        <Text
          onPress={() => Alert.alert("Draft saved")}
          className="w-11 text-right text-sm font-semibold text-[#078C7D]"
        >
          Save
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        {ai && !scanned ? (
          <>
            <View className="items-center rounded-3xl border border-[#CDE7E3] bg-[#EDF8F6] p-7">
              <View className="h-20 w-20 items-center justify-center rounded-full bg-[#D8F0EC]">
                <Ionicons name="sparkles-outline" size={36} color="#078C7D" />
              </View>
              <Text className="mt-5 text-xl font-bold text-[#14375F]">
                Add a project document
              </Text>
              <Text className="mt-2 text-center text-sm leading-6 text-[#687987]">
                Upload a quote, estimate, or scope. The prototype will simulate
                extracting a complete stage plan.
              </Text>
              <Pressable
                onPress={() => {
                  setScanned(true);
                  Alert.alert(
                    "Scan complete",
                    "Eight stages were extracted and are ready to review.",
                  );
                }}
                className="mt-6 h-14 w-full flex-row items-center justify-center rounded-xl bg-[#078C7D]"
              >
                <Ionicons name="cloud-upload-outline" size={20} color="white" />
                <Text className="ml-2 text-base font-bold text-white">
                  Choose document
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <View className="flex-row items-center rounded-2xl border border-[#CDE7E3] bg-[#EDF8F6] p-4">
              <Ionicons
                name={ai ? "sparkles-outline" : "git-branch-outline"}
                size={23}
                color="#078C7D"
              />
              <View className="ml-3 flex-1">
                <Text className="text-sm font-bold text-[#14375F]">
                  {ai
                    ? "8 stages extracted"
                    : `${stages.length} project stages`}
                </Text>
                <Text className="mt-1 text-xs text-[#71808E]">
                  Review, reorder, rename, or add stages before confirming.
                </Text>
              </View>
            </View>
            <Text className="mb-4 mt-7 text-lg font-bold text-[#14375F]">
              Project stages
            </Text>
            {stages.map((stage, index) => (
              <View
                key={`${stage}-${index}`}
                className="mb-3 flex-row items-center rounded-2xl border border-[#E1E7EA] bg-white p-4"
              >
                <View
                  className={`h-10 w-10 items-center justify-center rounded-full ${stage === "Roof" ? "bg-[#E8F1FB]" : "bg-[#DDF2EF]"}`}
                >
                  <Text
                    className={`text-sm font-bold ${stage === "Roof" ? "text-[#2868B2]" : "text-[#078C7D]"}`}
                  >
                    {index + 1}
                  </Text>
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-sm font-bold text-[#14375F]">
                    {stage}
                  </Text>
                  <Text className="mt-1 text-xs text-[#71808E]">
                    Estimated {index < 3 ? 3 : 2} weeks
                  </Text>
                </View>
                <Pressable
                  onPress={() => move(index, -1)}
                  className="h-9 w-9 items-center justify-center"
                >
                  <Ionicons name="chevron-up" size={18} color="#71808E" />
                </Pressable>
                <Pressable
                  onPress={() => move(index, 1)}
                  className="h-9 w-9 items-center justify-center"
                >
                  <Ionicons name="chevron-down" size={18} color="#71808E" />
                </Pressable>
              </View>
            ))}
            <Pressable
              onPress={() =>
                setStages((current) => [
                  ...current,
                  `New stage ${current.length + 1}`,
                ])
              }
              className="h-14 flex-row items-center justify-center rounded-xl border border-dashed border-[#8FCBC4] bg-[#EDF8F6]"
            >
              <Ionicons name="add" size={20} color="#078C7D" />
              <Text className="ml-2 text-sm font-semibold text-[#078C7D]">
                Add another stage
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                Alert.alert(
                  "Stages confirmed",
                  "The updated stage plan is now active in this prototype.",
                  [
                    {
                      text: "View timeline",
                      onPress: () =>
                        router.replace({
                          pathname: "/projects/[projectId]/timeline",
                          params: { projectId: "oakwood-house-extension" },
                        }),
                    },
                  ],
                )
              }
              className="mt-7 h-14 flex-row items-center justify-center rounded-xl bg-[#078C7D]"
            >
              <Ionicons name="checkmark" size={20} color="white" />
              <Text className="ml-2 text-base font-bold text-white">
                Confirm stages
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
