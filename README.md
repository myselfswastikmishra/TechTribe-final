# Welcome to the Tech Tribe Website!

This guide provides a comprehensive overview of the project, detailing file structures, features, and management processes.

## 🚀 Getting Started

To get the project running locally, follow these steps.

### 1. Set Up Environment Variables

This project uses Google's Gemini AI. An API key is required.

1.  Locate the `.env` file in the project root.
2.  Add your API key:

    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### 2. Install Dependencies

This command installs all the necessary code libraries the project depends on.

Open a terminal and run:

```bash
npm install
```

### 3. Run the Development Servers

The project consists of a Next.js frontend and a Genkit backend for AI features. Both need to run simultaneously in separate terminals.

**Terminal 1: Start the Frontend**

```bash
npm run dev
```

The website will be available at `http://localhost:9002`.

**Terminal 2: Start the AI Backend**

```bash
npm run genkit:watch
```

This command starts the Genkit AI service, which powers the forms. Submissions will be logged in this terminal.

## 📂 Project Structure

-   `src/app/` - The core of the website, with each folder corresponding to a page.
    -   `page.tsx`: The homepage.
    -   `contact/page.tsx`: The "Contact Us" page.
    -   `chapters/page.tsx`: The "Start a Chapter" page.
    -   `portfolio/page.tsx`: The portfolio page.
    -   `services/page.tsx`: The services page.
    -   `sponsors/page.tsx`: The sponsors page.
    -   `events/page.tsx`: The events page.
    -   `faq/page.tsx`: The FAQ page.
    -   `layout.tsx`: The main site template, including the header and footer.
    -   `globals.css`: The main stylesheet for global colors and fonts.

-   `src/components/` - Reusable components for the site.
    -   `layout/`: Contains `Header.tsx` and `Footer.tsx`.
    -   `ui/`: Pre-built UI elements like `Button.tsx`, `Card.tsx`, etc.
    -   `DynamicText.tsx`: Powers the animated "We are..." text on the homepage.

-   `src/ai/` - Contains all Artificial Intelligence logic.
    -   `genkit.ts`: Configures the connection to the Gemini AI model.
    -   `flows/`: Defines the backend logic for forms.
        -   `send-message-flow.ts`: Handles "Contact Us" form submissions.
        -   `chapter-application-flow.ts`: Handles new university chapter applications.

-   `package.json`: Lists project dependencies and scripts.

## ✨ Managing Content

Content can be updated by editing arrays within the page files. An array is a list of items inside `[ ... ]`, where each item is enclosed in `{ ... }`.

-   **To add an item:** Copy an existing `{...}` block (including the comma) and modify the text.
-   **To remove an item:** Delete the entire `{...}` block (including the comma).
-   **To edit an item:** Change the text within the quotes for the desired key (e.g., `title`).

---

### Homepage (`src/app/page.tsx`)

-   **Dynamic Text:** The phrases for the animated "We are..." text are in the `phrases` array in `src/components/DynamicText.tsx`.
-   **Image Gallery:** Edit the `galleryImages` array in `src/app/page.tsx` to change image URLs (`src`) and descriptions (`alt`).
-   **Services & Projects:** Update the `services` and `featuredProjects` arrays to change content.
-   **Testimonials:** Modify the `testimonials` array to manage client quotes.

### Events (`src/app/events/page.tsx`)

1.  Open `src/app/events/page.tsx`.
2.  Find the `events` array at the top.
3.  Add, remove, or edit objects in this array to manage the events page.

### FAQ (`src/app/faq/page.tsx`)

1.  Open `src/app/faq/page.tsx`.
2.  Find the `faqs` array at the top.
3.  Each object has a `question` and an `answer`. Edit this list to manage the FAQ section.

---

## 🤖 The AI Backend (Forms)

### 1. The Contact Form

1.  **Form Component (`src/app/contact/ContactForm.tsx`):** Defines the form fields.
2.  **Server Action (`src/app/contact/actions.ts`):** The `sendDirectMessage` function passes form data to the AI backend.
3.  **AI Backend (`src/ai/flows/send-message-flow.ts`):**
    -   Receives data from the server action.
    -   Uses a prompt to format the data into an email body.
    -   **Result:** The formatted email is printed to the Genkit terminal (`npm run genkit:watch`), with the recipient set to `theswastikmishraofficial@gmail.com`.

### 2. The "Start a Chapter" Form

This form follows the same pattern:

1.  **Form:** `src/app/chapters/ChapterApplicationForm.tsx`
2.  **Server Action:** `src/app/chapters/actions.ts`
3.  **AI Backend:** `src/ai/flows/chapter-application-flow.ts` (This flow logs all application data to the Genkit terminal).

---

## 🎨 Changing the Look & Feel

### Main Color Scheme (`src/app/globals.css`)

1.  Open `src/app/globals.css`.
2.  At the top, find the `:root { ... }` section.
3.  Change the HSL values for CSS variables like `--primary`, `--background`, and `--accent` to theme the website.
