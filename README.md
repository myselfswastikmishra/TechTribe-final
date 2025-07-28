
# Tech Tribe Website

Welcome to the Tech Tribe project! This document is your all-in-one guide to understanding, setting up, running, managing, and deploying this website. We've written this to be as clear as possible, even if you're new to web development.

---

## ⭐️ Table of Contents

*   [Technology Stack](#-technology-stack)
*   [Getting Started (Local Setup)](#-getting-started-local-setup)
    *   [Step 1: Set Up Environment Variables (.env file)](#step-1-set-up-environment-variables-env-file)
    *   [Step 2: Install Dependencies](#step-2-install-dependencies)
    *   [Step 3: Run the Development Servers](#step-3-run-the-development-servers)
*   [Deploying to Production](#-deploying-to-production)
*   [Managing Website Content](#-managing-website-content)
    *   [Homepage Content](#homepage-srcapphomepagecontenttsx)
    *   [Events Page](#events-srcappeventspagetsx)
    *   [FAQ Page](#faq-srcappfaqpagetsx)
    *   [Portfolio Page](#portfolio-srcappportfoliopagetsx)
    *   [Partners Page](#partners-srcapppartnerspagetsx)
*   [Understanding the Project Structure](#-project-structure)
*   [How the Forms Work](#-how-the-forms-work)

---

## 🤖 Technology Stack

This website is built with modern and powerful tools. Here's a simple breakdown of what each one does:

| Technology          | What it's used for                                                                   |
| ------------------- | ------------------------------------------------------------------------------------ |
| **Next.js & React** | The main framework for building the website's pages and user interface.                |
| **TypeScript**      | A programming language that helps prevent bugs by catching errors early.               |
| **Tailwind CSS**    | For styling the website. It lets us build beautiful designs quickly.                 |
| **ShadCN/UI**       | Provides the core building blocks for our UI, like buttons, cards, and forms.        |
| **Lucide React**    | The icon library we use for clean and consistent icons.                              |
| **Genkit (Google)** | Powers the AI features, specifically for the "Start a Chapter" application form.     |
| **Discord Webhooks**| Sends real-time notifications to a Discord server when someone fills the contact form. |
| **React Hook Form** | A library that makes it easy to manage form state and validation.                     |
| **Zod**             | Used with our forms to define what kind of input is valid (e.g., must be an email).  |

---

## 🚀 Getting Started (Local Setup)

Follow these steps to run the website on your own computer for development and testing.

### Step 1: Set Up Environment Variables (.env file)

Your project needs secret keys (API keys) to connect to external services like Google AI and Discord. You must store these keys in a special file that is kept private and not shared publicly.

1.  In the main folder of your project, create a new file and name it exactly: `.env`

2.  Open the `.env` file and add the following lines. Replace the placeholder text with your actual secret keys.

    ```
    # For Google AI features (used in the "Start a Chapter" form)
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"

    # For sending contact form submissions to your Discord channel
    # IMPORTANT: This is a secret! Do not share it.
    DISCORD_WEBHOOK_URL="YOUR_DISCORD_WEBHOOK_URL_HERE"
    ```

> **How to get a Discord Webhook URL:**
> 1. In a Discord server where you have permissions, go to **Server Settings**.
> 2. Click on the **Integrations** tab.
> 3. Click **Webhooks**, then **New Webhook**.
> 4. Give your webhook a name (e.g., "Contact Form Notifier"), choose the channel you want messages to be posted in, and then click **Copy Webhook URL**. Paste this URL into your `.env` file.

### Step 2: Install Dependencies

This command reads the `package.json` file and downloads all the necessary libraries and tools that the project needs to run.

Open your terminal and run this command:
```bash
npm install
```

### Step 3: Run the Development Servers

The project has two parts that need to run at the same time in two separate terminals.

**Terminal 1: Start the Next.js Website**
This command starts the main website.
```bash
npm run dev
```
Once it's running, you can view the website at `http://localhost:9002`.

**Terminal 2: Start the Genkit AI Service**
This command starts the backend AI service that processes the "Start a Chapter" form.
```bash
npm run genkit:watch
```
You should keep this terminal open to see logs from your AI flows.

---

## 🌐 Deploying to Production

When you are ready to make your website live on the internet, you'll use a hosting provider like **Netlify** or **Vercel**.

### 1. Connect Your Repository

In your hosting provider's dashboard, create a new site and connect it to your GitHub/GitLab/Bitbucket repository where your code is stored.

### 2. Build Configuration

Most providers will auto-detect that this is a Next.js project. If you need to set them manually, use:
- **Build Command:** `npm run build`
- **Publish Directory:** `.next`

The `netlify.toml` file in this project pre-configures this for Netlify.

### 3. **CRITICAL:** Set Production Environment Variables

The `.env` file is only for local development and is not uploaded with your code. For the live website to work, you **must** set your secret keys in your hosting provider's settings.

In your site's dashboard (e.g., on Netlify: `Site settings > Build & deploy > Environment`), add the following variables:

-   `GEMINI_API_KEY` - Set this to your Google AI API key.
-   `DISCORD_WEBHOOK_URL` - Set this to your Discord Webhook URL.

**Without these variables, your AI features and contact form will not work on the live website.**

### 4. Trigger Deployment

Your site will automatically build and deploy whenever you push changes to your main branch. You can also trigger a manual deploy from your provider's dashboard.

---

## ✍️ Managing Website Content

You don't need a database to update this site's content. Most content is stored in simple lists (arrays) directly in the code. To edit content, find the correct file and modify the text inside the quotes.

### Homepage (`src/components/HomePageContent.tsx`)
This file controls everything on the homepage.
-   **Image Gallery:** Find the `galleryImages` array to change image URLs and descriptions.
-   **Services & Projects:** Edit the `services` and `featuredProjects` arrays.
-   **Testimonials:** Modify the `testimonials` array to update client quotes.
-   **Stats:** Change the numbers and labels in the `stats` array.

### Events (`src/app/events/page.tsx`)
-   Find the `events` array at the top of the file. Each item in the list is an event card.

### FAQ (`src/app/faq/page.tsx`)
-   Find the `faqs` array. Each item has a `question` and an `answer`.

### Portfolio (`src/app/portfolio/page.tsx`)
-   Modify the `portfolioItems` and `testimonials` arrays.

### Partners (`src/app/partners/page.tsx`)
-   Edit the `companyPartners` and `universityChapters` arrays to manage logos.

### Customizing Colors (`src/app/globals.css`)
-   Open `src/app/globals.css`. At the top, you'll find `:root { ... }` (for light mode) and `.dark { ... }` (for dark mode).
-   Change the HSL values for variables like `--primary`, `--background`, and `--accent` to change the site's color scheme.

---

## 📂 Project Structure

Here's a map of the most important files and folders:

-   `src/app/`: The core of the website. Each folder is a page.
    -   `page.tsx`: The homepage.
    -   `contact/`, `events/`, `faq/`, etc.: Folders for each page.
    -   `layout.tsx`: The main template for the site (includes header and footer).
    -   `globals.css`: The main stylesheet for colors, fonts, and global styles.

-   `src/components/`: Reusable building blocks (React components).
    -   `layout/`: Contains the `Header.tsx` and `Footer.tsx`.
    -   `ui/`: Components from ShadCN (Button, Card, etc.).
    -   `HomePageContent.tsx`: The component that assembles the homepage.

-   `src/ai/`: Contains the Genkit AI logic.
    -   `flows/chapter-application-flow.ts`: The backend logic for the university chapter application form.

-   `package.json`: Lists all project dependencies and custom `npm` scripts.
-   `netlify.toml`: Configuration file for deploying to Netlify.

---

## 🔌 How the Forms Work

### 1. Contact Form (Discord Notification)
-   **Frontend:** `src/app/contact/ContactForm.tsx`
-   **Backend Logic:** `src/app/contact/actions.ts`
-   **How it works:** When a user submits the form, the `sendDirectMessage` function in `actions.ts` is called. It formats the data and sends it directly to the Discord channel specified by your `DISCORD_WEBHOOK_URL`.

### 2. "Start a Chapter" Form (Genkit AI)
-   **Frontend:** `src/app/chapters/ChapterApplicationForm.tsx`
-   **Backend Logic:** `src/ai/flows/chapter-application-flow.ts`
-   **How it works:** This form submission is processed by a Genkit AI flow. Currently, it just logs the application data to your Genkit terminal (`npm run genkit:watch`). This can be extended to perform AI-based eligibility checks, save to a database, and more.
