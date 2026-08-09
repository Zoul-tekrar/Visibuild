import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { isModuleKey, MODULE_CONFIGS } from "@/data/prototype-modules";
import { usePrototypeStore } from "@/state/prototype-store";

export default function ModuleFormScreen() {
  const { module } = useLocalSearchParams<{ module: string }>();
  const { addItem } = usePrototypeStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientVisible, setClientVisible] = useState(true);
  if (!isModuleKey(module)) return null;
  const config = MODULE_CONFIGS[module];

  const save = () => {
    if (!title.trim()) {
      Alert.alert("Add a title", `Enter a title for this ${config.singular.toLowerCase()}.`);
      return;
    }
    addItem(module, title.trim(), description.trim() || `New ${config.singular.toLowerCase()} created in the local prototype.`);
    Alert.alert(`${config.singular} created`, "The new item has been added to the list for this session.", [{ text: "Done", onPress: () => router.back() }]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FBFC]" edges={["top", "bottom"]}>
      <View className="flex-row items-center border-b border-[#E1E7EA] bg-white px-5 py-3"><Pressable onPress={() => router.back()} className="h-11 w-11 items-center justify-center rounded-full border border-[#DDE5EA]"><Ionicons name="close" size={22} color="#14375F" /></Pressable><View className="flex-1 items-center px-3"><Text className="text-base font-bold text-[#14375F]">{config.action}</Text><Text className="mt-0.5 text-xs text-[#71808E]">Oakwood House Extension</Text></View><Text onPress={() => Alert.alert("Draft saved", "This item is saved locally as a draft.")} className="w-11 text-right text-sm font-semibold text-[#078C7D]">Save</Text></View>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <View className="flex-row items-center rounded-2xl border border-[#CDE7E3] bg-[#EDF8F6] p-4"><View className="h-11 w-11 items-center justify-center rounded-xl bg-[#D8F0EC]"><Ionicons name={config.icon} size={22} color="#078C7D" /></View><Text className="ml-3 flex-1 text-sm leading-5 text-[#536779]">Create a clear {config.singular.toLowerCase()} that your team and client can understand.</Text></View>
        <Text className="mb-2 mt-7 text-sm font-semibold text-[#14375F]">Title</Text><View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4"><Ionicons name="create-outline" size={20} color="#71808E" /><TextInput value={title} onChangeText={setTitle} placeholder={`${config.singular} title`} placeholderTextColor="#94A3B8" className="ml-3 flex-1 text-base text-[#14375F]" /></View>
        <Text className="mb-2 mt-5 text-sm font-semibold text-[#14375F]">Description</Text><View className="min-h-36 rounded-xl border border-[#DDE5EA] bg-white p-4"><TextInput value={description} onChangeText={setDescription} placeholder="Add the important details, requirements, and next steps..." placeholderTextColor="#94A3B8" multiline textAlignVertical="top" className="min-h-28 text-base leading-6 text-[#14375F]" /></View>
        <Text className="mb-2 mt-5 text-sm font-semibold text-[#14375F]">Due date</Text><Pressable onPress={() => Alert.alert("Date selected", "24 August 2026 is selected for the local prototype.")} className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4"><Ionicons name="calendar-outline" size={20} color="#71808E" /><Text className="ml-3 flex-1 text-base text-[#14375F]">24 Aug 2026</Text><Ionicons name="chevron-down" size={18} color="#71808E" /></Pressable>
        <Text className="mb-2 mt-5 text-sm font-semibold text-[#14375F]">Attachments</Text><Pressable onPress={() => Alert.alert("Attachment added", "A sample project attachment has been added locally.")} className="h-24 items-center justify-center rounded-xl border border-dashed border-[#8FCBC4] bg-[#EDF8F6]"><Ionicons name="cloud-upload-outline" size={24} color="#078C7D" /><Text className="mt-2 text-sm font-semibold text-[#078C7D]">Add photos or documents</Text></Pressable>
        <Pressable onPress={() => setClientVisible((value) => !value)} className="mt-6 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white p-4"><View className="h-10 w-10 items-center justify-center rounded-xl bg-[#E8F1FB]"><Ionicons name="eye-outline" size={20} color="#2868B2" /></View><View className="ml-3 flex-1"><Text className="text-sm font-bold text-[#14375F]">Visible to client</Text><Text className="mt-1 text-xs text-[#71808E]">Share this item in the client app</Text></View><View className={`h-7 w-12 justify-center rounded-full px-1 ${clientVisible ? "items-end bg-[#078C7D]" : "items-start bg-[#CBD5DC]"}`}><View className="h-5 w-5 rounded-full bg-white" /></View></Pressable>
        <Pressable onPress={save} className="mt-8 h-14 flex-row items-center justify-center rounded-xl bg-[#078C7D] active:opacity-80"><Ionicons name="checkmark" size={20} color="white" /><Text className="ml-2 text-base font-bold text-white">Create {config.singular.toLowerCase()}</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
