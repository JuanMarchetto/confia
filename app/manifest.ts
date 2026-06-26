import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Confía — verifica antes de creer, verifica antes de donar",
    short_name: "Confía",
    description:
      "Verifica rumores del terremoto y detecta estafas de donación en cripto. 🇻🇪 Build4Venezuela.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f8",
    theme_color: "#1d4ed8",
    lang: "es",
    categories: ["utilities", "news"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
