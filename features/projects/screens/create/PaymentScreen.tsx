import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PaymentStructure = "flexible" | "deposit-final" | "external";

type PaymentOption = {
  value: PaymentStructure;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    value: "flexible",
    title: "Flexible payment requests",
    description:
      "Request payments whenever appropriate as the project progresses.",
    icon: "wallet-outline",
  },
  {
    value: "deposit-final",
    title: "Deposit and final balance",
    description:
      "Collect an initial deposit and the remaining balance on completion.",
    icon: "swap-horizontal-outline",
  },
  {
    value: "external",
    title: "External invoicing only",
    description:
      "Record payments handled through accounting software or bank transfer.",
    icon: "open-outline",
  },
];

type SelectionSettingProps = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
};

function SelectionSetting({ label, value, icon }: SelectionSettingProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-[#14375F]">{label}</Text>

      <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
        <Ionicons name={icon} size={20} color="#71808E" />

        <Text className="ml-3 flex-1 text-sm text-[#14375F]">{value}</Text>

        <Ionicons name="chevron-down" size={18} color="#94A3B8" />
      </View>
    </View>
  );
}

type ToggleSettingProps = {
  title: string;
  description: string;
  enabled?: boolean;
};

function ToggleSetting({
  title,
  description,
  enabled = true,
}: ToggleSettingProps) {
  return (
    <View className="flex-row items-center border-t border-[#E8ECEF] py-4 first:border-t-0">
      <View className="flex-1 pr-4">
        <Text className="text-sm font-semibold text-[#14375F]">{title}</Text>

        <Text className="mt-1 text-xs leading-5 text-[#71808E]">
          {description}
        </Text>
      </View>

      <View
        className={`h-7 w-12 justify-center rounded-full px-1 ${
          enabled ? "items-end bg-[#078C7D]" : "items-start bg-[#CBD5DC]"
        }`}
      >
        <View className="h-5 w-5 rounded-full bg-white" />
      </View>
    </View>
  );
}

type PaymentStructureOptionProps = {
  option: PaymentOption;
  selected: boolean;
  onSelect: (value: PaymentStructure) => void;
};

function PaymentStructureOption({
  option,
  selected,
  onSelect,
}: PaymentStructureOptionProps) {
  return (
    <Pressable
      onPress={() => onSelect(option.value)}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      className={`mb-3 flex-row items-start rounded-2xl border p-4 ${
        selected ? "border-[#8FCBC4] bg-[#EDF8F6]" : "border-[#DDE5EA] bg-white"
      }`}
    >
      <View
        className={`h-11 w-11 items-center justify-center rounded-xl ${
          selected ? "bg-[#D8F0EC]" : "bg-[#F1F4F6]"
        }`}
      >
        <Ionicons
          name={option.icon}
          size={21}
          color={selected ? "#178F87" : "#71808E"}
        />
      </View>

      <View className="ml-3 flex-1">
        <Text className="text-sm font-bold text-[#14375F]">{option.title}</Text>

        <Text className="mt-1 text-xs leading-5 text-[#687987]">
          {option.description}
        </Text>
      </View>

      <Ionicons
        name={selected ? "radio-button-on" : "radio-button-off"}
        size={22}
        color={selected ? "#178F87" : "#CBD5DC"}
      />
    </Pressable>
  );
}

function FlexiblePaymentSettings() {
  return (
    <View>
      <SelectionSetting
        label="Default payment terms"
        value="Due within 7 days"
        icon="calendar-number-outline"
      />

      <View className="rounded-2xl border border-[#DDE5EA] bg-white px-4">
        <ToggleSetting
          title="Allow partial payments"
          description="Let the client pay part of a payment request."
        />

        <ToggleSetting
          title="Include progress evidence"
          description="Attach photos and documents to payment requests."
        />

        <ToggleSetting
          title="Automatic payment reminders"
          description="Remind the client before and after the due date."
        />
      </View>
    </View>
  );
}

