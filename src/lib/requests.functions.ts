import { createServerFn } from "@tanstack/react-start";
import { requestSchema } from "@/lib/request-schema";

// Intentionally public: visitors can submit, but cannot read submissions.
export const submitRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => requestSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const table = data.kind === "api" ? "api_requests" : "feature_recommendations";
    const { error } = await supabaseAdmin.from(table).insert({
      name: data.name, email: data.email, message: data.message,
    });
    if (error) return { ok: false as const };
    return { ok: true as const };
  });