import { useState, useEffect } from "react";

export default function usePropertiesFromSheet() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(import.meta.env.VITE_SHEET_API_URL);
        const text = await response.text();

        if (text.startsWith("<!DOCTYPE")) {
          throw new Error("Invalid JSON — check your OpenSheet URL or permissions.");
        }

        const data = JSON.parse(text);
        if (!Array.isArray(data)) throw new Error("Invalid data format (expected array).");

        const cleaned = data.map((item, index) => {
          // ✅ Handle featured column
          const featuredValue = String(item.featured || "").trim().toLowerCase();
          const isFeatured = ["true", "yes", "1"].includes(featuredValue);

          // ✅ Collect images
          const imageFields = ["image1", "image2", "image3", "image4", "images"];
          const images = imageFields
            .map((key) => item[key])
            .filter((url) => url && url.startsWith("http"));
          const finalImages =
            images.length > 0
              ? images
              : ["https://via.placeholder.com/600x400?text=No+Image+Available"];

          // ✅ Normalize all video links
          let videoUrl = item.videoUrl || item.video || "";
          if (videoUrl) {
            if (videoUrl.includes("youtu.be/")) {
              const id = videoUrl.split("youtu.be/")[1].split("?")[0];
              videoUrl = `https://www.youtube.com/embed/${id}`;
            } else if (videoUrl.includes("watch?v=")) {
              const id = videoUrl.split("watch?v=")[1].split("&")[0];
              videoUrl = `https://www.youtube.com/embed/${id}`;
            } else if (videoUrl.includes("shorts/")) {
              const id = videoUrl.split("shorts/")[1].split("?")[0];
              videoUrl = `https://www.youtube.com/embed/${id}`;
            } else if (videoUrl.includes("drive.google.com")) {
              const fileIdMatch = videoUrl.match(/[-\w]{25,}/);
              const fileId = fileIdMatch ? fileIdMatch[0] : null;
              videoUrl = fileId
                ? `https://drive.google.com/file/d/${fileId}/preview`
                : videoUrl;
            } else if (videoUrl.includes("vimeo.com")) {
              const vimeoId = videoUrl.split("/").pop();
              videoUrl = `https://player.vimeo.com/video/${vimeoId}`;
            } else if (videoUrl.includes("streamable.com")) {
              const streamId = videoUrl.split("/").pop();
              videoUrl = `https://streamable.com/e/${streamId}`;
            }
          }

          return {
            id: item.id || String(index + 1),
            name: item.name || "Unnamed Property",
            type: (item.type || "").trim(),
            purpose: (item.purpose || "").trim(),
            price: item.price || "Price on request",
            location: item.location || "Location not specified",
            beds: item.beds || "N/A",
            baths: item.baths || "N/A",
            kitchen: item.kitchen || item.Kitchen || "N/A",
            balcony: item.balcony || item.Balcony || "N/A",
            size: item.size || "N/A",
            description: item.description || "",
            lat: item.lat || "",
            lng: item.lng || "",
            featured: isFeatured,
            videoUrl: videoUrl,
            images: finalImages,
          };
        });

        // ✅ Deduplicate by ID
        const unique = Array.from(new Map(cleaned.map((p) => [p.id, p])).values());

        if (isMounted) setProperties(unique);
      } catch (err) {
        console.error("❌ Sheet fetch error:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return { properties, loading, error };
}
