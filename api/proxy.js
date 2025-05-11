// api/proxy.js

export default async function handler(req, res) {
  const { from, to, gender } = req.query;

  try {
    const response = await fetch(
      `http://tabsera.com:8585/quran-teacher-report/report?from=${from}&to=${to}&gender=${gender}`
    );

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
