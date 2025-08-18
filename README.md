# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Navigation: Stack vs Tabs

This project demonstrates two different navigation patterns using Expo Router:

### Stack Navigation

**What it is:** A stack-based navigation where screens are stacked on top of each other, with a back button to navigate to previous screens.

**When to use:**

- Master-detail flows (list → detail)
- Multi-step forms
- Any flow where you need to go back to previous screens

**Example in this project:**

```
app/
├── films/
│   ├── _layout.tsx     # Stack layout
│   ├── index.tsx       # Films list
│   └── [id].tsx        # Film details (dynamic route)
└── people/
    ├── _layout.tsx     # Stack layout
    ├── index.tsx       # People list
    └── [id].tsx        # Person details (dynamic route)
```

**Navigation flow:**

1. User sees films list (`/films`)
2. Taps on a film → navigates to film details (`/films/1`)
3. Can go back to list using back button
4. Each film detail is a new screen in the stack

**Code example:**

```tsx
// app/films/_layout.tsx
import { Stack } from "expo-router";

export default function FilmsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Films" }} />
      <Stack.Screen name="[id]" options={{ title: "Film Details" }} />
    </Stack>
  );
}
```

### Tab Navigation

**What it is:** Bottom or top tabs that allow switching between different sections of the app without losing state.

**When to use:**

- Main app sections (Home, Profile, Settings)
- When you want to maintain state across navigation
- When sections are independent of each other

**Example in this project:**

```
app/
├── _layout.tsx         # Root layout with tabs
├── index.tsx           # Home tab
├── films/              # Films tab
├── people/             # People tab
└── favorites.tsx       # Favorites tab
```

**Navigation flow:**

1. User can switch between tabs without losing their place
2. Each tab maintains its own navigation stack
3. No back button needed between main sections

**Code example:**

```tsx
// app/_layout.tsx
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="films" options={{ title: "Films" }} />
      <Tabs.Screen name="people" options={{ title: "People" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
    </Tabs>
  );
}
```

### Key Differences

| Feature                | Stack                    | Tabs                    |
| ---------------------- | ------------------------ | ----------------------- |
| **Navigation**         | Push/pop screens         | Switch between sections |
| **Back Button**        | Yes                      | No (between tabs)       |
| **State Preservation** | Lost when popping        | Maintained across tabs  |
| **Use Case**           | Flows with hierarchy     | Independent sections    |
| **Memory**             | Screens can be destroyed | All tabs stay in memory |

## FlatList Implementation

This project includes a sophisticated FlatList implementation in the People section with the following features:

### Core Features

#### 1. **Infinite Scroll**

- Automatically loads more data when user reaches the bottom
- Uses `onEndReached` prop to detect scroll position
- Fetches next page from SWAPI API

```tsx
<FlatList
  onEndReached={fetchMorePeople}
  onEndReachedThreshold={0.1} // Triggers when 10% from bottom
/>
```

#### 2. **Pull-to-Refresh**

- Swipe down to refresh the list
- Shows loading indicator during refresh
- Resets to first page of data

```tsx
<FlatList
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={colors.text}
    />
  }
/>
```

#### 3. **Loading States**

- **Initial loading**: Shows spinner when first loading data
- **Footer loading**: Shows "Loading more people..." when fetching next page
- **Empty state**: Shows message when no data is available

```tsx
ListEmptyComponent={
  <ListEmptyComponent loading={loading} message="No people found" />
}
ListFooterComponent={renderFooter}
```

#### 4. **Performance Optimizations**

- **`removeClippedSubviews={true}`**: Removes off-screen items from memory
- **`keyExtractor`**: Uses unique keys for efficient re-rendering
- **Memory efficient**: Replaces data instead of accumulating (mobile-optimized)

#### 5. **Mobile-Optimized Data Strategy**

Instead of accumulating all data (which could cause memory issues), this implementation:

- **Replaces data** with latest page from API
- **Auto-scrolls to top** after loading new data
- **Always shows fresh content** (like social media apps)
- **Efficient for mobile** with limited screen space

```tsx
async function fetchMorePeople() {
  const response = await fetch(people.next);
  const data = await response.json();
  setPeople(data); // Replace with latest data
  // Auto-scroll to top to show new content
  setTimeout(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, 1000);
}
```

### Technical Implementation

#### State Management

```tsx
const [people, setPeople] = useState<People | null>(null);
const [refreshing, setRefreshing] = useState(false);
const [loading, setLoading] = useState(false);
const flatListRef = useRef<FlatList>(null);
```

#### API Integration

- Fetches from SWAPI (Star Wars API)
- Handles pagination using `next` URL from API response
- Error handling for network requests

#### Navigation Integration

- Each person item links to detail page using dynamic routing
- Uses Expo Router's `Link` component for navigation
- Extracts ID from person's URL for routing

```tsx
function renderPerson({ item }: { item: Person }) {
  const id = item.url.split("/").filter(Boolean).pop();
  return (
    <Link href={`/people/${id}`} asChild>
      <TouchableOpacity>{/* Person item content */}</TouchableOpacity>
    </Link>
  );
}
```

### Benefits of This Implementation

✅ **Smooth user experience** with infinite scroll
✅ **Memory efficient** for mobile devices
✅ **Always fresh data** from API
✅ **Performance optimized** with proper FlatList props
✅ **Error handling** for network issues
✅ **Loading states** for better UX
✅ **Mobile-first design** patterns

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```
