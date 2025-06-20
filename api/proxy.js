// pages/api/proxy.js

export default async function handler(req, res) {
  const { from, to, gender, type } = req.query;

  try {
    let endpoint;

    if (type === "download") {
      // Route to download survey/report endpoint
      endpoint = `http://tabsera.com:8585/quran-teacher-report/survey?from=${from}&to=${to}`;
    } else {
      // Default: assignment report
      endpoint = `http://tabsera.com:8585/quran-teacher-report/report?from=${from}&to=${to}&gender=${gender}`;
    }

    const response = await fetch(endpoint);

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "Proxy server error" });
  }
}
