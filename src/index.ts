import { serve } from "bun";
import index from "./index.html";
import { computeActions } from "./services/compute";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/compute": {
      async POST(req) {
        const payload = await req.json();
        const actions = computeActions(payload.min, payload.max);
        return Response.json({
          actions: actions,
        })
      }
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
