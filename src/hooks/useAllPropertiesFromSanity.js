import { useEffect, useState } from "react";
import { client } from "../sanityClient";

export default function useAllPropertiesFromSanity() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const query = `*[_type == "property"] | order(_createdAt desc){
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

        const data = await client.fetch(query);
        if (isMounted) setProperties(data);
      } catch (err) {
        console.error("❌ Fetch Error:", err);
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
