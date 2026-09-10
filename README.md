# Aravindh B - Full Stack AI Engineer Portfolio

A high-performance, responsive personal portfolio for a Full Stack AI Engineer, built with React, Vite, Tailwind CSS, and TypeScript. It showcases end-to-end product engineering, AI systems, experience, projects, technical skills, and a printable resume.

## Resume

The portfolio includes a dedicated printable resume at [`/resume.html`](./public/resume.html). Visitors can open it from the desktop or mobile navigation and use **Print / Save PDF** to export a PDF copy.

## Tech Stack

- **Core & Routing:** [React 18](https://react.dev/) & [React Router v6](https://reactrouter.com/)
- **Build Tool:** [Vite 6](https://vite.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom premium fonts (`Amiamie` & `Instrument Serif`)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for fluid page transitions, interactive hover events, and layout entries
- **Analytics:** [@vercel/analytics](https://vercel.com/docs/analytics) for real-time web traffic insights
- **Icons:** [@iconify/react](https://iconify.design/) (official brand SVG assets) & [lucide-react](https://lucide.dev/)

## Features

- **Full Stack AI Engineer Positioning:** Portfolio metadata and hero copy clearly present Aravindh as a Full Stack AI Engineer.
- **Resume Link:** Dedicated resume entry in desktop and mobile navigation with a print-friendly resume page.
- **Typographic & CRT Grid Design:** Sleek retro layout system using dashed alignment columns, custom serif layouts, scanline overlays, and grayscale images.
- **Switchable Profile Avatar:** Rotate through different custom profile images by clicking the avatar frame directly or the quick rotate trigger icon.
- **Search Command Palette (`⌘K` / `Ctrl+K`):** Dynamic keyboard-accessible command menu with shortcuts to jump directly to page sections, external socials, or toggle themes.
- **Interactive GitHub Contributions Matrix:** Asynchronous heatmap fetching live contribution levels directly from the GitHub API using a custom React hook, displayed in a responsive 7-row calendar grid.
- **Fading Quotes Rotator:** An interactive inspiration panel in the footer cycling through selected quotes with custom fading transitions.
- **Animated Bat Cursor Follower:** A lightweight inline-SVG bat with flapping wings, smooth swooping pursuit, directional rotation, idle circling, and reduced-motion support that follows the user's pointer across the site.
- **Konami Code Easter Egg:** Listening for classic trigger keys ("anurag", "jha", or the classic Konami sequence) to activate interactive falling confetti achievements.
- **Writing / Blog Integration:** Centered grid writing section displaying technical essays and system architecture reviews synced directly to Medium.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Customization

To customize portfolio content such as titles, biography details, social URLs, projects, experience, or technical blog posts, modify [`src/config/site.ts`](./src/config/site.ts).
