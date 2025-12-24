# Data Structure

This directory contains all the data configuration for the DHR Launcher application.

## Files

### `types.ts`
Type definitions for `AppData` and `Category` interfaces.

### `categories.ts`
Category definitions and helper functions.

**To add a new category:**
1. Add a new object to the `categories` array:
```typescript
{ id: "Category Name", name: "Category Name", order: 6 }
```
2. The `order` property determines the display order (lower numbers appear first).

**To remove a category:**
1. Simply remove its object from the `categories` array.
2. Make sure no apps are using this category (or update those apps to use a different category).

### `apps.ts`
All app data configuration.

**To add a new app:**
1. Add a new object to the `apps` array with all required fields:
```typescript
{
  name: "App Name (Persian)",
  englishName: "App Name (English)", // Optional, for search
  keywords: ["keyword1", "keyword2"], // Optional, for search
  bgColor: "#color",
  description: "App description",
  icon: createIconFunction(), // or null for placeholder
  category: "Category Name", // Must match a category in categories.ts
  url: "/apps/app-slug",
}
```

2. If the app has an icon:
   - Create an icon function in `icons.tsx` (e.g., `createAppIcon()`)
   - Import it in `apps.ts`
   - Use it in the app object: `icon: createAppIcon()`

**To remove an app:**
1. Simply remove its object from the `apps` array.

### `icons.tsx`
Icon factory functions for creating app icons.

**To add a new icon:**
1. Create a new function that returns a ReactNode:
```typescript
export function createAppIcon(): ReactNode {
  return (
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 32 32"
      style={{ display: 'block' }}
    >
      <g>
        <path d={iconPaths.pathName} fill="white" />
      </g>
    </svg>
  );
}
```

2. Import the icon path from `../pages/iconPaths` if needed.
3. Export the function.
4. Import and use it in `apps.ts`.

## Best Practices

1. **Keep categories organized**: Use the `order` property to control display order.
2. **Use consistent naming**: Keep app names, URLs, and keywords consistent.
3. **Add search keywords**: Include relevant English keywords for better searchability.
4. **Validate categories**: Make sure app categories match existing categories in `categories.ts`.

