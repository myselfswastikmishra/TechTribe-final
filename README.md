
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
    *   [Homepage Content](#homepage-srccomponentshomepagecontenttsx)
    *   [Events Page](#events-srcappeventspagetsx)
    *   [FAQ Page](#faq-srcappfaqpagetsx)
    *   [Portfolio Page](#portfolio-srcappportfoliopagetsx)
    *   [Partners Page](#partners-srcapppartnerspagetsx)
*   [Understanding the Project Structure](#-project-structure)
*   [How the Forms Work: A Deep Dive](#-how-the-forms-work-a-deep-dive)

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
| **Discord Webhooks**| Sends real-time notifications to a Discord server when someone fills out a form.     |
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

    # For sending form submissions to your Discord channel
    # This is used for BOTH the contact form and the chapter application form.
    # IMPORTANT: This is a secret! Do not share it.
    DISCORD_WEBHOOK_URL="YOUR_DISCORD_WEBHOOK_URL_HERE"
    ```

> **How to get a Discord Webhook URL:**
> 1. In a Discord server where you have permissions, go to **Server Settings**.
> 2. Click on the **Integrations** tab.
> 3. Click **Webhooks**, then **New Webhook**.
> 4. Give your webhook a name (e.g., "Website Notifications"), choose the channel you want messages to be posted in, and then click **Copy Webhook URL**. Paste this URL into your `.env` file.

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

**Without these variables, your AI features and form notifications will not work on the live website.**

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

## 🔌 How the Forms Work: A Deep Dive

This website has two main forms. Understanding how they work is key to managing the site's interactive features. Both forms use a similar modern technology stack.

**Core Technologies Used:**
-   **React Hook Form:** A powerful library for managing the state of our forms. It handles what the user types, keeps track of errors, and manages the submission process.
-   **Zod:** A validation library. We use it to define a "schema" (a set of rules) for our form data. For example, a rule might be "the name must be at least 2 characters long" or "the email must be in a valid email format." React Hook Form uses this schema to automatically validate user input and show error messages.
-   **Next.js Server Actions:** This is a modern Next.js feature that allows our frontend components (running in the user's browser) to securely call backend code (running on the server) without us having to build a traditional API. The `'use server'` directive at the top of a file marks it as a Server Action.

---

### 1. The Contact Form (with Discord Notifications)

This is the form on the `/contact` page. When a user fills it out and clicks "Send Message," it sends a notification directly to a specified Discord channel using a webhook.

**End-to-End Flow:**

1.  **The User Interface (Frontend): `src/app/contact/ContactForm.tsx`**
    *   This file contains the React component for the form. It defines the layout of the input fields (Name, Email, Subject, Message).
    *   **Validation Schema (`SendMessageInputSchema`):** At the top of the file, a Zod schema defines the rules for valid data (e.g., name is required, email must be valid).
    *   **Form Management:** The `useForm` hook from `react-hook-form` is initialized with our Zod schema. This hook gives us everything we need to manage the form.
    *   **The "Send Message" Button:** This is a standard `<Button type="submit">`. When inside a `<form>` tag, clicking this button automatically triggers the `onSubmit` function defined in the form setup. It also has a `disabled` state to prevent multiple clicks while a submission is in progress.

2.  **The Submission (Client to Server): `onSubmit` function in `ContactForm.tsx`**
    *   When the user clicks "Send Message," `react-hook-form` first validates all the fields against the Zod schema. If there are errors, it prevents submission and displays the error messages.
    *   If validation passes, the `onSubmit` function is called. This function takes the form data (`values`) as an argument.
    *   Inside `onSubmit`, it calls `sendDirectMessage(values)`, which is our Server Action. The `await` keyword makes it wait for the server to respond.

3.  **The Backend Logic (Server Action): `src/app/contact/actions.ts`**
    *   This file is the backend brain for the contact form. It has the `'use server'` directive at the top.
    *   **`sendDirectMessage` function:** This function receives the form data from the frontend.
    *   **Security Check:** The first thing it does is check for the `DISCORD_WEBHOOK_URL` environment variable. If it's missing, it immediately returns an error. This is a crucial security and configuration check.
    *   **Formatting the Message:** It formats the form data into a clean, readable message structured specifically for Discord's API. This is the `discordMessage` object, which uses the "embed" format for a nice-looking notification.
    *   **Communicating with the Webhook:** It uses the standard `fetch` API to send a `POST` request to your Discord webhook URL. The formatted message is converted to a JSON string and sent in the body of the request.
    *   **Returning the Result:**
        *   If the `fetch` call is successful (Discord responds with `200 OK`), the function returns `{ success: true }`.
        *   If anything goes wrong (e.g., the webhook URL is invalid, Discord is down), the `try...catch` block catches the error, logs it to the server console for debugging, and returns `{ success: false }`.

4.  **Displaying the Result (Back to the Frontend)**
    *   Back in `ContactForm.tsx`, the `result` from the server is checked.
    *   If `result.success` is `true`, a "Message Sent!" success toast notification is displayed, and the form is cleared.
    *   If `result.success` is `false`, a "Something went wrong" error toast is displayed, allowing the user to try again.

---

### 2. The "Start a Chapter" Form (with Discord & Genkit AI)

This form on the `/chapters` page is more advanced. It also uses a Server Action, but that action then passes the data to a Genkit AI flow for processing and sends a Discord notification.

**End-to-End Flow:**

1.  **The User Interface (Frontend): `src/app/chapters/ChapterApplicationForm.tsx`**
    *   This is very similar to the contact form. It uses `react-hook-form` and a Zod schema (`ChapterApplicationFormSchema`) to manage and validate the user's input for the application.

2.  **The Submission (Client to Server): `onSubmit` function**
    *   When the "Submit Application" button is clicked, the form is validated.
    *   If valid, the `onSubmit` function calls the Server Action: `submitChapterApplication(values)`.

3.  **The Backend Logic (Server Action): `src/app/chapters/actions.ts`**
    *   This file acts as a simple bridge. It receives the data from the form.
    *   Its main job is to call another function, `chapterApplication(values)`, which is imported from our Genkit AI flow file. This keeps our UI-related server code separate from our core AI logic.

4.  **The AI Processing & Notification (Genkit Flow): `src/ai/flows/chapter-application-flow.ts`**
    *   This is where the AI-powered part of the application lives. It has the `'use server'` directive, as it's called by another server component.
    *   **`ai.defineFlow`:** This defines a Genkit "flow" named `chapterApplicationFlow`. A flow is a series of steps that can include calling AI models, talking to databases, or calling other APIs.
    *   **Discord Notification:** Just like the contact form, this flow now also sends a notification to your Discord channel. It reads the `DISCORD_WEBHOOK_URL` from your environment variables, formats the application details into a nice embed, and sends it using `fetch`.
    *   **Future Possibilities:** This is where you could add even more powerful AI features. For example, you could modify this flow to:
        *   Use an LLM to analyze the `reason` field and determine if it meets certain criteria.
        *   Save the application to a database (like Firestore).
        *   Send a customized confirmation email back to the applicant.

5.  **Displaying the Result (Back to the Frontend)**
    *   The `{ success: true }` result is passed all the way back to the `ChapterApplicationForm.tsx` component.
    *   A "Thank you for your interest" toast notification is shown, and the form is reset.
