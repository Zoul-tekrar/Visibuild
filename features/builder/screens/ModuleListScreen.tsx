import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrototypeBottomNav } from "@/components/prototype-bottom-nav";
import { isModuleKey, MODULE_CONFIGS, Tone } from "@/data/prototype-modules";
import { usePrototypeStore } from "@/state/prototype-store";

const TONES: Record<Tone, { background: string; foreground: string }> = {
  teal: { background: "#E1F5F1", foreground: "#087F72" },
  blue: { background: "#E8F1FB", foreground: "#2868B2" },
  amber: { background: "#FFF4DF", foreground: "#B86B00" },
  red: { background: "#FDECE9", foreground: "#B33B32" },
  purple: { background: "#F0EBFA", foreground: "#7857B8" },
  grey: { background: "#F1F4F6", foreground: "#687987" },
};

export default function ModuleListScreen() {
  const { projectId = "oakwood-house-extension", module } = useLocalSearchParams<{ projectId: string; module: string }>();
  const { items } = usePrototypeStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  if (!isModuleKey(module)) return null;
  const config = MODULE_CONFIGS[module];
  const visibleItems = useMemo(() => items[module].filter((item) => {
    const matchesQuery = `${item.title} ${item.subtitle}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All" || item.status.toLowerCase().includes(filter.toLowerCase());
    return matchesQuery && matchesFilter;
  }), [filter, items, module, query]);

  return (
    <SafeAreaView className="flex-1 bg-[#F8FBFC]" edges={["top", "bottom"]}>
      <View className="flex-row items-center border-b border-[#E1E7EA] bg-white px-5 py-3">
        <Pressable onPress={() => router.back()} className="h-11 w-11 items-center justify-center rounded-full border border-[#DDE5EA] active:opacity-60">
          <Ionicons name="chevron-back" size={22} color="#14375F" />
        </Pressable>
        <View className="flex-1 items-center px-3">
          <Text className="text-base font-bold text-[#14375F]">{config.title}</Text>
          <Text className="mt-0.5 text-xs text-[#71808E]">Oakwood House Extension</Text>
        </View>
        <Pressable onPress={() => router.push({ pathname: "/projects/[projectId]/[module]/new", params: { projectId, module } })} className="h-11 w-11 items-center justify-center rounded-full bg-[#078C7D] active:opacity-80">
          <Ionicons name="add" size={23} color="white" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <View className="px-6 pt-6">
          <View className="flex-row items-start">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#E7F5F3]"><Ionicons name={config.icon} size={24} color="#078C7D" /></View>
            <Text className="ml-3 flex-1 text-sm leading-6 text-[#687987]">{config.description}</Text>
          </View>

          <View className="mt-6 flex-row gap-3">
            {config.stats.map((stat) => {
              const tone = TONES[stat.tone];
              return <View key={stat.label} className="flex-1 rounded-2xl p-3" style={{ backgroundColor: tone.background }}><Text className="text-xl font-bold" style={{ color: tone.foreground }}>{stat.value}</Text><Text className="mt-1 text-[11px] font-medium text-[#687987]">{stat.label}</Text></View>;
            })}
          </View>

          <View className="mt-6 h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
            <Ionicons name="search-outline" size={20} color="#71808E" />
            <TextInput value={query} onChangeText={setQuery} placeholder={`Search ${config.title.toLowerCase()}`} placeholderTextColor="#94A3B8" className="ml-3 flex-1 text-base text-[#14375F]" />
            {query ? <Pressable onPress={() => setQuery("")}><Ionicons name="close-circle" size={19} color="#94A3B8" /></Pressable> : null}
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 18 }}>
          {config.filters.map((option) => {
            const active = option === filter;
            return <Pressable key={option} onPress={() => setFilter(option)} className={`mr-2 rounded-full border px-5 py-2.5 ${active ? "border-[#078C7D] bg-[#078C7D]" : "border-[#DDE5EA] bg-white"}`}><Text className={`text-sm font-semibold ${active ? "text-white" : "text-[#687987]"}`}>{option}</Text></Pressable>;
          })}
        </ScrollView>

        <View className="px-6">
          <View className="mb-4 flex-row items-center justify-between"><Text className="text-lg font-bold text-[#14375F]">{filter === "All" ? config.title : filter}</Text><Text className="text-xs text-[#71808E]">{visibleItems.length} items</Text></View>
          {visibleItems.map((item) => {
            const tone = TONES[item.tone];
            return (
              <Pressable key={item.id} onPress={() => router.push({ pathname: "/projects/[projectId]/[module]/[itemId]", params: { projectId, module, itemId: item.id } })} className="mb-3 rounded-2xl border border-[#E1E7EA] bg-white p-4 active:opacity-75">
                <View className="flex-row items-start"><View className="h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: tone.background }}><Ionicons name={config.icon} size={21} color={tone.foreground} /></View><View className="ml-3 flex-1"><Text className="text-base font-bold text-[#14375F]">{item.title}</Text><Text className="mt-1 text-xs text-[#71808E]">{item.subtitle}</Text></View><View className="rounded-full px-2.5 py-1.5" style={{ backgroundColor: tone.background }}><Text className="text-[11px] font-semibold" style={{ color: tone.foreground }}>{item.status}</Text></View></View>
                <Text numberOfLines={2} className="mt-3 text-sm leading-5 text-[#687987]">{item.description}</Text>
                <View className="mt-4 flex-row items-center border-t border-[#EDF1F3] pt-3"><Ionicons name="time-outline" size={15} color="#94A3B8" /><Text className="ml-1.5 text-xs text-[#71808E]">{item.meta}</Text>{item.amount ? <Text className="ml-auto text-base font-bold text-[#14375F]">{item.amount}</Text> : <Ionicons name="chevron-forward" size={18} color="#94A3B8" style={{ marginLeft: "auto" }} />}</View>
              </Pressable>
            );
          })}
          {!visibleItems.length ? <View className="items-center rounded-2xl border border-dashed border-[#CBD5DC] bg-white px-6 py-12"><Ionicons name="search-outline" size={30} color="#94A3B8" /><Text className="mt-3 text-base font-bold text-[#14375F]">No matching items</Text><Text className="mt-1 text-center text-sm text-[#71808E]">Try another search or filter.</Text></View> : null}
          <Pressable onPress={() => router.push({ pathname: "/projects/[projectId]/[module]/new", params: { projectId, module } })} className="mt-3 h-14 flex-row items-center justify-center rounded-xl bg-[#078C7D] active:opacity-80"><Ionicons name="add" size={20} color="white" /><Text className="ml-2 text-base font-bold text-white">{config.action}</Text></Pressable>
        </View>
      </ScrollView>
      <PrototypeBottomNav />
    </SafeAreaView>
  );
}
