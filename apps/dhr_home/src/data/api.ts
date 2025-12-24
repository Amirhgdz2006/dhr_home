// Use Vite-exposed env variable when available, fallback to relative path (proxied in dev)
const API_TEST_URL = import.meta.env.VITE_TEST_API_URL ?? "/api/data";

export async function fetchCategoriesFromStrapi() {
  try {
    const res = await fetch(API_TEST_URL);
    const json = await res.json();

    if (!json.data) {
      throw new Error("No data field in response");
    }

    return json.data.map((item: any) => ({
      id: item.name,
      name: item.name,
      order: item.order || 999,
    }));
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}

export async function fetchAppsFromStrapi() {
  try {
    const res = await fetch(API_TEST_URL);
    const json = await res.json();

    if (!json.data) {
      throw new Error("No data field in response");
    }

    const apps: any[] = [];

    json.data.forEach((cat: any) => {
      const categoryName = cat.name;
      const categoryApps = cat.apps?.map((app: any) => ({
        name: app.name,
        englishName: app.englishName,
        keywords: app.keywords || [],
        bgColor: app.icon_background_color || "rgba(0,0,0,0.1)",
        description: app.description,
        icon: app.icon?.url || null,
        category: categoryName,
        url: app.url,
      })) || [];

      apps.push(...categoryApps);
    });

    return apps;
  } catch (err) {
    console.error("Error fetching apps:", err);
    return [];
  }
}

