import { useEffect, useState } from "react";
import { client } from "../sanityClient";

export default function useFeaturedPropertiesFromSanity() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // 🟢 Query: Featured properties only
        let query = `*[_type == "property" && featured == true]{
          _id,
          name,
          type,
          price,
          beds,
          baths,
          kitchen,
          balcony,
          size,
          location,
          description,
          videoUrl,
          lat,
          lng,
          featured,
          "images": images[].asset->url
        }`;

        let data = await client.fetch(query);

        // 🟡 Fallback — if no featured properties, fetch all
        if (!data.length) {
          console.warn("⚠️ No featured properties found. Fetching all properties...");
          query = `*[_type == "property"]{
            _id,
            name,
            type,
            price,
            beds,
            baths,
            kitchen,
            balcony,
            size,
            location,
            description,
            videoUrl,
            lat,
            lng,
            featured,
            "images": images[].asset->url
          }`;
          data = await client.fetch(query);
        }

        if (isMounted) {
          console.log("✅ Sanity Fetched Properties:", data);
          setProperties(data);
        }
      } catch (err) {
        console.error("❌ Sanity Fetch Error:", err.message);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => (isMounted = false);
  }, []);

  return { properties, loading, error };
}
