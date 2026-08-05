/** biome-ignore-all lint/style/noNonNullAssertion: Accessing env variables */

import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_PROJECT_ID!,
    dataset: process.env.SANITY_DATASET!,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
    appId: process.env.SANITY_APP_ID,
  },
  typegen: {
    enabled: true,
    generates: "./src/sanity/types.ts", // where generated types go
    schema: "./schema.json", // where schema extract writes to
  },
});
