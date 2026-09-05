const API_URL = "http://localhost:5000/api/v1";

export async function fetchEvents(limit = 100) {
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

export async function fetchNotices(limit = 100) {
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

export async function fetchGallery(limit = 100) {
  try {
    const res = await fetch(`${API_URL}/gallery?limit=${limit}&sort=order`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
    return [];
  }
}

export async function fetchCommittees() {
  try {
    const res = await fetch(`${API_URL}/committees`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch committees:", error);
    return [];
  }
}
