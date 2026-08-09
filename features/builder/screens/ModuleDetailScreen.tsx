import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrototypeBottomNav } from "@/components/prototype-bottom-nav";
import { isModuleKey, MODULE_CONFIGS, Tone } from "@/data/prototype-modules";
import { usePrototypeStore } from "@/state/prototype-store";

const TONES: Record<Tone, { background: string; foreground: string }> = {
  teal: { background: "#E1F5F1", foreground: "#087F72" }, blue: { background: "#E8F1FB", foreground: "#2868B2" }, amber: { background: "#FFF4DF", foreground: "#B86B00" }, red: { background: "#FDECE9", foreground: "#B33B32" }, purple: { background: "#F0EBFA", foreground: "#7857B8" }, grey: { background: "#F1F4F6", foreground: "#687987" },
};

const ACTIONS: Partial<Record<string, { label: string; status: string; tone: Tone; icon: keyof typeof Ionicons.glyphMap }>> = {
  decisions: { label: "Mark as answered", status: "Answered", tone: "teal", icon: "checkmark-circle-outline" },
  payments: { label: "Record payment", status: "Paid", tone: "teal", icon: "card-outline" },
  variations: { label: "Mark approved", status: "Approved", tone: "teal", icon: "checkmark-done-outline" },
  tasks: { label: "Mark complete", status: "Completed", tone: "teal", icon: "checkbox-outline" },
  snagging: { label: "Resolve snag", status: "Resolved", tone: "teal", icon: "hammer-outline" },
  handover: { label: "Mark complete", status: "Complete", tone: "teal", icon: "checkmark-circle-outline" },
  aftercare: { label: "Resolve issue", status: "Resolved", tone: "teal", icon: "shield-checkmark-outline" },
  updates: { label: "Publish update", status: "Published", tone: "teal", icon: "paper-plane-outline" },
  documents: { label: "Share with client", status: "Shared", tone: "teal", icon: "share-outline" },
};

