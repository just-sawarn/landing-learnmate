"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCta } from "./auth-context";
import { nav } from "./content";
import { Wordmark } from "./logo";
import { EASE, enter, stagger } from "./motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 24], [0, 1]);
  const cta = useCta();

  return (
    <header className="sticky top-0 z-50">
      <motion.div
        aria-hidden="true"
        style={{ opacity: bg }}
        className="absolute inset-0 border-b border-line bg-bg/85 backdrop-blur-md"
      />
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6"
      >
        <Link href="/" aria-label="LearnMate home" className="rounded-md">
          <Wordmark />
        </Link>
        <ul className="m-0 hidden list-none items-center gap-1 p-0 md:flex">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[15px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {!cta.signedIn && (
            <Link
              href={'http://localhost:3000/dashboard'}
              className="hidden rounded-full px-3.5 py-2 text-[15px] text-ink-2 transition-colors hover:text-ink sm:block"
            >
              {nav.signIn}
            </Link>
          )}
          <Link
            href={cta.nav.href}
            className="rounded-full bg-ink px-4 py-2 text-[15px] font-medium text-bg transition-transform hover:-translate-y-px active:translate-y-0"
          >
            {cta.nav.label}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink md:hidden"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="absolute inset-x-0 top-16 border-b border-line bg-bg px-4 pb-6 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <motion.ul variants={stagger(0.06, 0.05)} initial="hidden" animate="show" className="m-0 list-none p-0">
              {[...nav.links, ...(cta.signedIn ? [] : [{ label: nav.signIn, href: cta.signInHref }])].map((l) => (
                <motion.li key={l.href} variants={enter} className="border-b border-line last:border-0">
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-3.5 text-lg font-medium text-ink">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
