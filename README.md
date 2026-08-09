# VisiBuild Builder App

Functional local UI prototype for the VisiBuild builder experience. It uses Expo SDK 54, Expo Router, React Native, TypeScript, NativeWind, and Ionicons.

The prototype stores changes in memory for the current app session. It does not connect to a backend, send messages or emails, upload real files, make calls, or process payments.

## Run the app

```powershell
npm.cmd install
npm.cmd start
```

Useful checks:

```powershell
npx.cmd tsc --noEmit
npm.cmd run lint
npx.cmd expo export --platform web
```

## Explorer hierarchy

```text
Visibuild/
├── app/                         # Expo Router pages only
│   ├── (tabs)/                  # Home, projects, calendar, messages, more
│   ├── create-project/          # Three-step project creation routes
│   ├── messages/                # Conversation routes
│   ├── project-setup/           # AI/manual stage setup routes
│   ├── projects/[projectId]/    # Project workspace routes
│   │   ├── [module]/            # Lists, details, and create forms
│   │   └── stage/               # Stage detail route
│   └── *.tsx                    # Auth, notifications, settings, support
├── assets/                      # Logo and Expo image assets
├── components/                  # Reusable cross-feature UI
├── data/                        # Typed sample data and module definitions
├── features/
│   ├── auth/screens/            # Login, account, password, splash UI
│   ├── builder/screens/         # Calendar, messages, modules, settings
│   └── projects/screens/        # Project creation and workspace UI
├── state/                       # Shared in-memory prototype state
├── global.css                   # NativeWind entry point
└── tailwind.config.js           # App, component, and feature class scanning
```

## Navigation model

The `app` folder only describes URLs. Route files are deliberately small and import their visual screen from `features`.

- `/home`, `/projects`, `/calendar`, `/messages`, `/more` are the primary builder navigation destinations.
- `/create-project/*` contains the project, client, and payment steps of the creation wizard.
- `/projects/[projectId]` contains the project overview and timeline.
- `/projects/[projectId]/[module]` supports updates, payments, variations, decisions, documents, tasks, team, snagging, handover, and aftercare.
- Every project module has a list, detail screen, and local create flow.

## Prototype state

[`state/prototype-store.tsx`](state/prototype-store.tsx) owns session-only changes. New module items and status changes remain available while the app is open and reset when the app reloads.

Module labels, statistics, filters, and sample content are defined in [`data/prototype-modules.ts`](data/prototype-modules.ts).

## Adding another screen

1. Create the visual component inside the relevant `features/<feature>/screens` folder.
2. Add a small route file under `app` that re-exports that screen.
3. Link to the route with Expo Router.
4. Add shared sample data or state only if the screen needs it.
5. Run TypeScript, lint, and the Expo web export before considering the screen complete.