export default function ModuleDetailScreen() {
  const { module, itemId } = useLocalSearchParams<{ projectId: string; module: string; itemId: string }>();
  const { items, updateItemStatus } = usePrototypeStore();
  if (!isModuleKey(module)) return null;
  const config = MODULE_CONFIGS[module];
  const item = items[module].find((candidate) => candidate.id === itemId) ?? items[module][0];
  const tone = TONES[item.tone];
  const action = ACTIONS[module];

  const runAction = () => {
    if (!action) {
      Alert.alert("Prototype action", `${config.singular} action completed locally.`);
      return;
    }
    updateItemStatus(module, item.id, action.status, action.tone);
    Alert.alert("Updated", `${item.title} is now ${action.status.toLowerCase()}.`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FBFC]" edges={["top", "bottom"]}>
      <View className="flex-row items-center border-b border-[#E1E7EA] bg-white px-5 py-3"><Pressable onPress={() => router.back()} className="h-11 w-11 items-center justify-center rounded-full border border-[#DDE5EA] active:opacity-60"><Ionicons name="chevron-back" size={22} color="#14375F" /></Pressable><View className="flex-1 items-center px-3"><Text className="text-base font-bold text-[#14375F]">{config.singular} detail</Text><Text className="mt-0.5 text-xs text-[#71808E]">Oakwood House Extension</Text></View><Pressable onPress={() => Alert.alert("More options", "Edit, duplicate, archive, and sharing controls will appear here.")} className="h-11 w-11 items-center justify-center"><Ionicons name="ellipsis-horizontal" size={23} color="#14375F" /></Pressable></View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 32 }}>
        <View className="rounded-3xl bg-[#14375F] p-5"><View className="flex-row items-start"><View className="h-14 w-14 items-center justify-center rounded-2xl bg-white/10"><Ionicons name={config.icon} size={28} color="#63D5C7" /></View><View className="ml-3 flex-1"><Text className="text-xl font-bold text-white">{item.title}</Text><Text className="mt-1 text-sm text-[#C9D6E1]">{item.subtitle}</Text></View><View className="rounded-full px-2.5 py-1.5" style={{ backgroundColor: tone.background }}><Text className="text-xs font-semibold" style={{ color: tone.foreground }}>{item.status}</Text></View></View>{item.amount ? <Text className="mt-6 text-3xl font-bold text-white">{item.amount}</Text> : null}<View className="mt-5 flex-row items-center border-t border-white/10 pt-4"><Ionicons name="calendar-outline" size={15} color="#C9D6E1" /><Text className="ml-2 text-xs text-[#C9D6E1]">{item.meta}</Text></View></View>

        <View className="mt-5 rounded-2xl border border-[#E1E7EA] bg-white p-4"><View className="flex-row items-center"><View className="h-10 w-10 items-center justify-center rounded-xl bg-[#EDF8F6]"><Ionicons name="information-circle-outline" size={21} color="#078C7D" /></View><Text className="ml-3 text-base font-bold text-[#14375F]">Details</Text></View><Text className="mt-4 text-sm leading-6 text-[#687987]">{item.description}</Text></View>

        <Text className="mb-4 mt-7 text-lg font-bold text-[#14375F]">Evidence and attachments</Text>
        <View className="flex-row gap-3">{["Photos", "Documents", "Notes"].map((label, index) => <Pressable key={label} onPress={() => Alert.alert(label, `${label} viewer is active in the local prototype.`)} className="flex-1 items-center rounded-2xl border border-[#E1E7EA] bg-white py-5 active:bg-[#EDF8F6]"><Ionicons name={index === 0 ? "images-outline" : index === 1 ? "document-text-outline" : "reader-outline"} size={23} color="#078C7D" /><Text className="mt-2 text-xs font-semibold text-[#14375F]">{label}</Text><Text className="mt-1 text-xs text-[#71808E]">{index + 2}</Text></Pressable>)}</View>

        <Text className="mb-4 mt-7 text-lg font-bold text-[#14375F]">Activity</Text>
        <View className="rounded-2xl border border-[#E1E7EA] bg-white px-4"><View className="flex-row py-4"><View className="h-9 w-9 items-center justify-center rounded-full bg-[#DDF2EF]"><Ionicons name="create-outline" size={18} color="#078C7D" /></View><View className="ml-3 flex-1"><Text className="text-sm font-semibold text-[#14375F]">Updated by Alex Builder</Text><Text className="mt-1 text-xs text-[#71808E]">Today at 10:30</Text></View></View><View className="h-px bg-[#EDF1F3]" /><View className="flex-row py-4"><View className="h-9 w-9 items-center justify-center rounded-full bg-[#E8F1FB]"><Ionicons name="eye-outline" size={18} color="#2868B2" /></View><View className="ml-3 flex-1"><Text className="text-sm font-semibold text-[#14375F]">Shared with project members</Text><Text className="mt-1 text-xs text-[#71808E]">Client visibility enabled</Text></View></View></View>

        <Pressable onPress={runAction} className="mt-8 h-14 flex-row items-center justify-center rounded-xl bg-[#078C7D] active:opacity-80"><Ionicons name={action?.icon ?? "checkmark-outline"} size={20} color="white" /><Text className="ml-2 text-base font-bold text-white">{action?.label ?? "Complete action"}</Text></Pressable>
        <Pressable onPress={() => Alert.alert("Edit", `Editing ${item.title} is available in this prototype flow.`)} className="mt-3 h-14 flex-row items-center justify-center rounded-xl border border-[#078C7D] bg-white active:bg-[#EDF8F6]"><Ionicons name="create-outline" size={19} color="#078C7D" /><Text className="ml-2 text-base font-bold text-[#078C7D]">Edit {config.singular.toLowerCase()}</Text></Pressable>
      </ScrollView>
      <PrototypeBottomNav />
    </SafeAreaView>
  );
}
