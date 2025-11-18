# Recovery Visions - Addiction Recovery Image Maker

A compassionate AI-powered application that generates uplifting blog post imagery and content for addiction recovery topics. It uses **Google Gemini** for text generation and **Imagen** for visual generation.

## Features

*   **AI Text Generation**: Creates inspiring titles, captions, and detailed image prompts.
*   **AI Image Generation**: Uses Imagen 4.0 for high-quality, photorealistic images.
*   **Secure Access**: Users can securely connect their own Google API key.

## How to Deploy (Main Branch Method)

This project is configured to deploy from the `/docs` folder on your main branch.

1.  **Install & Build**
    ```bash
    npm install
    npm run build
    ```
    *This creates a `docs` folder with your compiled website.*

2.  **Push to GitHub**
    ```bash
    git add .
    git commit -m "Build for deployment"
    git push origin main
    ```

3.  **Configure GitHub Pages**
    *   Go to your repository on GitHub.
    *   Click **Settings** > **Pages**.
    *   Under **Build and deployment** > **Source**, select **Deploy from a branch**.
    *   Select Branch: **`main`**.
    *   Select Folder: **`/docs`**.
    *   Click **Save**.

Your site will be live at the URL provided by GitHub (usually `https://username.github.io/repo-name/`).

## Local Development

```bash
npm install
npm run dev
```
