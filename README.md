# Tech Tribe Website

Welcome to the Tech Tribe project repository. This document provides a comprehensive guide to understanding, running, and managing the website.

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Environment Variables

This project uses Genkit to interact with the Google Gemini AI and Discord for contact form notifications. You'll need API keys for these services.

**You must create a file named `.env` in the root of the project for local development.** This file is for your secret keys and is not checked into version control.

1.  Create a file named `.env` in the root of the project.
2.  Add your Google AI API key and your Discord Webhook URL to this new `.env` file. It should look like this:
    ```
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
    DISCORD_WEBHOOK_URL="YOUR_DISCORD_WEBHOOK_URL_HERE"
    ```

> **How to get a Discord Webhook URL:**
> 1. In a Discord server where you have permissions, go to **Server Settings**.
> 2. Click on the **Integrations** tab.
> 3. Click **Webhooks**, then **New Webhook**.
> 4. Give your webhook a name (e.g., "Contact Form Notifier"), choose the channel you want messages to be posted in, and then click **Copy Webhook URL**.

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

This will start the website on `http://localhost:9002`. The `npm run dev` command is configured to automatically load the variables from your `.env` file.

**Terminal 2: Start the Genkit AI Service**

```bash
npm run genkit:watch
```

This service powers the "Start a Chapter" form. Any form submissions will be processed by Genkit and logged in this terminal.

---

## 🚀 Deploying to Production (e.g., Netlify)

Follow these steps to deploy the fullstack application to a hosting provider like Netlify.

### 1. Connect Your Repository

In your hosting provider's dashboard (e.g., Netlify), create a new site and connect it to your GitHub/GitLab/Bitbucket repository.

### 2. Set Build Configuration

Most modern hosting providers will automatically detect that this is a Next.js project and configure the build settings correctly. If you need to set them manually, use:
- **Build Command:** `npm run build`
- **Publish Directory:** `.next`

For Netlify, the included `netlify.toml` file handles this automatically.

### 3. Set Production Environment Variables

This is the most important step for a successful deployment. In your site's settings on your hosting provider, find the section for Environment Variables (e.g., on Netlify: `Site settings > Build & deploy > Environment`).

You must add the following variables:

-   `GEMINI_API_KEY` - Set this to your Google AI API key.
-   `DISCORD_WEBHOOK_URL` - Set this to your Discord Webhook URL.

**This is critical.** The live website will not be able to process chapter applications or send contact form notifications without these variables.

### 4. Trigger Deployment

Netlify (and similar platforms) will automatically build and deploy your site whenever you push changes to your main branch. You can also trigger a manual deploy from the dashboard.

Your Next.js frontend and Genkit AI backend will now be deployed and managed by your hosting provider.

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
-   **AI Backend:** **Genkit** (from Google) powers the backend logic for the university chapter application form.
-   **Notifications:** **Discord Webhooks** for sending contact form submissions to a Discord channel.
-   **Animations:** The site uses a combination of `tailwindcss-animate` and custom React hooks (`DynamicText`, `StatsCounter`) for UI animations.

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

## 🤖 Backend (Forms)

The forms on this website use two different mechanisms for processing submissions.

### 1. Contact Form (Discord Notification)

1.  **Form Component (`src/app/contact/ContactForm.tsx`):** Defines the form fields and validation rules.
2.  **Server Action (`src/app/contact/actions.ts`):** The `sendDirectMessage` function takes the form data, formats it into a message, and sends it to your Discord server using your configured webhook URL.
3.  **Result:** The message appears instantly in your Discord channel.

### 2. "Start a Chapter" Form (Genkit)

This form uses Genkit to process the data.

1.  **Form:** `src/app/chapters/ChapterApplicationForm.tsx`
2.  **Server Action:** `src/app/chapters/actions.ts`
3.  **AI Flow:** `src/ai/flows/chapter-application-flow.ts` (This flow logs all application data to the Genkit terminal when you run `npm run genkit:watch`).

---

## 🎨 Customizing the Look & Feel

### Main Color Scheme (`src/app/globals.css`)

1.  Open `src/app/globals.css`.
2.  At the top, find the `:root { ... }` section for the light theme and `.dark { ... }` for the dark theme.
3.  Modify the HSL values for CSS variables like `--primary`, `--background`, and `--accent` to change the website's color palette.
