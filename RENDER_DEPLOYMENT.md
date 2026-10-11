# Deployment Guide - Render

This guide explains how to deploy the HR Platform MVP to Render.

## Prerequisites

- A Render account (free at https://render.com)
- Your GitHub repository pushed with the deployment files

## Files Included

- **Dockerfile**: Multi-stage build for the React app
- **render.yaml**: Infrastructure-as-code configuration for Render
- **.dockerignore**: Optimizes Docker build by excluding unnecessary files

## Deployment Steps

### 1. Push Your Code to GitHub

Ensure all files are committed and pushed:
```bash
git add Dockerfile .dockerignore render.yaml
git commit -m "Add Render deployment configuration"
git push origin main
```

### 2. Connect to Render

1. Go to https://render.com and sign up (or log in)
2. Click **New +** and select **Web Service**
3. Connect your GitHub repository (TagsLab-TechAdvance/Timesheet-invoice)
4. Select this repository when prompted

### 3. Configure the Service

When creating the service, Render will auto-detect the `render.yaml` file. You can:
- Accept the defaults from `render.yaml`
- Adjust region if needed
- Change plan (free tier available)

### 4. Deploy

Click **Deploy** and Render will:
1. Clone your repository
2. Build the Docker image
3. Deploy your application
4. Provide a public URL (e.g., `https://hr-platform-mvp-xxxx.onrender.com`)

## Manual Deployment (Alternative)

If you prefer not to use `render.yaml`:

1. Create a **Web Service** on Render
2. Set Build Command: `npm run build`
3. Set Start Command: `npm run preview` or use the Dockerfile
4. Set environment variables as needed

## After Deployment

- Your app will be available at the provided URL
- Auto-deploy is enabled - push to main branch to auto-redeploy
- Monitor logs in Render dashboard
- The free tier may have a brief startup delay

## Troubleshooting

- **Build fails**: Check that all dependencies are in package.json
- **App crashes**: Review logs in Render dashboard for error details
- **Port issues**: The Dockerfile uses port 3000; Render will expose it automatically

## Next Steps

- Set up custom domain (optional)
- Configure environment variables if needed
- Monitor performance and logs
