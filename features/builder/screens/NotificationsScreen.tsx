import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePrototypeStore } from "@/state/prototype-store";

const ITEMS = [
  { title: "Payment viewed", body: "Sarah viewed the Roof payment request.", time: "10 min ago", icon: "card-outline" as const, color: "#2868B2", background: "#E8F1FB" },
  { title: "Client decision answered", body: "Bathroom tiles were approved.", time: "1 hr ago", icon: "checkmark-done-outline" as const, color: "#078C7D", background: "#DDF2EF" },
  { title: "New message", body: "Tom posted in Site Team.", time: "2 hrs ago", icon: "chatbubble-outline" as const, color: "#7857B8", background: "#F0EBFA" },
  { title: "Task due tomorrow", body: "Book roof inspection is due soon.", time: "Yesterday", icon: "alert-circle-outline" as const, color: "#B86B00", background: "#FFF4DF" },
];

export default function NotificationsScreen() {
  const { unreadNotifications, markNotificationsRead } = usePrototypeStore();
  return <SafeAreaView className="flex-1 bg-[#F8FBFC]" edges={["top", "bottom"]}><View className="flex-row items-center border-b border-[#E1E7EA] bg-white px-5 py-3"><Pressable onPress={() => router.back()} className="h-11 w-11 items-center justify-center rounded-full border border-[#DDE5EA]"><Ionicons name="chevron-back" size={22} color="#14375F" /></Pressable><View className="flex-1 items-center"><Text className="text-base font-bold text-[#14375F]">Notifications</Text><Text className="mt-0.5 text-xs text-[#71808E]">{unreadNotifications} unread</Text></View><Text onPress={markNotificationsRead} className="w-16 text-right text-xs font-semibold text-[#078C7D]">Mark read</Text></View><ScrollView contentContainerStyle={{ padding: 24 }}>{ITEMS.map((item, index) => <Pressable key={item.title} onPress={markNotificationsRead} className="mb-3 flex-row items-start rounded-2xl border border-[#E1E7EA] bg-white p-4 active:opacity-70"><View className="h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: item.background }}><Ionicons name={item.icon} size={21} color={item.color} /></View><View className="ml-3 flex-1"><View className="flex-row"><Text className="flex-1 text-sm font-bold text-[#14375F]">{item.title}</Text>{index < unreadNotifications ? <View className="mt-1 h-2.5 w-2.5 rounded-full bg-[#078C7D]" /> : null}</View><Text className="mt-1 text-xs leading-5 text-[#71808E]">{item.body}</Text><Text className="mt-2 text-[11px] text-[#94A3B8]">{item.time}</Text></View></Pressable>)}</ScrollView></SafeAreaView>;
}
