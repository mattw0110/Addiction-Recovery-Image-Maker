# Recovery Visions - Addiction Recovery Image Maker

A compassionate AI-powered application that generates uplifting blog post imagery and content for addiction recovery topics. It uses **Google Gemini** for text generation (titles, captions, prompts) and **Imagen** for high-quality visual generation.

## Features

*   **AI Text Generation**: Creates inspiring titles, captions, and detailed image prompts.
*   **AI Image Generation**: Uses Imagen 4.0 to generate high-quality, photorealistic images based on positive visual prompts.
*   **Smart Prompting**: Automatically sanitizes prompts to ensure generated images are safe, uplifting, and free of sensitive triggers.
*   **Secure Access**: Users can securely connect their own Google API key or use a manual entry method.
*   **Responsive Design**: Built with React and Tailwind CSS for a beautiful experience on mobile and desktop.

## Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or newer)
*   npm (comes with Node.js)
*   A GitHub account (for deployment)

## Local Development

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start the Development Server**
    ```bash
    npm run dev
    ```
    Open your browser to the local URL provided (usually `http://localhost:5173`).

## Deployment to GitHub Pages

This project is configured to be easily deployed to GitHub Pages.

### Step 1: Setup Repository
1.  Create a new repository on GitHub.
2.  Push your code to the repository:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```

### Step 2: Deploy
We use the `gh-pages` package to handle deployment.

1.  **Run the deploy command:**
    ```bash
    npm run deploy
    ```
    This command will:
    *   Build the project (transpile TypeScript/React).
    *   Upload the `dist` folder to a `gh-pages` branch on your repository.

2.  **Configure GitHub Settings:**
    *   Go to your repository on GitHub.
    *   Click **Settings** > **Pages**.
    *   Ensure the source is set to **Deploy from a branch**.
    *   Select the `gh-pages` branch and `/ (root)` folder.
    *   Click **Save**.

Your app will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

## API Key Note

For security, **API Keys are not stored in the code**. When you (or users) visit the live site, you will be prompted to:
1.  Connect via Google AI Studio (secure popup).
2.  OR Manually paste an API Key.

Do not hardcode `API_KEY` in your build environment variables for public repositories.
