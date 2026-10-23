import { isSignedIn } from "@/lib/supabase/server";
import { SignedInFlag } from "./auth-context";

/** Reads the Supabase session on the server; renders nothing when signed out. */
export async function SessionProbe() {
  return (await isSignedIn()) ? <SignedInFlag /> : null;
}
