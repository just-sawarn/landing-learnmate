"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DASHBOARD_HREF, SIGN_IN_HREF, TRY_HREF, finalCta, hero, nav } from "./content";

type AuthState = { signedIn: boolean; setSignedIn: (v: boolean) => void };
const AuthContext = createContext<AuthState>({ signedIn: false, setSignedIn: () => {} });

/** The page shell is static; the server streams a tiny `SignedInFlag` in when a session exists. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  const value = useMemo(() => ({ signedIn, setSignedIn }), [signedIn]);
  return <AuthContext value={value}>{children}</AuthContext>;
}

export function SignedInFlag() {
  const { setSignedIn } = useContext(AuthContext);
  useEffect(() => setSignedIn(true), [setSignedIn]);
  return null;
}

/** Labels and targets for every primary call to action. */
export function useCta() {
  const { signedIn } = useContext(AuthContext);
  return {
    signedIn,
    signInHref: SIGN_IN_HREF,
    nav: { label: signedIn ? nav.ctaSignedIn : nav.cta, href: signedIn ? DASHBOARD_HREF : SIGN_IN_HREF },
    hero: { label: signedIn ? hero.primarySignedIn : hero.primary, href: signedIn ? DASHBOARD_HREF : TRY_HREF },
    final: {
      label: signedIn ? finalCta.buttonSignedIn : finalCta.button,
      href: signedIn ? DASHBOARD_HREF : SIGN_IN_HREF,
    },
  };
}
