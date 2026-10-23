/** All landing-page copy lives here so it can be edited in one place. */

export const SIGN_IN_HREF = "/login";
export const TRY_HREF = "/login?next=/dashboard";
export const DASHBOARD_HREF = "/dashboard";

export const nav = {
  links: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Guru", href: "#guru" },
    { label: "FAQ", href: "#faq" },
  ],
  signIn: "Sign in",
  cta: "Try LearnMate",
  ctaSignedIn: "Go to dashboard",
};

export const hero = {
  eyebrow: "Built for Equinox 2026 · Gemini × Claude × Groq",
  headline: ["Your", "textbook,", "turned", "into", "lessons", "you", "can", "run."],
  underlineWord: "run.",
  sub: "Upload a PDF. LearnMate turns it into animated explainer videos, hands-on coding exercises in a real IDE, and Guru, a tutor who teaches by asking the right question.",
  primary: "Try it with a sample chapter",
  primarySignedIn: "Go to dashboard",
  secondary: "Watch how it works",
  proof: [
    { icon: "page", text: "Every explanation cites its page" },
    { icon: "code", text: "Runs Python, JS, React, C++, Java and more" },
    { icon: "help", text: "Never hands you the answer first" },
  ],
  demoSummary:
    "Product demo: a PDF is uploaded and split into five topics. A Python for-loop lesson plays with a variable box counting from 0 to 4. At a checkpoint an IDE opens, a test fails, Guru asks a question citing page 6, the code is fixed, all three tests pass and Loops moves from weak to strong.",
};

export const trust = {
  label: "Powered by",
  items: [
    { name: "Gemini", role: "builds your lessons and quizzes" },
    { name: "Claude", role: "Guru, your tutor" },
    { name: "Groq", role: "instant tips" },
    { name: "Supabase", role: "your account and files" },
  ],
};

export const problem = {
  eyebrow: "The problem",
  lead: "You have the notes. You don't know what you don't know.",
  struck: ["Re-reading the same chapter", "Copy-pasting into a chatbot", "Watching someone else code"],
  resolution: "LearnMate makes you do it, and shows you exactly where you're stuck.",
};

export const features = {
  eyebrow: "Features",
  title: "Everything a great tutor does, from one PDF.",
  tiles: [
    {
      id: "lessons",
      title: "Animated explainer lessons",
      body: "Code types itself in, variables update, a token walks the flowchart. Narrated, captioned, sourced.",
    },
    {
      id: "ide",
      title: "Run real code beside the lesson",
      body: "A side-along IDE with Run and Check (hidden tests) in eight languages.",
    },
    {
      id: "guru",
      title: "Guru teaches, doesn't tell",
      body: "Three rungs of hints. The solution stays locked until you've asked twice.",
    },
    {
      id: "cites",
      title: "Every answer cites its page",
      body: "Explanations point back to the exact page of your material.",
    },
    { id: "honest", title: "Honest when it doesn't know", body: "Anything outside your upload is clearly labelled." },
    {
      id: "quiz",
      title: "Diagnostic quiz, weak topics found",
      body: "A short quiz sorts your topics from weakest to strongest.",
    },
    { id: "plan", title: "A plan that adapts", body: "Your revision plan updates from v1 to v2 as mastery changes." },
    {
      id: "progress",
      title: "Progress across attempts",
      body: "Every attempt is saved, so you can see yourself improve.",
    },
    {
      id: "tips",
      title: "Instant tips while you type",
      body: "Quick Groq tips in under two seconds, plus plain-English error translations.",
    },
    {
      id: "hindi",
      title: "Hindi and spoken summaries",
      body: "Switch captions to Hindi and listen to a spoken summary.",
    },
  ],
};

export const how = {
  eyebrow: "How it works",
  title: "From PDF to “I get it” in four steps.",
  steps: [
    {
      title: "Upload your material",
      body: "Drop in a PDF of up to 20 pages. LearnMate reads it, finds the topics and builds exercises.",
    },
    {
      title: "Watch it come alive",
      body: "Each topic becomes an animated lesson: code types in, variables tick, every scene shows its source page.",
    },
    {
      title: "Try it yourself",
      body: "At every “Your turn” checkpoint an IDE slides in. Run your code, Check it against hidden tests, and let Guru ask the right question.",
    },
    {
      title: "Watch your plan change",
      body: "Mastery updates, weak topics reorder, and your revision plan moves from v1 to v2.",
    },
  ],
  checklist: ["Reading pages", "Finding topics", "Building exercises"],
};

export const guru = {
  eyebrow: "Meet Guru",
  title: "A tutor that asks before it tells.",
  manifesto: [
    "A master tutor who can teach anything to anyone.",
    "Learns what you already know.",
    "Explains with everyday analogies.",
    "Prefers a good question to an answer.",
    "Celebrates your progress specifically.",
  ],
  chat: [
    { from: "student", text: "why does range stop before 5?" },
    {
      from: "guru",
      text: "Think of a fence: range(5) hands you five posts, numbered from 0, so the last one is 4. The 5 marks where the fence ends, not a post. (p. 6)",
    },
    { from: "student", text: "so range(1, 5) skips post 0?" },
    { from: "guru", text: "Exactly. You spotted the off-by-one yourself. Now run it again." },
  ],
  looked: "What Guru looked at",
  lookedItems: "p. 6 · your code · 2 failing tests",
};

export const marquee = {
  rows: [
    ["Python", "JavaScript", "TypeScript", "HTML", "CSS", "React"],
    ["C", "C++", "Java", "Go", "Rust", "Python"],
  ],
};

export const faq = {
  eyebrow: "FAQ",
  title: "Questions, answered.",
  items: [
    { q: "What can I upload?", a: "A PDF of up to 20 pages, or pasted text." },
    {
      q: "Which languages can I run?",
      a: "HTML/CSS/JS, React, Python, C, C++, Java, Go and Rust, all in the side-along IDE.",
    },
    {
      q: "Will Guru just give me the answer?",
      a: "No. Guru climbs a three-rung hint ladder, starting with a guiding question, and only shows a partial fix after you've asked twice.",
    },
    {
      q: "What happens if my question isn't in my notes?",
      a: "Guru still helps, but labels the reply “Beyond your uploaded material” so you know it isn't from your source.",
    },
    { q: "Does it work in Hindi?", a: "Yes. Captions can switch to Hindi, and there are spoken summaries." },
    {
      q: "Is my material private?",
      a: "It's stored in your own Supabase account and protected by row-level security.",
    },
  ],
};

export const finalCta = {
  title: "Stop re-reading. Start doing.",
  button: "Upload your first chapter",
  buttonSignedIn: "Go to dashboard",
};

export const footer = {
  description: "Turn your study material into lessons you can run.",
  built: "Built in 24 hours at Equinox 2026",
  links: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Sign in", href: SIGN_IN_HREF },
  ],
  credits: "Gemini · Claude · Groq · Supabase",
};

export const seo = {
  title: "LearnMate: turn your study material into lessons you can run",
  description:
    "Upload a PDF and LearnMate builds animated explainer lessons, a side-along IDE that runs real code, and Guru, a tutor that teaches by asking the right question.",
};
