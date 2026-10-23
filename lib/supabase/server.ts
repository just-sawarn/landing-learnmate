import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * True when a Supabase session cookie belongs to a valid user. Falls back to `false`
 * (signed out) when the env vars are missing or Supabase is unreachable.
 */
export async function isSignedIn(): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return false;

  // Awaited outside the try/catch: with Cache Components this call must be allowed to suspend.
  const store = await cookies();
  try {
    const supabase = createServerClient(url, key, {
      cookies: { getAll: () => store.getAll(), setAll: () => {} },
    });
    const { data } = await supabase.auth.getUser();
    return Boolean(data.user);
  } catch {
    return false;
  }
}