function DepositAndFinalSettings() {
  return (
    <View>
      <View className="mb-4">
        <Text className="mb-2 text-sm font-semibold text-[#14375F]">
          Deposit percentage
        </Text>

        <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
          <Ionicons name="cash-outline" size={20} color="#71808E" />

          <TextInput
            value="20"
            editable={false}
            className="ml-3 flex-1 text-base font-semibold text-[#14375F]"
          />

          <Text className="text-sm text-[#71808E]">%</Text>
        </View>
      </View>

      <View className="mb-4 flex-row gap-3">
        <View className="flex-1 rounded-xl bg-[#EDF8F6] p-4">
          <Text className="text-xs text-[#71808E]">Deposit</Text>

          <Text className="mt-2 text-lg font-bold text-[#078C7D]">£24,000</Text>

          <Text className="mt-1 text-xs text-[#71808E]">20% of contract</Text>
        </View>

        <View className="flex-1 rounded-xl bg-[#F1F4F6] p-4">
          <Text className="text-xs text-[#71808E]">Final balance</Text>

          <Text className="mt-2 text-lg font-bold text-[#14375F]">£96,000</Text>

          <Text className="mt-1 text-xs text-[#71808E]">80% of contract</Text>
        </View>
      </View>

      <SelectionSetting
        label="Deposit due"
        value="When the client accepts the project"
        icon="document-text-outline"
      />

      <SelectionSetting
        label="Final balance due"
        value="On project handover"
        icon="flag-outline"
      />

      <View className="rounded-2xl border border-[#DDE5EA] bg-white px-4">
        <ToggleSetting
          title="Automatic payment reminders"
          description="Remind the client when either payment becomes due."
        />
      </View>
    </View>
  );
}

