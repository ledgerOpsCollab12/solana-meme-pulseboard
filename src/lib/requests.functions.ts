import { createServerFn } from "@tanstack/react-start";
import { requestSchema } from "@/lib/request-schema";

// Intentionally public: visitors can submit, but cannot read submissions.
export const submitRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => requestSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const row = { name: data.name, email: data.email, message: data.message };
    const { error } = data.kind === "api"
      ? await supabaseAdmin.from("api_requests").insert({ ...row, wants_meeting: data.meeting ? data.meeting === "yes" : null })
      : await supabaseAdmin.from("feature_recommendations").insert(row);
    if (error) return { ok: false as const };
    return { ok: true as const };
  });