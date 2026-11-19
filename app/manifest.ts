import type { MetadataRoute } from "next";

// Web app manifest: name, colours and home-screen icons (192/512 generated from app/icon.png).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodTK — Building Next Generation Software",
    short_name: "CodTK",
    description: "Software and digital growth company in Lahore, Pakistan.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
