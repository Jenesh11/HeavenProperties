// src/hooks/usePropertiesFromSheet.js
import { useEffect, useState } from "react";

// Helper: Convert CSV to array of objects
function csvToArray(csv) {
  const rows = csv.trim().split("\n").map(r => r.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/));
  const headers = rows.shift().map(h => h.replace(/^"|"$/g, "").trim());

  return rows.map(row => {
    const obj = {};
    row.forEach((cell, i) => {
      const val = cell.replace(/^"|"$/g, "").trim();
      obj[headers[i]] = val;
    });
    return obj;
  });
}

export default function usePropertiesFromSheet() {
  const SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS6HfwDlRiXjkRm2jHJGCH2RHFMIAejzcQpQ0C4c0zRMcaEVAaj-YyYnKTLRvH28x0SJpmyKH5Wa-oH/pub?gid=0&single=true&output=csv";

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    fetch(SHEET_CSV_URL)
      .then(res => res.text())
      .then(csv => {
        if (!active) return;
        const arr = csvToArray(csv);
        const formatted = arr.map(p => ({
          id: p.id,
          name: p.name,
          type: p.type,
          price: p.price,
          beds: Number(p.beds) || 0,
          baths: Number(p.baths) || 0,
          size: p.size,
          location: p.location,
          lat: p.lat ? Number(p.lat) : null,
          lng: p.lng ? Number(p.lng) : null,
          description: p.description,
          images: [p.image1, p.image2, p.image3, p.image4].filter(Boolean),
          videoUrl: p.videoUrl,
          featured: (p.featured || "").toLowerCase() === "true",
        }));
        setProperties(formatted);
      })
      .catch(err => {
        console.error("Error loading sheet:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => (active = false);
  }, []);

  return { properties, loading, error };
}
