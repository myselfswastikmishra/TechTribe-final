# Welcome to Your Tech Tribe Website!

This guide is here to help you understand every part of your website. We'll walk through what each file does, where to find specific features, and how you can manage and update your site. Think of this as the instruction manual for your awesome new online home!

## 🚀 Getting Started

Before you can make changes, you need to get the website running on your computer.

### 1. Set Up Your API Key

Your website uses Google's Gemini AI to power some of its features. To make it work, you need to tell the website what your secret API key is.

1.  Find the file named `.env` in the main folder.
2.  Open it and add the following line, pasting your actual key where it says `YOUR_API_KEY_HERE`:

    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### 2. Install the Necessities

Just like building with LEGOs, you need all the pieces first. This command downloads all the code libraries your website depends on.

Open your computer's terminal or command prompt and run:

```bash
npm install
```

### 3. Run the Website

Your website has two parts: the frontend (what users see) and the backend (the "engine" that powers features like the contact form). You need to run both at the same time in two separate terminal windows.

**Terminal 1: Start the Frontend**

```bash
npm run dev
```

This will start the main website. You can usually view it at `http://localhost:9002` in your web browser.

**Terminal 2: Start the AI Backend**

```bash
npm run genkit:watch
```

This starts the Genkit AI service. This is the magic behind your contact forms. When someone submits a message, you'll see the output here!

## 📂 What's Where? A Tour of Your Project Files

Your project is organized into folders. Here’s a map to help you find your way around.

-   `src/app/` - This is the heart of your website. Each folder inside corresponds to a page.
    -   `page.tsx`: The homepage.
    -   `contact/page.tsx`: The "Contact Us" page.
    -   `chapters/page.tsx`: The "Start a Chapter" page.
    -   `portfolio/page.tsx`: The portfolio page.
    -   `services/page.tsx`: The services page.
    -   `sponsors/page.tsx`: The sponsors page.
    -   `events/page.tsx`: The events page.
    -   `faq/page.tsx`: The FAQ page.
    -   `layout.tsx`: The main template for your entire site (includes the header and footer).
    -   `globals.css`: The main stylesheet. You can change colors and fonts for the whole site here.

-   `src/components/` - This folder contains reusable "building blocks" for your site.
    -   `layout/`: Contains the `Header.tsx` and `Footer.tsx` components.
    -   `ui/`: All the pre-built UI elements like `Button.tsx`, `Card.tsx`, etc.
    -   `DynamicText.tsx`: This component powers the animated "We are..." text on the homepage.

-   `src/ai/` - This is where all the Artificial Intelligence magic lives!
    -   `genkit.ts`: This file sets up the connection to the Gemini AI model.
    -   `flows/`: These files define the backend logic for your forms.
        -   `send-message-flow.ts`: Handles what happens when someone submits the "Contact Us" form.
        -   `chapter-application-flow.ts`: Handles submissions for new university chapters.

-   `package.json`: This file lists all the code libraries your project uses and the scripts to run it (like `npm run dev`).

## ✨ Key Features & Where to Find Them

### 1. The Homepage (`src/app/page.tsx`)

This is the most complex page. It's built by combining many different sections.

-   **Dynamic Text:** The animated text at the top ("We are a Tech Community", "a Freelance Agency...") is controlled by the component in `src/components/DynamicText.tsx`. You can change the phrases there.
-   **Image Gallery:** The "Our Community in Action" section is on this page. The list of images is defined directly in `src/app/page.tsx` in the `galleryImages` array. You can change the `src` (the image URL) and `alt` (description) for each image.
-   **Community & Services Sections:** All other sections (Services, Featured Projects, Testimonials, etc.) are also defined directly on this page.

### 2. The Contact Form (The "Get in Touch" Feature)

This feature has three parts that work together:

1.  **The Form Itself (`src/app/contact/ContactForm.tsx`):** This is the visual form that users fill out. It defines the fields (Name, Email, Subject, Message).
2.  **The Server Action (`src/app/contact/actions.ts`):** When a user clicks "Send Message", the form calls the `sendDirectMessage` function in this file. This function's job is to take the form data and pass it to the AI backend.
3.  **The AI Backend (`src/ai/flows/send-message-flow.ts`):** This is where the magic happens!
    -   It receives the data from the server action.
    -   It uses a prompt to ask the Gemini AI to format the data into a clean email body.
    -   **How you get the message:** It then prints this formatted email to your Genkit terminal window (the one running `npm run genkit:watch`). Look for the "------- EMAIL TO BE SENT -------" block!
    -   The recipient's email (`theswastikmishraofficial@gmail.com`) is set inside this file.

### 3. The "Start a Chapter" Form

This works almost exactly like the Contact Form, but with different files:

1.  **The Form:** `src/app/chapters/ChapterApplicationForm.tsx`
2.  **The Server Action:** `src/app/chapters/actions.ts`
3.  **The AI Backend:** `src/ai/flows/chapter-application-flow.ts`

For now, this flow simply logs the received application data to the Genkit terminal.

### 4. Styling and Appearance (`src/app/globals.css`)

Want to change the website's main color scheme? This is the place to do it! At the top of this file, you'll see a section `:root { ... }`. You can change the HSL values for variables like `--primary`, `--background`, and `--accent` to theme the entire website.

We hope this guide helps you feel confident in managing and growing your Tech Tribe website. Happy coding!
