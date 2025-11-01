export default async function handler(req, res) {
  const { from, to, gender, type, teacher, onlyActivity } = req.query;

  try {
    let endpoint;
    let options = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization,
        }),
      },
    };

    if (req.method === "POST") {
      options.body = JSON.stringify(req.body);
    }

    if (type === "login") {
      endpoint = `http://tabsera.com:8585/api/login`;
    } else if (type === "download") {
      endpoint = `http://tabsera.com:8585/quran-teacher-report/survey?from=${from}&to=${to}`;
    } else if (type === "submissions") {
      endpoint = `http://tabsera.com:8585/quran-teacher-report/submissions?from=${from}&to=${to}&teacher=${teacher}`;
    } else {
      endpoint = `http://tabsera.com:8585/quran-teacher-report/report?from=${from}&to=${to}&gender=${gender}&onlyActivity=${onlyActivity}`;
    }

    const response = await fetch(endpoint, options);

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