function ExternalInvoicingSettings() {
  return (
    <View>
      <Text className="mb-3 text-sm font-semibold text-[#14375F]">
        External payment method
      </Text>

      <View className="mb-3 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white p-4">
        <View className="h-10 w-10 items-center justify-center rounded-lg bg-[#E8F1FB]">
          <Text className="text-sm font-bold text-[#2868B2]">X</Text>
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-sm font-bold text-[#14375F]">Xero</Text>

          <Text className="mt-1 text-xs text-[#71808E]">
            Import invoices and payment status
          </Text>
        </View>

        <Ionicons name="ellipse-outline" size={22} color="#CBD5DC" />
      </View>

      <View className="mb-3 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white p-4">
        <View className="h-10 w-10 items-center justify-center rounded-lg bg-[#E6F5EA]">
          <Text className="text-sm font-bold text-[#27824A]">QB</Text>
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-sm font-bold text-[#14375F]">QuickBooks</Text>

          <Text className="mt-1 text-xs text-[#71808E]">
            Import invoices and payment status
          </Text>
        </View>

        <Ionicons name="ellipse-outline" size={22} color="#CBD5DC" />
      </View>

      <View className="mb-3 flex-row items-center rounded-xl border border-[#8FCBC4] bg-[#EDF8F6] p-4">
        <View className="h-10 w-10 items-center justify-center rounded-lg bg-[#D8F0EC]">
          <Ionicons name="business-outline" size={20} color="#178F87" />
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-sm font-bold text-[#14375F]">
            Bank transfer
          </Text>

          <Text className="mt-1 text-xs text-[#71808E]">
            Record payments manually in VisiBuild
          </Text>
        </View>

        <Ionicons name="radio-button-on" size={22} color="#178F87" />
      </View>

      <View className="mb-5 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white p-4">
        <View className="h-10 w-10 items-center justify-center rounded-lg bg-[#F1F4F6]">
          <Ionicons name="ellipsis-horizontal" size={20} color="#71808E" />
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-sm font-bold text-[#14375F]">
            Other external system
          </Text>

          <Text className="mt-1 text-xs text-[#71808E]">
            Record invoice references and payments manually
          </Text>
        </View>

        <Ionicons name="ellipse-outline" size={22} color="#CBD5DC" />
      </View>

      <View className="rounded-2xl border border-[#DDE5EA] bg-white px-4">
        <ToggleSetting
          title="Show payment records to client"
          description="Display externally recorded invoices and payment status."
        />

        <ToggleSetting
          title="Allow manual payment recording"
          description="Let authorised team members mark payments as received."
        />
      </View>

      <View className="mt-4 flex-row items-start rounded-xl border border-[#CFE0EF] bg-[#F1F7FC] p-4">
        <Ionicons name="information-circle-outline" size={20} color="#2868B2" />

        <Text className="ml-3 flex-1 text-xs leading-5 text-[#536779]">
          Connecting Xero or QuickBooks will require an integration setup
          screen. Bank transfer can be recorded without an integration.
        </Text>
      </View>
    </View>
  );
}

function PaymentSettings({ structure }: { structure: PaymentStructure }) {
  if (structure === "deposit-final") {
    return <DepositAndFinalSettings />;
  }

  if (structure === "external") {
    return <ExternalInvoicingSettings />;
  }

  return <FlexiblePaymentSettings />;
}

export default function PaymentScreen() {
  const [paymentStructure, setPaymentStructure] =
    useState<PaymentStructure>("flexible");

  const selectedPaymentTitle =
    PAYMENT_OPTIONS.find((option) => option.value === paymentStructure)
      ?.title ?? "Flexible payment requests";

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
        <Pressable
          onPress={() => router.back()}
          className="h-11 w-11 items-center justify-center rounded-full border border-[#DDE5EA] bg-white active:opacity-60"
        >
          <Ionicons name="chevron-back" size={22} color="#14375F" />
        </Pressable>

        <View className="items-center">
          <Text className="text-base font-bold text-[#14375F]">
            Create project
          </Text>

          <Text className="mt-0.5 text-xs text-[#71808E]">Payment</Text>
        </View>

        <Text
          onPress={() =>
            Alert.alert(
              "Draft saved",
              "Payment settings have been saved locally.",
            )
          }
          className="w-11 text-right text-sm font-semibold text-[#178F87]"
        >
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
                Payment
              </Text>
            </View>
          </View>

          {/* Introduction */}
          <View className="mb-6 mt-8">
            <Text className="text-2xl font-bold tracking-tight text-[#102F52]">
              Payment
            </Text>

            <Text className="mt-2 text-sm leading-6 text-[#687987]">
              Enter the contract value and choose how payments will be managed.
            </Text>
          </View>

          {/* Contract value comes before payment structure */}
          <View className="mb-5 mt-2 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E7F5F3]">
              <Ionicons name="calculator-outline" size={19} color="#178F87" />
            </View>

            <View className="ml-3">
              <Text className="text-base font-bold text-[#14375F]">
                Contract value
              </Text>

              <Text className="text-xs text-[#71808E]">
                Confirm the agreed project amount
              </Text>
            </View>
          </View>

          <View className="mb-5">
            <Text className="mb-2 text-sm font-semibold text-[#14375F]">
              Project value
            </Text>

            <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
              <Text className="text-lg font-semibold text-[#14375F]">£</Text>

              <TextInput
                value="120,000.00"
                editable={false}
                className="ml-3 flex-1 text-base font-semibold text-[#14375F]"
              />

              <Text className="text-xs text-[#94A3B8]">Excluding VAT</Text>
            </View>
          </View>

          <SelectionSetting
            label="VAT rate"
            value="Standard rate — 20%"
            icon="receipt-outline"
          />

          {/* Payment structure */}
          <View className="mb-5 mt-3 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E7F5F3]">
              <Ionicons name="wallet-outline" size={19} color="#178F87" />
            </View>

            <View className="ml-3">
              <Text className="text-base font-bold text-[#14375F]">
                Payment structure
              </Text>

              <Text className="text-xs text-[#71808E]">
                Choose how payments will be requested
              </Text>
            </View>
          </View>

          <View accessibilityRole="radiogroup">
            {PAYMENT_OPTIONS.map((option) => (
              <PaymentStructureOption
                key={option.value}
                option={option}
                selected={paymentStructure === option.value}
                onSelect={setPaymentStructure}
              />
            ))}
          </View>

          {/* Conditional settings */}
          <View className="mb-5 mt-5">
            <Text className="text-lg font-bold text-[#14375F]">
              {selectedPaymentTitle} settings
            </Text>

            <Text className="mt-1 text-xs leading-5 text-[#71808E]">
              These settings apply to the selected payment structure.
            </Text>
          </View>

          <PaymentSettings structure={paymentStructure} />

          {/* Financial summary */}
          <View className="mt-8 overflow-hidden rounded-2xl border border-[#CDE7E3] bg-white">
            <View className="flex-row items-center bg-[#EDF8F6] px-4 py-4">
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#D8F0EC]">
                <Ionicons name="calculator-outline" size={21} color="#178F87" />
              </View>

              <View className="ml-3 flex-1">
                <Text className="text-sm font-bold text-[#14375F]">
                  Project payment summary
                </Text>

                <Text className="mt-1 text-xs text-[#71808E]">
                  {selectedPaymentTitle}
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

          {/* Visual-only create project button */}
          <Pressable
            onPress={() => {
              Alert.alert(
                "Project created",
                "Oakwood House Extension is ready in your project list.",
                [
                  {
                    text: "View projects",
                    onPress: () => router.replace("/projects"),
                  },
                ],
              );
            }}
            className="mt-8 h-14 flex-row items-center justify-center rounded-xl bg-[#078C7D] active:opacity-80"
          >
            <Text className="text-base font-bold text-white">
              Create project
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#FFFFFF"
              style={{ marginLeft: 8 }}
            />
          </Pressable>

          {/* Visual-only previous button */}
          <Pressable
            onPress={() => router.back()}
            className="mt-3 h-14 flex-row items-center justify-center rounded-xl border border-[#DDE5EA] bg-white active:bg-[#F4F7F8]"
          >
            <Ionicons name="arrow-back" size={18} color="#71808E" />

            <Text className="ml-2 text-sm font-semibold text-[#687987]">
              Back to client details
            </Text>
          </Pressable>

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
