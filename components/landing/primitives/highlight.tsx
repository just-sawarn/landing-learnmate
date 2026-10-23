import type { ReactNode } from "react";

export type Lang = "python" | "js" | "cpp" | "java" | "jsx" | "plain";
type Kind = "kw" | "str" | "num" | "com" | "fn" | "plain";

const KEYWORDS = new Set([
  "for",
  "in",
  "if",
  "else",
  "while",
  "def",
  "return",
  "class",
  "import",
  "from",
  "const",
  "let",
  "var",
  "function",
  "public",
  "static",
  "void",
  "int",
  "new",
  "include",
  "using",
  "namespace",
  "System",
]);

/** Slate-only shades. Keywords gain weight instead of colour. */
const KIND_CLASS: Record<Kind, string> = {
  kw: "font-semibold text-ink",
  str: "text-[#475569]",
  num: "text-[#475569]",
  com: "text-muted italic",
  fn: "text-[#1E293B] underline decoration-[#94A3B8]/60 underline-offset-[3px]",
  plain: "text-ink-2",
};

const TOKEN =
  /(\/\/.*|#(?!include).*)|("(?:[^"\\]|\\.)*"?|'(?:[^'\\]|\\.)*'?|`(?:[^`\\]|\\.)*`?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_#][\w]*)|(\s+)|(.)/g;

type Token = { text: string; kind: Kind };

export function tokenize(line: string, lang: Lang): Token[] {
  const out: Token[] = [];
  for (const m of line.matchAll(TOKEN)) {
    const [text, com, str, num, word] = m;
    if (com && (lang === "python" ? com.startsWith("#") : com.startsWith("//"))) out.push({ text, kind: "com" });
    else if (str) out.push({ text, kind: "str" });
    else if (num) out.push({ text, kind: "num" });
    else if (word) {
      const next = line[(m.index ?? 0) + text.length];
      if (KEYWORDS.has(word.replace("#", ""))) out.push({ text, kind: "kw" });
      else if (next === "(") out.push({ text, kind: "fn" });
      else out.push({ text, kind: "plain" });
    } else out.push({ text, kind: "plain" });
  }
  return out;
}

/** Renders one line, optionally with a blinking caret at column `caret`. */
export function renderLine(line: string, lang: Lang, caret: number | null): ReactNode[] {
  const nodes: ReactNode[] = [];
  let pos = 0;
  let placed = false;
  const caretNode = <span key="caret" className="lm-caret" aria-hidden="true" />;
  tokenize(line, lang).forEach((tok, i) => {
    const end = pos + tok.text.length;
    if (caret !== null && !placed && caret > pos && caret < end) {
      const cut = caret - pos;
      nodes.push(
        <span key={`${i}a`} className={KIND_CLASS[tok.kind]}>
          {tok.text.slice(0, cut)}
        </span>,
        caretNode,
        <span key={`${i}b`} className={KIND_CLASS[tok.kind]}>
          {tok.text.slice(cut)}
        </span>,
      );
      placed = true;
    } else {
      if (caret !== null && !placed && caret === pos) {
        nodes.push(caretNode);
        placed = true;
      }
      nodes.push(
        <span key={i} className={KIND_CLASS[tok.kind]}>
          {tok.text}
        </span>,
      );
    }
    pos = end;
  });
  if (caret !== null && !placed) nodes.push(caretNode);
  return nodes;
}
