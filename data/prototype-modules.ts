import type Ionicons from "@expo/vector-icons/Ionicons";

export type Tone = "teal" | "blue" | "amber" | "red" | "purple" | "grey";

export type ModuleKey =
  | "updates"
  | "payments"
  | "variations"
  | "decisions"
  | "documents"
  | "tasks"
  | "team"
  | "snagging"
  | "handover"
  | "aftercare";

export type PrototypeItem = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  tone: Tone;
  meta: string;
  description: string;
  amount?: string;
};

export type ModuleConfig = {
  title: string;
  singular: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  action: string;
  filters: string[];
  stats: { label: string; value: string; tone: Tone }[];
  items: PrototypeItem[];
};

export const MODULE_CONFIGS: Record<ModuleKey, ModuleConfig> = {
  updates: {
    title: "Progress updates",
    singular: "Update",
    description: "Keep clients informed with photos, videos, notes, and site progress.",
    icon: "images-outline",
    action: "Add update",
    filters: ["All", "Photos", "Videos", "Notes"],
    stats: [
      { label: "Published", value: "18", tone: "teal" },
      { label: "This week", value: "3", tone: "blue" },
      { label: "Drafts", value: "1", tone: "grey" },
    ],
    items: [
      { id: "roof-tiles", title: "Roof tile installation in progress", subtitle: "Roof", status: "Published", tone: "teal", meta: "Today · 10:30", description: "Waterproofing is complete and roof tiles are now being installed. Work remains on schedule." },
      { id: "membrane", title: "Waterproof membrane completed", subtitle: "Roof", status: "Published", tone: "teal", meta: "Yesterday · 15:40", description: "The roof is now weather-tight and ready for battens and tiles." },
      { id: "structure", title: "Roof structure inspection", subtitle: "Roof", status: "Draft", tone: "grey", meta: "18 Aug 2026", description: "Inspection photographs and site notes are ready for review before publishing." },
    ],
  },
  payments: {
    title: "Payments",
    singular: "Payment request",
    description: "Request, record, and track project payments without losing the evidence trail.",
    icon: "card-outline",
    action: "Request payment",
    filters: ["All", "Due", "Paid", "Overdue"],
    stats: [
      { label: "Paid", value: "£60k", tone: "teal" },
      { label: "Due", value: "£31k", tone: "amber" },
      { label: "Remaining", value: "£53k", tone: "blue" },
    ],
    items: [
      { id: "roof", title: "Roof payment", subtitle: "Request #6", status: "Due", tone: "amber", meta: "Due 24 Aug 2026", amount: "£31,000", description: "Roof structure, waterproof membrane, labour, materials, and installation evidence." },
      { id: "brickwork", title: "Brickwork payment", subtitle: "Request #5", status: "Paid", tone: "teal", meta: "Paid 18 Jul 2026", amount: "£16,000", description: "Completed external walls and structural brickwork." },
      { id: "foundations", title: "Foundations payment", subtitle: "Request #4", status: "Paid", tone: "teal", meta: "Paid 12 May 2026", amount: "£24,000", description: "Excavation, concrete foundations, and building-control inspection." },
    ],
  },
  variations: {
    title: "Variations",
    singular: "Variation",
    description: "Record scope changes with clear price and timeline impact before work starts.",
    icon: "git-compare-outline",
    action: "New variation",
    filters: ["All", "Pending", "Approved", "Declined"],
    stats: [
      { label: "Pending", value: "1", tone: "amber" },
      { label: "Approved", value: "3", tone: "teal" },
      { label: "Total", value: "£8.1k", tone: "purple" },
    ],
    items: [
      { id: "kitchen-island", title: "Move kitchen island", subtitle: "VAR-003", status: "Pending approval", tone: "amber", meta: "+2 days", amount: "+£1,480", description: "Move the island 600 mm toward the garden to improve circulation around the worktop." },
      { id: "electrical", title: "Extra electrical points", subtitle: "VAR-002", status: "Approved", tone: "teal", meta: "No time impact", amount: "+£630", description: "Add four double sockets and two USB outlets to the kitchen and family room." },
      { id: "doors", title: "Bi-fold door upgrade", subtitle: "VAR-001", status: "Approved", tone: "teal", meta: "+1 day", amount: "+£2,190", description: "Upgrade to slim-frame aluminium bi-fold doors with a lower threshold." },
    ],
  },
  decisions: {
    title: "Client decisions",
    singular: "Decision",
    description: "Give clients clear options, deadlines, and an auditable record of every choice.",
    icon: "checkmark-done-outline",
    action: "Request decision",
    filters: ["All", "Open", "Answered", "Overdue"],
    stats: [
      { label: "Open", value: "2", tone: "amber" },
      { label: "Answered", value: "8", tone: "teal" },
      { label: "Overdue", value: "0", tone: "grey" },
    ],
    items: [
      { id: "worktop", title: "Kitchen worktop", subtitle: "Kitchen", status: "Open", tone: "amber", meta: "Due in 2 days", description: "Choose between three quartz worktop options so the kitchen order can be finalised." },
      { id: "tiles", title: "Bathroom tiles", subtitle: "First fix", status: "Answered", tone: "teal", meta: "Answered 16 Aug", description: "Client selected the porcelain stone option for the family bathroom." },
      { id: "doors", title: "Internal door finish", subtitle: "Finishing", status: "Answered", tone: "teal", meta: "Answered 8 Aug", description: "White satin finish approved for all new internal doors." },
    ],
  },
  documents: {
    title: "Documents",
    singular: "Document",
    description: "Keep contracts, drawings, certificates, manuals, and evidence organised.",
    icon: "folder-open-outline",
    action: "Upload document",
    filters: ["All", "Contracts", "Drawings", "Certificates"],
    stats: [
      { label: "Files", value: "48", tone: "blue" },
      { label: "Shared", value: "31", tone: "teal" },
      { label: "Private", value: "17", tone: "grey" },
    ],
    items: [
      { id: "roof-plan", title: "Roof Plan.pdf", subtitle: "Drawings", status: "Shared", tone: "teal", meta: "2.4 MB · Updated today", description: "Latest approved roof plan and structural layout." },
      { id: "agreement", title: "Building Agreement.pdf", subtitle: "Contracts", status: "Shared", tone: "teal", meta: "1.8 MB · 12 Mar 2026", description: "Signed building agreement for Oakwood House Extension." },
      { id: "specification", title: "Roof Specification.pdf", subtitle: "Specifications", status: "Team only", tone: "grey", meta: "1.2 MB · 4 Aug 2026", description: "Material and installation requirements for the roof stage." },
    ],
  },
  tasks: {
    title: "Tasks",
    singular: "Task",
    description: "Assign project work, track deadlines, and keep every stage moving.",
    icon: "checkbox-outline",
    action: "New task",
    filters: ["All", "My tasks", "Open", "Completed"],
    stats: [
      { label: "Open", value: "7", tone: "blue" },
      { label: "Due soon", value: "2", tone: "amber" },
      { label: "Complete", value: "23", tone: "teal" },
    ],
    items: [
      { id: "tiles", title: "Install roof tiles", subtitle: "Roofing contractor", status: "In progress", tone: "blue", meta: "Due 24 Aug", description: "Complete the rear roof slope and begin the front elevation." },
      { id: "inspection", title: "Book roof inspection", subtitle: "Alex Builder", status: "Open", tone: "amber", meta: "Due 26 Aug", description: "Confirm the building-control inspection for stage completion." },
      { id: "membrane", title: "Install waterproof membrane", subtitle: "Roofing contractor", status: "Completed", tone: "teal", meta: "Completed 18 Aug", description: "Membrane installation completed and photographed." },
    ],
  },
  team: {
    title: "Project team",
    singular: "Team member",
    description: "Manage roles, project access, and the people responsible for delivery.",
    icon: "people-outline",
    action: "Invite member",
    filters: ["All", "Management", "Trades", "Client"],
    stats: [
      { label: "Members", value: "8", tone: "blue" },
      { label: "On site", value: "4", tone: "teal" },
      { label: "Invited", value: "1", tone: "amber" },
    ],
    items: [
      { id: "alex", title: "Alex Builder", subtitle: "Project manager", status: "Active", tone: "teal", meta: "Full access", description: "Project owner responsible for programme, client communication, and approvals." },
      { id: "mike", title: "Mike Johnson", subtitle: "Site manager", status: "Active", tone: "teal", meta: "Site access", description: "Coordinates site activity, tasks, inspections, and progress updates." },
      { id: "tom", title: "Tom Williams", subtitle: "Roofing contractor", status: "On site", tone: "blue", meta: "Roof stage", description: "Responsible for roof structure, membrane, battens, tiles, and evidence." },
    ],
  },
  snagging: {
    title: "Snagging",
    singular: "Snag",
    description: "Record defects, assign responsibility, and verify fixes before handover.",
    icon: "hammer-outline",
    action: "Add snag",
    filters: ["All", "Open", "In progress", "Resolved"],
    stats: [
      { label: "Open", value: "3", tone: "red" },
      { label: "In progress", value: "2", tone: "amber" },
      { label: "Resolved", value: "14", tone: "teal" },
    ],
    items: [
      { id: "tap", title: "Kitchen tap leaking", subtitle: "Kitchen", status: "Open", tone: "red", meta: "Reported today", description: "Small leak at the flexible hose connection beneath the sink." },
      { id: "door", title: "Utility door adjustment", subtitle: "Utility room", status: "In progress", tone: "amber", meta: "Assigned to carpenter", description: "Door catches the frame at the upper hinge and needs adjustment." },
      { id: "paint", title: "Touch up hallway paint", subtitle: "Hallway", status: "Resolved", tone: "teal", meta: "Verified 14 Aug", description: "Minor paint damage repaired and verified by the site manager." },
    ],
  },
  handover: {
    title: "Handover",
    singular: "Handover item",
    description: "Bring inspections, certificates, manuals, warranties, and sign-off together.",
    icon: "home-outline",
    action: "Add handover item",
    filters: ["All", "Required", "Ready", "Complete"],
    stats: [
      { label: "Complete", value: "8", tone: "teal" },
      { label: "Required", value: "3", tone: "amber" },
      { label: "Progress", value: "73%", tone: "blue" },
    ],
    items: [
      { id: "inspection", title: "Final inspection", subtitle: "Inspection", status: "Complete", tone: "teal", meta: "Completed 10 May", description: "Final site inspection completed with no major defects outstanding." },
      { id: "pack", title: "Digital handover pack", subtitle: "Documents", status: "In progress", tone: "blue", meta: "8 of 11 items", description: "Compile certificates, operating manuals, guarantees, drawings, and key contacts." },
      { id: "walkthrough", title: "Client walkthrough", subtitle: "Appointment", status: "Ready", tone: "amber", meta: "Schedule with client", description: "Guide the client through systems, finishes, controls, and maintenance." },
    ],
  },
  aftercare: {
    title: "Aftercare & warranty",
    singular: "Issue",
    description: "Support clients after completion and keep warranty responses transparent.",
    icon: "shield-checkmark-outline",
    action: "Report issue",
    filters: ["All", "Open", "Resolved", "Warranty"],
    stats: [
      { label: "Open", value: "1", tone: "red" },
      { label: "Resolved", value: "6", tone: "teal" },
      { label: "Warranty", value: "10 yrs", tone: "blue" },
    ],
    items: [
      { id: "tap", title: "Leaking kitchen tap", subtitle: "Plumbing", status: "Open", tone: "red", meta: "Reported 14 May", description: "Client reported a slow leak under the kitchen sink." },
      { id: "door", title: "Door adjustment", subtitle: "Joinery", status: "Resolved", tone: "teal", meta: "Resolved 9 May", description: "Entrance door alignment adjusted and checked with the client." },
      { id: "warranty", title: "Structural warranty", subtitle: "Warranty", status: "Active", tone: "blue", meta: "10 years remaining", description: "Structural warranty valid from project completion and available to the client." },
    ],
  },
};

export function isModuleKey(value: string | undefined): value is ModuleKey {
  return Boolean(value && value in MODULE_CONFIGS);
}
