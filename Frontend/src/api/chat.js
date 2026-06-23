const BACKEND_URL =
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000"
    : "http://192.168.1.193:8000";

export async function sendMessage(question) {
  const res = await fetch(`${BACKEND_URL}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  // Better error handling
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Backend error:", errorText);
    throw new Error("API error");
  }

  const data = await res.json();

  console.log("Backend response:", data); // IMPORTANT DEBUG

  return data;
}

export async function getHistory() {
  const res = await fetch(`${BACKEND_URL}/history`);

  if (!res.ok) {
    throw new Error("Failed to load history");
  }

  return await res.json();
}