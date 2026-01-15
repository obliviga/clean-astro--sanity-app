// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const env = loadEnv(import.meta.env.MODE, process.cwd(), "");
const {
	PUBLIC_SANITY_STUDIO_PROJECT_ID,
	PUBLIC_SANITY_STUDIO_DATASET,
	PUBLIC_SANITY_PROJECT_ID,
	PUBLIC_SANITY_DATASET,
	PUBLIC_STUDIO_URL,
} = env;
import { defineConfig } from "astro/config";

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
	// Hybrid+adapter is required to support embedded Sanity Studio
	output: "hybrid",
	adapter: vercel({
		runtime: "nodejs20.x",
	}),
	integrations: [
		sanity({
			projectId,
			dataset,
			// studioBasePath: "/admin",
			useCdn: false,
			// `false` if you want to ensure fresh data
			apiVersion: "2024-12-08", // Set to date of setup to use the latest API version
			stega: {
				// In production, point to an env-provided Studio URL; default to local dev server
				studioUrl:
					import.meta.env.MODE === "production" && PUBLIC_STUDIO_URL
						? PUBLIC_STUDIO_URL
						: "http://localhost:3333/",
			},
		}),
		react(), // Required for Sanity Studio
	],
});
