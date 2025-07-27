# Tech Tribe Website

Welcome to the Tech Tribe project repository. This document provides a comprehensive guide to understanding, running, and managing the website.

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Environment Variables

This project uses Genkit to interact with the Google Gemini AI for form processing. You'll need an API key to enable this functionality.

1.  Create a file named `.env` in the root of the project.
2.  Add your Google AI API key to the `.env` file:
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

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

This service powers the "Contact Us" and "Start a Chapter" forms. Any form submissions will be processed by Genkit and logged in this terminal.

---

## 📂 Project Structure

-   `src/app/` - The core of the website, following the Next.js App Router structure. Each folder typically corresponds to a page.
    -   `page.tsx`: The homepage.
    -   `contact/page.tsx`: The "Contact Us" page.
    -   `chapters/page.tsx`: The "Start a Chapter" page.
    -   `portfolio/page.tsx`: The portfolio page.
    -   `services/page.tsx`: The services page.
    -   `sponsors/page.tsx`: The sponsors page.
    -   `events/page.tsx`: The events page.
    -   `faq/page.tsx`: The FAQ page.
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
        -   `send-message-flow.ts`: Handles "Contact Us" form submissions.
        -   `chapter-application-flow.ts`: Handles new university chapter applications.

-   `package.json`: Lists all project dependencies and custom scripts.

---

## ✨ Managing Page Content

Most of the website's content is managed through simple arrays directly within the page files. This makes updates quick and easy without needing a separate CMS. An array is a list of items inside `[ ... ]`, where each item is a JavaScript object enclosed in `{ ... }`.

-   **To add an item:** Copy an existing `{...}` block (including the comma after it) and modify the text and values.
-   **To remove an item:** Delete the entire `{...}` block (and its trailing comma).
-   **To edit an item:** Change the text within the quotes for the desired property (e.g., `title`).

---

### Homepage (`src/app/page.tsx`)

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

---

## 🤖 AI Backend (Forms)

The forms on this website use Genkit to process submissions on the backend.

### 1. Contact Form

1.  **Form Component (`src/app/contact/ContactForm.tsx`):** Defines the form fields and validation rules.
2.  **Server Action (`src/app/contact/actions.ts`):** The `sendDirectMessage` function passes the form data to the Genkit flow.
3.  **AI Flow (`src/ai/flows/send-message-flow.ts`):**
    -   Receives the data.
    -   Uses an AI prompt to format the data into an email body.
    -   **Result:** The formatted email is printed to the Genkit terminal (`npm run genkit:watch`).

### 2. "Start a Chapter" Form

This form follows the same pattern:

1.  **Form:** `src/app/chapters/ChapterApplicationForm.tsx`
2.  **Server Action:** `src/app/chapters/actions.ts`
3.  **AI Flow:** `src/ai/flows/chapter-application-flow.ts` (This flow logs all application data to the Genkit terminal).

---

## 🎨 Customizing the Look & Feel

### Main Color Scheme (`src/app/globals.css`)

1.  Open `src/app/globals.css`.
2.  At the top, find the `:root { ... }` section for the light theme and `.dark { ... }` for the dark theme.
3.  Modify the HSL values for CSS variables like `--primary`, `--background`, and `--accent` to change the website's color palette.
