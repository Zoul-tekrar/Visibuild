import { Text, View } from "react-native";

import { combinations } from "@/data/combinations";

export default function HomeScreen() {
  const combination = combinations[1];

  return (
    <View className="flex-1 items-center justify-center bg-orange-500">
      <Text>Opponent throws</Text>
      <Text>{combination.name}</Text>
      <Text>{combination.punches.join(" → ")}</Text>
    </View>
  );
}
