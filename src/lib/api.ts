const API_URL = "http://localhost:5000/api/v1";

export async function fetchEvents(limit = 3) {
  try {
    const res = await fetch(`${API_URL}/events?limit=${limit}&sort=-date`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export async function fetchNotices(limit = 4) {
  try {
    const res = await fetch(`${API_URL}/notices?limit=${limit}&sort=-publishedAt&isPublished=true`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch notices:", error);
    return [];
  }
}
