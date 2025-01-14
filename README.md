# ✏️ Draftly - AI-Assisted Proposal Generator (Nextjs | Auth0)

### 📄 Description
Draftly is a web application designed to help users create professional proposals with AI assistance. This version uses **Nextjs** and integrates **Auth0** for secure user authentication.

### 🚀 Features
- AI-powered proposal generation
- Secure authentication with Auth0
- Customizable templates and content
- Export proposals as PDF
---

### 🛠️ Installation & Setup
#### 1. Clone the Repository
```bash
git clone https://github.com/kymaniAnderson/draftly-frontend.git
cd draftly-frontend
```

#### 2. Install dependencies
```bash
yarn install
```

#### 3. Configure Auth0
- Create an application in the Auth0 Dashboard
- Set the callback URL: http://localhost:3000/api/auth/callback
- Set the logout URL: http://localhost:3000/

#### 4. Create .env.local file
Structure:
```bash
AUTH0_SECRET=<YOUR_AUTH0_SECRET>
AUTH0_BASE_URL=<YOUR_AUTH0_BASE_URL>
AUTH0_ISSUER_BASE_URL=<YOUR_AUTH0_ISSUER_BASE_URL>
AUTH0_CLIENT_ID=<YOUR_AUTH0_CLIENT_ID>
AUTH0_CLIENT_SECRET=<YOUR_AUTH0_CLIENT_SECRET>
BACKEND_URL=<YOUR_BACKEND_URL>
```

### ▶️ Run the application
#### 1. Start the development server
```bash 
yarn dev
```