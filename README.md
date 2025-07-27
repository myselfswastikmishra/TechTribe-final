# Tech Tribe Website

Welcome to the Tech Tribe project repository. This document provides a comprehensive guide to understanding, running, and managing the website.

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Environment Variables

This project uses Genkit to interact with the Google Gemini AI for form processing and Resend to send emails. You'll need API keys for these services to be enabled.

1.  Create a file named `.env` in the root of the project.
2.  Add your Google AI API key and your Resend API key to the `.env` file:
    ```
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    RESEND_API_KEY=YOUR_RESEND_API_KEY_HERE
    ```
> **Note on Pricing:** 
> - The Genkit framework is free and open-source. The Google Gemini API has a generous free tier, and for the form processing in this project, your usage will very likely be well within the free limits.
> - Resend also offers a free tier that is sufficient for this project's contact form. You only pay for what you use beyond the free tiers.

### 2. Install Dependencies

Install all the necessary libraries using npm:

```bash
npm install
```

### 3. Run the Development Servers

The project requires two services to be running simultaneously in separate terminals: the Next.js frontend and the Genkit AI backend.

**Terminal 1: Start the Next.js Frontend**

```bash
npm run dev
```

This will start the website on `http://localhost:9002`.

**Terminal 2: Start the Genkit AI Service**

```bash
npm run genkit:watch
```

This service powers the "Contact Us" and "Start a Chapter" forms. Any form submissions will be processed by Genkit and logged in this terminal. When an email is sent, you will see a confirmation here.

---

## 🚀 Deploying to Netlify

Follow these steps to deploy the fullstack application to Netlify.

### 1. Create a `netlify.toml` file

