import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type DateFieldProps = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
};

function DateField({ label, value, icon }: DateFieldProps) {
  return (
    <View className="flex-1">
      <Text className="mb-2 text-sm font-semibold text-[#14375F]">{label}</Text>

      <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
        <Ionicons name={icon} size={19} color="#71808E" />

        <Text className="ml-2 flex-1 text-sm text-[#14375F]">{value}</Text>

        <Ionicons name="chevron-down" size={17} color="#94A3B8" />
      </View>
    </View>
  );
}

type PaymentStageProps = {
  number: number;
  title: string;
  percentage: number;
  amount: string;
  description: string;
};

function PaymentStage({
  number,
  title,
  percentage,
  amount,
  description,
}: PaymentStageProps) {
  return (
    <View className="mb-3 rounded-xl border border-[#DDE5EA] bg-white p-4">
      <View className="flex-row items-center">
        <View className="h-9 w-9 items-center justify-center rounded-full bg-[#E7F5F3]">
          <Text className="text-sm font-bold text-[#178F87]">{number}</Text>
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-sm font-bold text-[#14375F]">{title}</Text>

          <Text className="mt-1 text-xs text-[#71808E]">{description}</Text>
        </View>

        <Ionicons name="reorder-three-outline" size={22} color="#94A3B8" />
      </View>

      <View className="mt-4 flex-row gap-3">
        <View className="h-12 flex-1 flex-row items-center rounded-lg bg-[#F4F7F8] px-3">
          <Text className="text-xs text-[#71808E]">Percentage</Text>

          <Text className="ml-auto text-sm font-bold text-[#14375F]">
            {percentage}%
          </Text>
        </View>

        <View className="h-12 flex-1 flex-row items-center rounded-lg bg-[#F4F7F8] px-3">
          <Text className="text-xs text-[#71808E]">Amount</Text>

          <Text className="ml-auto text-sm font-bold text-[#14375F]">
            {amount}
          </Text>
        </View>
      </View>
    </View>
  );
}

const PAYMENT_STAGES: PaymentStageProps[] = [
  {
    number: 1,
    title: "Deposit",
    percentage: 10,
    amount: "£12,000",
    description: "Due when the project is accepted",
  },
  {
    number: 2,
    title: "Foundations complete",
    percentage: 20,
    amount: "£24,000",
    description: "Due after foundations are completed",
  },
  {
    number: 3,
    title: "Structure complete",
    percentage: 30,
    amount: "£36,000",
    description: "Due after the main structure is completed",
  },
  {
    number: 4,
    title: "First fix complete",
    percentage: 20,
    amount: "£24,000",
    description: "Due after first-fix works are completed",
  },
  {
    number: 5,
    title: "Project completion",
    percentage: 20,
    amount: "£24,000",
    description: "Due after handover and client sign-off",
  },
];

export default function ScheduleAndPaymentScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F8FBFC]" edges={["top", "bottom"]}>
      <StatusBar style="dark" backgroundColor="#F8FBFC" />

      {/* Decorative background */}
      <View
        pointerEvents="none"
        className="absolute -right-24 -top-20 h-64 w-64 rounded-full bg-[#249A96] opacity-10"
      />

      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-[#E4EAEE] bg-[#F8FBFC] px-5 py-3">
        <View className="h-11 w-11 items-center justify-center rounded-full border border-[#DDE5EA] bg-white">
          <Ionicons name="chevron-back" size={22} color="#14375F" />
        </View>

        <View className="items-center">
          <Text className="text-base font-bold text-[#14375F]">
            Create project
          </Text>

          <Text className="mt-0.5 text-xs text-[#71808E]">
            Schedule and payments
          </Text>
        </View>

        <Text className="w-11 text-right text-sm font-semibold text-[#178F87]">
          Save
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 36 }}
      >
        <View className="px-6">
          {/* Wizard progress */}
          <View className="mt-6">
            <View className="flex-row items-center">
              <View className="h-9 w-9 items-center justify-center rounded-full bg-[#DDF2EF]">
                <Ionicons name="checkmark" size={20} color="#078C7D" />
              </View>

              <View className="mx-2 h-0.5 flex-1 bg-[#078C7D]" />

              <View className="h-9 w-9 items-center justify-center rounded-full bg-[#DDF2EF]">
                <Ionicons name="checkmark" size={20} color="#078C7D" />
              </View>

              <View className="mx-2 h-0.5 flex-1 bg-[#078C7D]" />

              <View className="h-9 w-9 items-center justify-center rounded-full bg-[#078C7D]">
                <Text className="text-sm font-bold text-white">3</Text>
              </View>
            </View>

            <View className="mt-2 flex-row justify-between">
              <Text className="w-20 text-left text-xs font-semibold text-[#178F87]">
                Project
              </Text>

              <Text className="w-20 text-center text-xs font-semibold text-[#178F87]">
                Client
              </Text>

              <Text className="w-20 text-right text-xs font-semibold text-[#078C7D]">
                Schedule
              </Text>
            </View>
          </View>

          {/* Introduction */}
          <View className="mb-6 mt-8">
            <Text className="text-2xl font-bold tracking-tight text-[#102F52]">
              Schedule and payments
            </Text>

            <Text className="mt-2 text-sm leading-6 text-[#687987]">
              Confirm the project timeline and create a clear stage-payment
              schedule for your client.
            </Text>
          </View>

          {/* Project schedule heading */}
          <View className="mb-5 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E7F5F3]">
              <Ionicons name="calendar-outline" size={19} color="#178F87" />
            </View>

            <View className="ml-3">
              <Text className="text-base font-bold text-[#14375F]">
                Project schedule
              </Text>

              <Text className="text-xs text-[#71808E]">
                Estimated dates and duration
              </Text>
            </View>
          </View>

          {/* Dates */}
          <View className="mb-5 flex-row gap-3">
            <DateField
              label="Start date"
              value="12 Aug 2026"
              icon="calendar-outline"
            />

            <DateField
              label="Completion"
              value="27 Jan 2027"
              icon="flag-outline"
            />
          </View>

          {/* Duration */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-[#14375F]">
              Estimated duration
            </Text>

            <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
              <Ionicons name="time-outline" size={20} color="#71808E" />

              <TextInput
                value="24"
                editable={false}
                className="ml-3 flex-1 text-base font-semibold text-[#14375F]"
              />

              <Text className="text-sm text-[#71808E]">weeks</Text>
            </View>
          </View>

          {/* Timeline template */}
          <View className="mb-6 rounded-2xl border border-[#CDE7E3] bg-[#EDF8F6] p-4">
            <View className="flex-row items-center">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#D8F0EC]">
                <Ionicons name="layers-outline" size={21} color="#178F87" />
              </View>

              <View className="ml-3 flex-1">
                <Text className="text-sm font-bold text-[#14375F]">
                  Residential extension
                </Text>

                <Text className="mt-1 text-xs text-[#687987]">
                  8 construction stages selected
                </Text>
              </View>

              <Text className="text-sm font-semibold text-[#178F87]">Edit</Text>
            </View>

            <View className="mt-4 h-px bg-[#CDE7E3]" />

            <View className="mt-4 flex-row flex-wrap">
              {[
                "Pre-construction",
                "Foundations",
                "Structure",
                "Roof",
                "First fix",
                "Plastering",
                "Second fix",
                "Handover",
              ].map((stage) => (
                <View
                  key={stage}
                  className="mb-2 mr-2 rounded-full bg-white px-3 py-2"
                >
                  <Text className="text-xs font-medium text-[#536779]">
                    {stage}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Payment schedule heading */}
          <View className="mb-5 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E7F5F3]">
              <Ionicons name="wallet-outline" size={19} color="#178F87" />
            </View>

            <View className="ml-3">
              <Text className="text-base font-bold text-[#14375F]">
                Payment schedule
              </Text>

              <Text className="text-xs text-[#71808E]">
                Define how the client will pay
              </Text>
            </View>
          </View>

          {/* Payment type */}
          <Text className="mb-2 text-sm font-semibold text-[#14375F]">
            Payment structure
          </Text>

          <View className="mb-6 rounded-xl bg-[#E9EEF1] p-1">
            <View className="flex-row">
              <View className="h-11 flex-1 flex-row items-center justify-center rounded-lg bg-white">
                <Ionicons name="layers-outline" size={18} color="#178F87" />

                <Text className="ml-2 text-sm font-semibold text-[#14375F]">
                  Stage payments
                </Text>
              </View>

              <View className="h-11 flex-1 flex-row items-center justify-center">
                <Ionicons name="card-outline" size={18} color="#71808E" />

                <Text className="ml-2 text-sm font-medium text-[#71808E]">
                  Single payment
                </Text>
              </View>
            </View>
          </View>

          {/* Contract value */}
          <View className="mb-5">
            <Text className="mb-2 text-sm font-semibold text-[#14375F]">
              Contract value
            </Text>

            <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
              <Text className="text-lg font-semibold text-[#14375F]">£</Text>

              <TextInput
                value="120,000.00"
                editable={false}
                className="ml-3 flex-1 text-base font-semibold text-[#14375F]"
              />

              <Text className="text-xs font-medium text-[#94A3B8]">
                Excluding VAT
              </Text>
            </View>
          </View>

          {/* VAT */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-[#14375F]">
              VAT rate
            </Text>

            <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
              <Ionicons name="receipt-outline" size={20} color="#71808E" />

              <Text className="ml-3 flex-1 text-base text-[#14375F]">
                Standard rate — 20%
              </Text>

              <Ionicons name="chevron-down" size={19} color="#71808E" />
            </View>
          </View>

          {/* Payment terms */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-[#14375F]">
              Payment terms
            </Text>

            <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
              <Ionicons
                name="calendar-number-outline"
                size={20}
                color="#71808E"
              />

              <Text className="ml-3 flex-1 text-base text-[#14375F]">
                Due within 7 days
              </Text>

              <Ionicons name="chevron-down" size={19} color="#71808E" />
            </View>
          </View>

          {/* Stage payments */}
          <View className="mb-3 flex-row items-center justify-between">
            <View>
              <Text className="text-base font-bold text-[#14375F]">
                Payment stages
              </Text>

              <Text className="mt-1 text-xs text-[#71808E]">
                Total allocation must equal 100%
              </Text>
            </View>

            <View className="rounded-full bg-[#DDF2EF] px-3 py-2">
              <Text className="text-xs font-bold text-[#178F87]">
                100% allocated
              </Text>
            </View>
          </View>

          {PAYMENT_STAGES.map((stage) => (
            <PaymentStage key={stage.number} {...stage} />
          ))}

          {/* Add payment stage */}
          <View className="mb-8 mt-1 h-14 flex-row items-center justify-center rounded-xl border border-dashed border-[#8FCBC4] bg-[#EDF8F6]">
            <Ionicons name="add-circle-outline" size={20} color="#178F87" />

            <Text className="ml-2 text-sm font-semibold text-[#178F87]">
              Add payment stage
            </Text>
          </View>

          {/* Automatic payment requests */}
          <View className="mb-4 flex-row items-center rounded-xl border border-[#CDE7E3] bg-[#EDF8F6] p-4">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-[#D8F0EC]">
              <Ionicons
                name="notifications-outline"
                size={21}
                color="#178F87"
              />
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold text-[#14375F]">
                Automatic payment reminders
              </Text>

              <Text className="mt-1 text-xs leading-5 text-[#687987]">
                Remind the client when payments become due
              </Text>
            </View>

            <View className="h-7 w-12 items-end justify-center rounded-full bg-[#078C7D] px-1">
              <View className="h-5 w-5 rounded-full bg-white" />
            </View>
          </View>

          {/* Require completion evidence */}
          <View className="mb-8 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white p-4">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-[#F1F4F6]">
              <Ionicons name="images-outline" size={21} color="#71808E" />
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold text-[#14375F]">
                Include progress evidence
              </Text>

              <Text className="mt-1 text-xs leading-5 text-[#687987]">
                Attach photos when requesting stage payments
              </Text>
            </View>

            <View className="h-7 w-12 items-end justify-center rounded-full bg-[#078C7D] px-1">
              <View className="h-5 w-5 rounded-full bg-white" />
            </View>
          </View>

          {/* Financial summary */}
          <View className="mb-8 overflow-hidden rounded-2xl border border-[#CDE7E3] bg-white">
            <View className="flex-row items-center bg-[#EDF8F6] px-4 py-4">
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#D8F0EC]">
                <Ionicons name="calculator-outline" size={21} color="#178F87" />
              </View>

              <View className="ml-3">
                <Text className="text-sm font-bold text-[#14375F]">
                  Project payment summary
                </Text>

                <Text className="mt-1 text-xs text-[#71808E]">
                  Based on the current payment schedule
                </Text>
              </View>
            </View>

            <View className="p-4">
              <View className="mb-3 flex-row justify-between">
                <Text className="text-sm text-[#687987]">Contract value</Text>

                <Text className="text-sm font-semibold text-[#14375F]">
                  £120,000.00
                </Text>
              </View>

              <View className="mb-3 flex-row justify-between">
                <Text className="text-sm text-[#687987]">VAT at 20%</Text>

                <Text className="text-sm font-semibold text-[#14375F]">
                  £24,000.00
                </Text>
              </View>

              <View className="mb-4 h-px bg-[#E4EAEE]" />

              <View className="flex-row items-end justify-between">
                <Text className="text-sm font-bold text-[#14375F]">
                  Client total
                </Text>

                <Text className="text-xl font-bold text-[#078C7D]">
                  £144,000.00
                </Text>
              </View>
            </View>
          </View>

          {/* Final review */}
          <View className="mb-8 rounded-2xl bg-[#14375F] p-5">
            <View className="flex-row items-center">
              <View className="h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <Ionicons
                  name="shield-checkmark-outline"
                  size={22}
                  color="#FFFFFF"
                />
              </View>

              <View className="ml-3 flex-1">
                <Text className="text-base font-bold text-white">
                  Ready to create
                </Text>

                <Text className="mt-1 text-xs leading-5 text-[#C9D6E1]">
                  Review your project before creating the workspace.
                </Text>
              </View>
            </View>

            <View className="my-4 h-px bg-white/10" />

            <View className="mb-3 flex-row items-center">
              <Ionicons name="checkmark-circle" size={18} color="#63D5C7" />

              <Text className="ml-2 text-sm text-white">
                Oakwood House Extension
              </Text>
            </View>

            <View className="mb-3 flex-row items-center">
              <Ionicons name="checkmark-circle" size={18} color="#63D5C7" />

              <Text className="ml-2 text-sm text-white">Main client added</Text>
            </View>

            <View className="mb-3 flex-row items-center">
              <Ionicons name="checkmark-circle" size={18} color="#63D5C7" />

              <Text className="ml-2 text-sm text-white">
                24-week project schedule
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={18} color="#63D5C7" />

              <Text className="ml-2 text-sm text-white">
                Five-stage payment plan
              </Text>
            </View>
          </View>

          {/* Visual-only create button */}
          <View className="h-14 flex-row items-center justify-center rounded-xl bg-[#078C7D]">
            <Text className="text-base font-bold text-white">
              Create project
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#FFFFFF"
              style={{ marginLeft: 8 }}
            />
          </View>

          {/* Visual-only previous button */}
          <View className="mt-3 h-14 flex-row items-center justify-center rounded-xl border border-[#DDE5EA] bg-white">
            <Ionicons name="arrow-back" size={18} color="#71808E" />

            <Text className="ml-2 text-sm font-semibold text-[#687987]">
              Back to client details
            </Text>
          </View>

          <View className="mt-4 flex-row items-center justify-center">
            <Ionicons name="cloud-done-outline" size={15} color="#94A3B8" />

            <Text className="ml-1.5 text-xs text-[#94A3B8]">
              Your progress will be saved as a draft
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
