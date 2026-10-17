import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { requestSchema } from "@/lib/request-schema";
import { submitRequest } from "@/lib/requests.functions";

export function RequestForm({ kind }: { kind: "api" | "recommendation" }) {
  const send = useServerFn(submitRequest);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string; form?: string }>({});
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const parsed = requestSchema.safeParse({ kind, name: fields.get("name"), email: fields.get("email"), message: fields.get("message"), meeting: fields.get("meeting") ?? undefined, website: fields.get("website") });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map(issue => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    setPending(true);
    try {
      const result = await send({ data: parsed.data });
      if (!result.ok) throw new Error("Submission failed");
      setSuccess(true);
      form.reset();
    } catch {
      setErrors({ form: "Your request couldn't be saved. Please try again." });
    } finally { setPending(false); }
  }
  if (success) return <div role="status" className="flex items-start gap-3 border-l-2 border-primary bg-card p-6"><CheckCircle2 className="shrink-0 text-primary" /><div><p className="font-semibold">{kind === "api" ? "Request received." : "Recommendation received."}</p><p className="mt-2 text-sm text-muted-foreground">Thank you — your submission has been saved.</p><Button variant="link" className="mt-3 px-0" onClick={() => setSuccess(false)}>Send another</Button></div></div>;
  return <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label={kind === "api" ? "API access request" : "Feature recommendation"}>
    <div className="grid gap-5 sm:grid-cols-2">
      {(["name", "email"] as const).map(field => <div key={field} className="space-y-2"><Label htmlFor={`${kind}-${field}`}>{field === "name" ? "Name" : "Email"}</Label><Input id={`${kind}-${field}`} name={field} type={field === "email" ? "email" : "text"} autoComplete={field} maxLength={field === "name" ? 100 : 255} required aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${kind}-${field}-error` : undefined} className="h-12 bg-background" />{errors[field] && <p id={`${kind}-${field}-error`} className="text-sm text-destructive">{errors[field]}</p>}</div>)}
    </div>
    <div className="space-y-2"><Label htmlFor={`${kind}-message`}>{kind === "api" ? "What data or custom tool do you need?" : "Your recommendation"}</Label><Textarea id={`${kind}-message`} name="message" maxLength={2000} required rows={5} className="bg-background" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${kind}-message-error` : undefined} />{errors.message && <p id={`${kind}-message-error`} className="text-sm text-destructive">{errors.message}</p>}</div>
    {kind === "api" && <fieldset className="grid gap-3 border border-border bg-card p-5"><legend className="px-1 text-sm font-semibold">Would you like us to contact you to arrange a meeting?</legend><div className="flex flex-wrap gap-6">{(["yes", "no"] as const).map(option => <label key={option} className="flex items-center gap-2 text-sm"><input type="radio" name="meeting" value={option} className="size-4 accent-primary" />{option === "yes" ? "Yes" : "No"}</label>)}</div></fieldset>}
    <div hidden aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
    {errors.form && <p role="alert" className="text-sm text-destructive">{errors.form}</p>}
    <Button type="submit" disabled={pending} className="h-12 w-full sm:w-auto sm:px-8">{pending ? <Loader2 className="animate-spin" /> : <ArrowUpRight />}{pending ? "Sending…" : kind === "api" ? "Send request" : "Send recommendation"}</Button>
  </form>;
}