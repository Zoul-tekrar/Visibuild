import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";

const ITEMS: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: Href;
}[] = [
  { label: "Home", icon: "home-outline", href: "/home" },
  { label: "Projects", icon: "briefcase-outline", href: "/projects" },
  { label: "Calendar", icon: "calendar-outline", href: "/calendar" },
  { label: "Messages", icon: "chatbubble-outline", href: "/messages" },
  { label: "More", icon: "ellipsis-horizontal-circle-outline", href: "/more" },
];

export function PrototypeBottomNav() {
  const pathname = usePathname();

  return (
    <View className="flex-row border-t border-white/10 bg-[#102F52] px-2 pb-1">
      {ITEMS.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const color = active ? "#63D5C7" : "#9FB0C1";
        return (
          <Pressable
            key={item.label}
            accessibilityRole="button"
            accessibilityLabel={`Open ${item.label}`}
            onPress={() => router.navigate(item.href)}
            className="flex-1 items-center justify-center py-2 active:opacity-60"
          >
            <View
              className={`h-8 w-11 items-center justify-center rounded-xl ${
                active ? "bg-white/10" : "bg-transparent"
              }`}
            >
              <Ionicons name={item.icon} size={22} color={color} />
            </View>
            <Text className="mt-1 text-[10px] font-semibold" style={{ color }}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
