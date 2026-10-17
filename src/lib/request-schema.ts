import { z } from "zod";

const safeText = (limit: number) => z.string().trim().min(1, "This field is required.").max(limit, `Use at most ${limit} characters.`).refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value), "Remove unsupported characters.");

export const requestSchema = z.object({
  kind: z.enum(["api", "recommendation"]),
  name: safeText(100),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  message: safeText(2000),
  meeting: z.enum(["yes", "no"]).optional(),
  website: z.string().max(0, "Unable to submit this request.").default(""),
}).strict();

export const PROGRAM_URL = "https://memewalletscan.com";