# Tech Tribe Website

Welcome to the Tech Tribe project! This document is your all-in-one guide to understanding, setting up, running, managing, and deploying this website. We've written this to be as clear as possible, even if you're new to web development.

---

## ⭐️ Table of Contents

*   [Technology Stack](#-technology-stack)
*   [Getting Started (Local Setup)](#-getting-started-local-setup)
    *   [How Secret Keys Are Handled](#how-secret-keys-are-handled)
    *   [Step 1: Install Dependencies](#step-1-install-dependencies)
    *   [Step 2: Run the Development Servers](#step-2-run-the-development-servers)
*   [Deploying to Production](#-deploying-to-production)
*   [Managing Website Content](#-managing-website-content)
    *   [Header Navigation](#header-navigation-srccomponentslayoutheadertsx)
    *   [Homepage Content](#homepage-content-srccomponentshomepagecontenttsx)
    *   [Events Page](#events-page-srcappeventspagetsx)
    *   [FAQ Page](#faq-page-srcappfaqpagetsx)
    *   [Portfolio Page](#portfolio-page-srcappportfoliopagetsx)
    *   [Partners Page](#partners-page-srcapppartnerspagetsx)
    *   [Services Page](#services-page-srcappservicespagetsx)
    *   [Customizing Colors](#customizing-colors-srcappglobalscss)
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
| **next-themes**     | Manages the light/dark mode theme switching.                                         |

---

## 🚀 Getting Started (Local Setup)

Follow these steps to run the website on your own computer for development and testing.

### How Secret Keys Are Handled

**This project works out-of-the-box in environments like Firebase Studio without any configuration.** It includes fallback secret keys hardcoded directly into the application for immediate functionality.

However, for security and best practices, especially when deploying to a public website, you should use environment variables. The code is built to automatically prefer your environment variables over the hardcoded fallbacks if you provide them.

**To use your own keys (Recommended for Production):**

1.  In the main folder of your project, create a new file and name it exactly: `.env`

2.  Open the `.env` file and add the following lines. Replace the placeholder text with your actual secret key and URL. **The forms will not work without these.**

    ```
    # For Google AI features (used in the "Start a Chapter" form)
    # Get your key from Google AI Studio: https://aistudio.google.com/app/apikey
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"

    # For form notifications to Discord (used by Contact and Chapter forms)
    # How to create a Discord Webhook: https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks
    DISCORD_WEBHOOK_URL="YOUR_DISCORD_WEBHOOK_URL_HERE"
    ```

### Step 1: Install Dependencies

This command reads the `package.json` file and downloads all the necessary libraries and tools that the project needs to run.

Open your terminal and run this command:
```bash
npm install
```

### Step 2: Run the Development Servers

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

When you are ready to make your website live on the internet, you'll use a hosting provider like **Netlify**, **Vercel**, or **Hostinger**.

### 1. Connect Your Repository

In your hosting provider's dashboard, create a new site and connect it to your GitHub/GitLab/Bitbucket repository where your code is stored.

### 2. Build Configuration

Most providers will auto-detect that this is a Next.js project. The `netlify.toml` file in this project pre-configures this for Netlify. If you need to set them manually, use:
- **Build Command:** `npm run build`
- **Publish Directory:** `.next`

### 3. **CRITICAL:** Set Production Environment Variables

For the live website to work, you **must** set your secret keys in your hosting provider's settings. The code is designed to use these variables if they are present, which overrides the built-in fallback keys.

In your site's dashboard (e.g., on Netlify: `Site settings > Build & deploy > Environment`), add the following variables:

-   `GEMINI_API_KEY` - Set this to your Google AI API key.
-   `DISCORD_WEBHOOK_URL` - Set this to your Discord Webhook URL.

**Without these variables, the forms will use the hardcoded fallback keys.** For a production website, it is highly recommended to use your own keys by setting them here.

---

## ✍️ Managing Website Content

You don't need a database to update this site's content. Most content is stored in simple lists (arrays) directly in the code. This makes it incredibly easy to manage. To edit content, find the correct file and modify the text inside the quotes.

**How to Edit:**
-   **Find the right file** from the list below.
-   **Locate the array** (e.g., `const portfolioItems = [...]`).
-   **To change text:** Simply edit the text within the `""` or `''`.
-   **To add an item:** Copy an existing item (from `{` to `}` including the comma), paste it at the end of the list, and change its content.
-   **To remove an item:** Delete the entire item block (from `{` to `}`). Be careful with commas between items.

---

### Header Navigation (`src/components/layout/Header.tsx`)
This file controls the main navigation links at the top of every page.
-   Find the `navLinks` array.
-   Each item in the list is an object with a `href` (the URL path, like `/about`) and a `label` (the text that appears, like "About Us").
-   You can add, remove, or reorder these links to manage your site's navigation.

### Homepage (`src/components/HomePageContent.tsx`)
This file controls everything on the homepage.
-   **Image Gallery:** Find the `galleryImages` array to change image URLs (`src`) and alternate text (`alt`).
-   **Services:** Find the `services` array to edit the icon, title, and description of the services highlighted on the homepage.
-   **Featured Projects:** Edit the `featuredProjects` array to change which projects are shown on the homepage.
-   **Testimonials:** Modify the `testimonials` array in `src/lib/portfolio-data.ts` to update client quotes.

### Events (`src/app/events/page.tsx`)
This file controls the list of events.
-   Find the `events` array at the top of the file.
-   Each item in the list is an event card. You can edit the `title`, `date`, `time`, `location`, and `description`.

### FAQ (`src/app/faq/page.tsx`)
This file controls the Frequently Asked Questions section.
-   Find the `faqs` array.
-   Each item has a `question` and an `answer`. Edit these to manage your FAQ.

### Portfolio (`src/app/portfolio/page.tsx`)
This file controls your main portfolio display. The portfolio items and testimonials are managed in `src/lib/portfolio-data.ts`.
-   **Portfolio Items:** Modify the `portfolioItems` array in `src/lib/portfolio-data.ts`. Each item includes a `title`, `description`, `image` URL, `tags`, and a list of `features`.
-   **Testimonials:** Modify the `testimonials` array in `src/lib/portfolio-data.ts` to change the client quotes.

### Partners (`src/app/partners/page.tsx`)
This file controls the partner and university logos.
-   **Company Partners:** Edit the `companyPartners` array to manage company logos and names.
-   **University Chapters:** Edit the `universityChapters` array to manage university chapter logos and names.

### Services (`src/app/services/page.tsx`)
This file controls the detailed list of services your agency offers.
-   Find the `services` array. Each item represents a service card and includes an `icon`, `title`, `description`, a list of `features`, and `tags`.

### Customizing Colors (`src/app/globals.css`)
-   Open `src/app/globals.css`. At the top, you'll find `:root { ... }` (for light mode) and `.dark { ... }` (for dark mode).
-   These sections use HSL (Hue, Saturation, Lightness) color values.
-   To change the site's main color, modify the HSL values for the `--primary` variable. You can use an online "HSL color picker" to find the values for the color you want.
-   You can also change `--background`, `--accent`, and other colors here to completely customize the look and feel of the site.

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

-   `src/lib/`: Contains shared utilities and data.
    -   `portfolio-data.ts`: The central source for all portfolio projects and testimonials.

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

1.  **The User Interface (Frontend): `src/app/contact/ContactFormWrapper.tsx`**
    *   This file contains the React component for the form. It defines the layout of the input fields (Name, Email, Subject, Message).
    *   **Validation Schema (`SendMessageInputSchema`):** At the top of the file, a Zod schema defines the rules for valid data. This includes a special rule (`refine`) that requires the `customSubject` field to be filled out only if the user selects "Other" from the subject dropdown.
    *   **Form Management:** The `useForm` hook from `react-hook-form` is initialized with our Zod schema. This hook gives us everything we need to manage the form.
    *   **Dynamic Fields:** The component watches the value of the `subject` field. If it's "other", it renders an additional input field for the custom subject.
    *   **Pre-filling from URL:** The form uses the `useSearchParams` hook to check if `subject` or `customSubject` are present in the URL (e.g., from clicking a link on the Services page). If so, it uses them as the default values for the form.
    *   **Suspense Boundary:** The parent component (`src/app/contact/page.tsx`) wraps the `ContactFormWrapper` in a `<Suspense>` boundary. This is critical because `useSearchParams` is a client-side hook, and this prevents errors during the server-side build process.
    *   **The "Send Message" Button:** This is a standard `<Button type="submit">`. When inside a `<form>` tag, clicking this button automatically triggers the `onSubmit` function defined in the form setup.

2.  **The Submission (Client to Server): `onSubmit` function in `ContactFormWrapper.tsx`**
    *   When the user clicks "Send Message," `react-hook-form` first validates all the fields against the Zod schema.
    *   If validation passes, the `onSubmit` function calls `sendDirectMessage(values)`, which is our Server Action.

3.  **The Backend Logic (Server Action): `src/app/contact/actions.ts`**
    *   This file is the backend brain for the contact form. It has the `'use server'` directive.
    *   **`sendDirectMessage` function:** This function receives the form data.
    *   **Getting the Webhook URL:** The code uses a fallback system. It first checks for `process.env.DISCORD_WEBHOOK_URL`. If it's available, it uses it. If not, it falls back to a hardcoded URL, allowing it to work out-of-the-box.
    *   **Formatting the Message:** It formats the form data into a clean, readable message for Discord. It uses the `customSubject` value if the subject is "other".
    *   **Communicating with the Webhook:** It uses `fetch` to send a `POST` request to the determined Discord webhook URL.
    *   **Returning the Result:** It returns `{ success: true }` or `{ success: false }` to the frontend, along with a helpful message.

4.  **Displaying the Result (Back to the Frontend)**
    *   Back in `ContactFormWrapper.tsx`, the `result` from the server is checked.
    *   If `result.success` is `true`, a success toast notification is displayed, and the form is cleared.
    *   If `result.success` is `false`, an error toast is displayed with the specific message from the server (e.g., "The webhook URL may be invalid or missing permissions.").

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
    *   This file acts as a bridge. It receives the data from the form.
    *   It uses the same fallback system for both the `GEMINI_API_KEY` and the `DISCORD_WEBHOOK_URL`, prioritizing environment variables but using hardcoded values if they are not set.
    *   First, it calls `chapterApplication(values)`, which is our Genkit AI flow.
    *   After the AI flow succeeds, it proceeds to send a notification to your Discord channel. It formats the application details into a nice embed and sends it using `fetch`.

4.  **The AI Processing (Genkit Flow): `src/ai/flows/chapter-application-flow.ts`**
    *   This file is very simple. It has the `'use server'` directive, as it's called by another server component.
    *   **`ai.defineFlow`:** This defines a Genkit "flow" named `chapterApplicationFlow`. A flow is a series of steps that can include calling AI models.
    *   **Current Function:** Right now, this flow is very basic. It just accepts the application data and returns `{ success: true }`.
    *   **Future Possibilities:** This is where you could add powerful AI features. For example, you could modify this flow to:
        *   Use an LLM to analyze the `reason` field and determine if it meets certain criteria.
        *   Save the application to a database (like Firestore).
        *   Send a customized confirmation email back to the applicant.

5.  **Displaying the Result (Back to the Frontend)**
    *   The `{ success: true, message: "..." }` result is passed all the way back to the `ChapterApplicationForm.tsx` component.
    *   A toast notification is shown with the appropriate message from the server, and the form is reset on success.
