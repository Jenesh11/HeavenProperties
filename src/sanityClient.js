import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

console.log("Sanity Project ID:", import.meta.env.VITE_SANITY_PROJECT_ID);
console.log("Using Token:", import.meta.env.VITE_SANITY_API_TOKEN ? "Loaded ✅" : "Missing ❌");


export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2025-11-12", // use today’s date
  useCdn: false, // ensures fresh data
  token: import.meta.env.VITE_SANITY_API_TOKEN,
});



const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
