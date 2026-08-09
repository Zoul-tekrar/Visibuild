import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";

type MainPageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  actionIcon?: keyof typeof Ionicons.glyphMap;
  actionLabel?: string;
  onAction?: () => void;
  badge?: number;
};

export function MainPageHero({
  eyebrow,
  title,
  subtitle,
  icon,
  actionIcon,
  actionLabel,
  onAction,
  badge,
}: MainPageHeroProps) {
  return (
    <View className="h-40 overflow-hidden rounded-b-[28px] bg-[#102F52] px-6 pb-5 pt-3">
      <View
        pointerEvents="none"
        className="absolute -right-12 -top-20 h-52 w-52 rounded-full bg-[#2868B2] opacity-35"
      />
      <View
        pointerEvents="none"
        className="absolute -bottom-24 right-20 h-44 w-44 rounded-full bg-[#078C7D] opacity-25"
      />

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <Ionicons name={icon} size={20} color="#63D5C7" />
          </View>
          <Text className="ml-3 text-xs font-bold uppercase tracking-[1.5px] text-[#63D5C7]">
            {eyebrow}
          </Text>
        </View>

        {actionIcon && onAction ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={actionLabel}
            onPress={onAction}
            className="relative h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 active:bg-white/20"
          >
            <Ionicons name={actionIcon} size={21} color="#FFFFFF" />
            {badge ? (
              <View className="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full bg-[#F29A3F] px-1">
                <Text className="text-[10px] font-bold text-white">
                  {badge}
                </Text>
              </View>
            ) : null}
          </Pressable>
        ) : null}
      </View>

      <Text className="mt-4 text-2xl font-bold tracking-tight text-white">
        {title}
      </Text>
      <Text
        numberOfLines={2}
        className="mt-1.5 text-xs leading-4 text-[#C5D4E2]"
      >
        {subtitle}
      </Text>
    </View>
  );
}
