# Tech TribeX Website

Welcome to the Tech TribeX project! This is your friendly guide to everything you need to know about your new website. We've made it super simple, so even if you're new to this, you'll feel like a pro! 🚀

---

## ⭐️ What's Inside This Guide?

*   [What Your Website Is Made Of](#-what-your-website-is-made-of-the-tech-stack)
*   [Running the Website on Your Computer](#-running-the-website-on-your-computer-local-setup)
*   [Putting Your Website on the Internet](#-putting-your-website-on-the-internet-deployment)
*   [How to Change Your Website's Content](#-how-to-change-your-websites-content)
    *   [Navigation Links (Header)](#1-navigation-links-header---srccomponentslayoutheadertsx)
    *   [Homepage Content](#2-homepage---srccomponentshomepagecontenttsx)
    *   [Services Page](#3-services-page---srcappservicespagetsx)
    *   [Portfolio & Testimonials](#4-portfolio--testimonials---srclibportfolio-datats)
    *   [Partners & University Logos](#5-partners--university-logos---srcapppartnerspagetsx)
    *   [Events Page](#6-events-page---srcappeventspagetsx)
    *   [FAQ Page](#7-faq-page---srcappfaqpagetsx)
    *   [Website Colors](#8-website-colors---srcappglobalscss)
*   [How the Contact Forms Work](#-how-the-contact-forms-work)

---

## 🤖 What Your Website Is Made Of (The Tech Stack)

Your website is built with some of the coolest and most modern tools available! Think of them like super-powered building blocks.

| Tool                | What It Does (In Simple Terms)                                        |
| ------------------- | --------------------------------------------------------------------- |
| **Next.js & React** | The main Lego set for building the pages and buttons.                 |
| **TypeScript**      | A helpful robot that checks our code for mistakes before they happen. |
| **Tailwind CSS**    | A giant box of crayons for styling everything to look amazing.        |
| **ShadCN/UI**       | Pre-made Lego pieces (like buttons and cards) that look great.        |
| **AI Toolkit**      | The "brain" that helps with smart features on the site.               |
| **Discord Webhooks**| A magic mailbox that sends form submissions straight to Discord.      |

---

## 💻 Running the Website on Your Computer (Local Setup)

Want to play around with the website on your own computer? Here’s how!

### **Step 1: Get Your Secret Keys (Important!)**

Your website uses two special "keys" to make its forms work.
-   **AI Service Key:** For the smart features in the "Start a Chapter" form.
-   **Discord Webhook URL:** To send form notifications to your Discord server.

**For this project to work perfectly, you need to tell it what your keys are.**

1.  In the main folder of your project, create a new file and name it exactly: `.env`
2.  Open that `.env` file and copy-paste the following inside it:

    ```
    # You can get an API key from a service like Google AI Studio
    GEMINI_API_KEY="PASTE_YOUR_AI_SERVICE_KEY_HERE"

    # Learn how to create a Discord Webhook here: https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks
    DISCORD_WEBHOOK_URL="PASTE_YOUR_DISCORD_WEBHOOK_URL_HERE"
    ```

3.  Now, just replace the placeholder text with your real key and URL. **The forms will not work without this step.**

### **Step 2: Install the Parts**

This command is like opening the Lego box and making sure all the pieces are there. It reads a file called `package.json` and downloads all the tools your website needs.

Open your computer's terminal (like Command Prompt, PowerShell, or Terminal) and run this:
```bash
npm install
```

### **Step 3: Start the Engines!**

Your project has two parts that need to run at the same time. You will need to open **two separate terminals**.

**In your FIRST terminal, start the main website:**
```bash
npm run dev
```
You can now see your website by going to `http://localhost:9002` in your web browser.

**In your SECOND terminal, start the AI service:**
This part handles the "brains" for your forms.
```bash
npm run genkit:watch
```
Keep this terminal open to see if the AI service is working correctly.

---

## 🌐 Putting Your Website on the Internet (Deployment)

Ready to show your website to the world? You'll use a service like **Vercel** or **Netlify**.

1.  **Connect Your Code:** In Vercel or Netlify, create a new project and connect it to the place where your code is stored (like GitHub). They are smart and will usually know it's a Next.js project.

2.  **CRITICAL STEP: Add Your Secret Keys!**
    Just like you did for your local computer, you **must** tell your hosting service what your secret keys are. If you don't, your forms won't work on the live website.

    In your Vercel or Netlify project settings, find the section for **Environment Variables** and add these two:
    -   `GEMINI_API_KEY` - Paste your AI service key here.
    -   `DISCORD_WEBHOOK_URL` - Paste your Discord Webhook URL here.

---

## ✍️ How to Change Your Website's Content

This is the fun part! You don't need to be a coding expert to update your website. Most of the text and images are stored in simple lists right in the code.

**How to Edit an Item:**
- Find the correct file from the list below.
- Look for a list that starts with `const someName = [...]`.
- Each item in the list is usually inside curly braces `{ ... }`.
- To change text, just edit the words inside the quotes `""`.
- To add a new item, copy an existing one (from `{` to `}`), paste it, and change its content.
- To remove an item, just delete its entire block from `{` to `}`.

---

### **1. Navigation Links (Header) - `src/components/layout/Header.tsx`**
This file controls the links at the top of your website (Home, Services, etc.).
- Find the `navLinks` list.
- Change the `label` to rename a link or change the `href` to change where it goes.

### **2. Homepage - `src/components/HomePageContent.tsx`**
This file controls everything you see on the main homepage.
- **Photo Gallery:** Find `galleryImages` to change the images in the carousel.
- **Services:** Find `services` to edit the three main services shown.
- **Featured Projects:** Find `featuredProjects` to change the two projects highlighted.

### **3. Services Page - `src/app/services/page.tsx`**
This file controls the detailed list of services you offer.
- Find the `services` list. You can edit the icon, title, description, features, and tags for each service.

### **4. Portfolio & Testimonials - `src/lib/portfolio-data.ts`**
This special file holds all the data for your projects and what your clients say.
- **Portfolio Projects:** Find the `portfolioItems` list. Here you can add, remove, or edit any project. You can change the title, description, image, features, and links.
- **Client Testimonials:** Find the `testimonials` list to update the quotes from your clients.

### **5. Partners & University Logos - `src/app/partners/page.tsx`**
This file controls the logos on the Partners page.
- **Company Partners:** Edit the `companyPartners` list.
- **University Chapters:** Edit the `universityChapters` list.

### **6. Events Page - `src/app/events/page.tsx`**
This file controls the list of upcoming events.
- Find the `events` list and edit the title, date, location, and description for each event.

### **7. FAQ Page - `src/app/faq/page.tsx`**
This file controls the questions and answers on the FAQ page.
- Find the `faqs` list. Edit the `question` and `answer` for each item.

### **8. Website Colors - `src/app/globals.css`**
Want to change the main color of your website?
- Open this file and look at the very top.
- Find the line that says `--primary: ...`
- You can change the HSL color values here. Use an online tool like a "HSL Color Picker" to find the numbers for the color you want!

---

## 🤔 How the Contact Forms Work

Your website has two forms, and they are both very smart!

1.  **The User Fills Out the Form:**
    - You can see the code for the forms in files like `src/app/contact/ContactFormWrapper.tsx`. It uses a tool called **React Hook Form** to manage what the user types.
    - It uses another tool called **Zod** to check if the user's input is valid (like making sure an email is a real email address).

2.  **The Form is Submitted:**
    - When the user clicks "Send," a **Next.js Server Action** is triggered. This is a secure way to run code on the server (the "backend") without needing a separate API. You can see this code in files like `src/app/contact/actions.ts`.

3.  **The Server Does Its Job:**
    - The server code takes the form data.
    - If it's the "Start a Chapter" form, it first sends the data to the **AI service** for processing.
    - Then, it formats a nice message and sends it to your **Discord channel** using the Webhook URL you provided.

4.  **The User Gets a Confirmation:**
    - The server tells the website if it was successful.
    - A little "Toast" notification pops up to tell the user their message was sent.

And that's it! You are now the master of your Tech TribeX website. Go make something amazing! ✨