Create a new file named `netlify.toml` in the root of your project. This file tells Netlify how to build and deploy your site, including the Genkit flows.

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[dev]
  # This is the command that will be run when you use `netlify dev`
  command = "npm run dev"
  # The port for the Next.js development server
  port = 9002
  # The port for the Genkit development server
  targetPort = 4000

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/__/*"
  to = "/__/*"
  status = 200
```

### 2. Configure Your Netlify Site

1.  **Connect Your Repository:** In your Netlify dashboard, create a new site and connect it to your GitHub/GitLab/Bitbucket repository.
2.  **Set Environment Variables:** In your site's settings on Netlify (`Site settings > Build & deploy > Environment`), add your `GEMINI_API_KEY` and `RESEND_API_KEY`. This is crucial for the AI flows to work in production.
3.  **Trigger Deployment:** Netlify will automatically build and deploy your site whenever you push changes to your main branch. You can also trigger a manual deploy from the Netlify dashboard.

Your Next.js frontend and Genkit AI backend will now be deployed and managed by Netlify.

---

## 🛠️ Technology Stack

This project is built with a modern, performance-focused technology stack:

-   **Framework:** **Next.js** (v15) with the App Router for server-centric routing and rendering.
-   **Language:** **TypeScript** for robust, type-safe code.
-   **UI Library:** **React** (v18) for building interactive user interfaces.
-   **Styling:** **Tailwind CSS** for a utility-first styling workflow, customized via `src/app/globals.css`.
-   **UI Components:** **ShadCN/UI** provides a set of accessible, unstyled components that we've tailored to the site's theme.
-   **Icons:** **Lucide React** for a comprehensive and consistent set of SVG icons.
-   **Forms:** **React Hook Form** for managing form state and **Zod** for powerful schema-based validation.
-   **AI Backend:** **Genkit** (from Google) powers the backend logic for forms, using the **Gemini AI** model to process submissions.
-   **Email:** **Resend** for sending transactional emails from the contact form.
-   **Animations:** The site uses a combination of `tailwindcss-animate` and custom React hooks (`DynamicText`, `StatsCounter`) for UI animations.

---

## 📚 Learning Path

If you're new to this stack, here’s a recommended learning path to get you comfortable with the codebase.

### 1. Foundational Knowledge
Before diving in, make sure you have a solid grasp of web development fundamentals.
-   **HTML, CSS, and JavaScript (ES6+):** The building blocks of the web.
-   **Basic Command-Line/Terminal Usage:** Essential for running the project and managing dependencies.

### 2. Core Frontend (React & Next.js)
This is the heart of the application.
-   **React:** Start with the official React documentation. Focus on:
    -   **Components, Props, and State:** How to build and manage UI elements.
    -   **Hooks:** Specifically `useState` and `useEffect`, which are used extensively.
    -   **JSX Syntax:** The syntax used to write components.
-   **Next.js:** Once you're comfortable with React, move on to the Next.js documentation.
    -   **App Router:** Understand file-based routing (pages, layouts, loading states).
    -   **Server Components vs. Client Components:** This is a key concept. Know when to use `'use client'`.
    -   **Built-in Components:** Learn how `next/link` (for navigation) and `next/image` (for image optimization) work.

### 3. Styling & UI
-   **Tailwind CSS:** Get familiar with the utility-first approach. The official documentation has excellent interactive tutorials. You don't need to memorize classes, just understand the concept.
-   **ShadCN/UI:** Read the "Introduction" and "Theming" sections of the documentation. Understand that you can directly modify the component files in `src/components/ui/`.

### 4. Forms & AI
-   **React Hook Form & Zod:** Review the "Get Started" guides for both libraries. See how they work together in `ContactForm.tsx` or `ChapterApplicationForm.tsx` to manage state and validate data.
-   **Genkit & Resend:** The `src/ai/flows` directory contains the backend logic. Read the code in `send-message-flow.ts` to see how it receives data from the frontend, uses a prompt to format an email with Gemini, and then uses Resend to send the actual email.

---

## 📂 Project Structure

-   `src/app/` - The core of the website, following the Next.js App Router structure. Each folder typically corresponds to a page.
    -   `page.tsx`: The homepage.
    -   `contact/page.tsx`: The "Contact Us" page.
    -   `chapters/page.tsx`: The "Start a Chapter" page.
    -   `events/page.tsx`: The "Events" page.
    -   `faq/page.tsx`: The "FAQ" page.
    -   `partners/page.tsx`: The "Our Partners" page.
    -   `portfolio/page.tsx`: The "Our Work" portfolio page.
    -   `services/page.tsx`: The "Services" page.
    -   `sponsors/page.tsx`: The "Sponsors" page.
    -   `layout.tsx`: The main site template, including the header and footer.
    -   `globals.css`: The stylesheet for global colors, fonts, and theme variables.

-   `src/components/` - Contains all reusable React components.
    -   `layout/`: `Header.tsx` and `Footer.tsx`.
    -   `ui/`: Pre-built UI elements from ShadCN (e.g., `Button.tsx`, `Card.tsx`).
    -   `icons/`: Custom SVG icon components (`DiscordIcon.tsx`, `WhatsappIcon.tsx`).
    -   `DynamicText.tsx`: The animated "We are..." text on the homepage.
    -   `StatsCounter.tsx`: The animated number counter on the homepage.

-   `src/ai/` - Contains the Genkit AI logic.
    -   `genkit.ts`: Configures the connection to the Gemini AI model.
    -   `flows/`: Defines the backend logic for forms.
        -   `send-message-flow.ts`: Handles "Contact Us" form submissions and sends an email via Resend.
        -   `chapter-application-flow.ts`: Handles new university chapter applications.

-   `package.json`: Lists all project dependencies and custom scripts.
-   `netlify.toml`: Configuration file for deploying to Netlify.

---

## ✨ Managing Page Content

Most of the website's content is managed through simple arrays directly within the page files. This makes updates quick and easy without needing a separate CMS. An array is a list of items inside `[ ... ]`, where each item is a JavaScript object enclosed in `{ ... }`.

-   **To add an item:** Copy an existing `{...}` block (including the comma after it) and modify the text and values.
-   **To remove an item:** Delete the entire `{...}` block (and its trailing comma).
-   **To edit an item:** Change the text within the quotes for the desired property (e.g., `title`).

---

### Homepage (`src/app/page.tsx`)

This page's content is composed within `src/components/HomePageContent.tsx`.

-   **Image Gallery:** Edit the `galleryImages` array to change image URLs (`src`), alt text (`alt`), and AI hints (`hint`).
-   **Services & Projects:** Update the `services` and `featuredProjects` arrays to manage content in these sections.
-   **Testimonials:** Modify the `testimonials` array to manage client quotes.
-   **Stats:** Update the `stats` array to change the values and labels in the "Impact in Numbers" section.

### Events (`src/app/events/page.tsx`)

1.  Open `src/app/events/page.tsx`.
2.  Find the `events` array at the top of the file.
3.  Add, remove, or edit objects in this array to manage the events listings. Each object corresponds to one event card.

### FAQ (`src/app/faq/page.tsx`)

1.  Open `src/app/faq/page.tsx`.
2.  Find the `faqs` array at the top.
3.  Each object has a `question` and an `answer`. Edit this list to manage the FAQ section.

### Portfolio (`src/app/portfolio/page.tsx`)

1.  Open `src/app/portfolio/page.tsx`.
2.  Modify the `portfolioItems` and `testimonials` arrays to manage the project listings and client quotes.

### Partners (`src/app/partners/page.tsx`)

1.  Open `src/app/partners/page.tsx`.
2.  Edit the `companyPartners` and `universityChapters` arrays to manage the logos and names displayed.

---

## 🤖 AI Backend (Forms)

The forms on this website use Genkit to process submissions on the backend.

### 1. Contact Form

1.  **Form Component (`src/app/contact/ContactForm.tsx`):** Defines the form fields and validation rules.
2.  **Server Action (`src/app/contact/actions.ts`):** The `sendDirectMessage` function passes the form data to the Genkit flow.
3.  **AI Flow (`src/ai/flows/send-message-flow.ts`):**
    -   Receives the data.
    -   Uses an AI prompt to format the data into an email body and subject line.
    -   Uses **Resend** to send the formatted email to your inbox.
    -   The result is logged to the Genkit terminal (`npm run genkit:watch`).

### 2. "Start a Chapter" Form

This form follows the same pattern, but does not send an email.

1.  **Form:** `src/app/chapters/ChapterApplicationForm.tsx`
2.  **Server Action:** `src/app/chapters/actions.ts`
3.  **AI Flow:** `src/ai/flows/chapter-application-flow.ts` (This flow logs all application data to the Genkit terminal).

---

## 🎨 Customizing the Look & Feel

### Main Color Scheme (`src/app/globals.css`)

1.  Open `src/app/globals.css`.
2.  At the top, find the `:root { ... }` section for the light theme and `.dark { ... }` for the dark theme.
3.  Modify the HSL values for CSS variables like `--primary`, `--background`, and `--accent` to change the website's color palette.
