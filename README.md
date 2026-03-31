CloudShield Banner

Military-Grade Encryption • Zero-Trust Access • High Performance


Quick Start  ·  Repository  ·  Report Bug  ·  Request Feature


Table of Contents
01 Overview · 02 Problem Statement · 03 Solution Architecture · 04 System Architecture
05 Tech Stack · 06 Core Features · 07 Project Structure · 08 Getting Started
09 Environment Variables · 10 API Reference · 11 How Encryption Works · 12 Example Security Flow
13 Security · 14 Future Enhancements · 15 Contributing · 16 Author

◈ Overview
CloudShield is a production-ready, full-stack enterprise cloud storage platform that makes zero-trust cybersecurity accessible. It encrypts your files directly inside your browser before uploading them to Amazon Web Services (AWS).

Upload a sensitive document. Safely store it on the cloud. Retrieve it using mathematically expiring secure links. Your data is isolated, protected, and completely safe from unauthorized access.

◈ Problem Statement
Standard cloud storage providers and physical local drives are terrifyingly vulnerable. Keeping data secure online is a massive technical headache.

Data Leaks → If a server is breached, raw unencrypted files are stolen.
Link Sharing Risks → Public download links stay active forever, leading to unauthorized indexing.
Server Blind Spots → APIs often peek at your data while uploading it to cloud endpoints.
Individuals and enterprises need a storage vault that utilizes Zero-Knowledge Encryption—where even the storage provider cannot see the contents of the files being uploaded.

◈ Solution Architecture
CloudShield implements a rigorous Data Defense Pipeline across five stages:

Stage	Component	What Happens
01	Browser Injection	User selects a file; the React app securely halts the network request.
02	Local AES Encryption	crypto-js scrambles the file binary using a strict AES-256 symmetrical vault key tied to your user data.
03	Server Transit	The Node.js Express API receives unintelligible cipher text and validates your JWT.
04	AWS S3 Deployment	The API proxies the encrypted payload safely into Amazon S3 using secondary SSE-S3 rest encryption.
05	Native Decryption	Upon download, the browser intercepts the text string and reverses the AES cipher locally to restore the file natively.

◈ System Architecture
┌─────────────────────────────────────────────────────────────────┐
│                        User / Browser                           │
│     Uploads PDF  ·  Browser Executes AES-256 Scramble           │
└──────────────────────────────┬──────────────────────────────────┘
                               │  Encrypted Cipher Blob (FormData)
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Express.js REST API                           │
│                                                                 │
│  ┌────────────────────┐      ┌──────────────────────────────┐   │
│  │ JWT Auth Validator │      │ MongoDB Metadata Allocation  │   │
│  │ (Bearer header)    │ ──►  │ (Ownership verification)     │   │
│  └────────────────────┘      └──────────────┬───────────────┘   │
└─────────────────────────────────────────────┼───────────────────┘
                                              │ 
                                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Amazon Web Services (S3)                     │
│                                                                 │
│  Stores the payload natively using AWS infrastructure.          │
│  Generates mathematically precise 5-Minute Expiry Download URLs.│
└──────────────────────────────┬──────────────────────────────────┘
                               │  Pre-Signed HTTPS Stream
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Express.js CORS Proxy                         │
│       Safely bounces S3 stream to avoid Browser Fetch limits    │
└──────────────────────────────┬──────────────────────────────────┘
                               │  Restored Blob
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              React.js Frontend Dashboard                        │
│  Local AES Decryption · Framer Animations · Real-time Search    │
└─────────────────────────────────────────────────────────────────┘

◈ Tech Stack
Layer	Technology	Role
Frontend	React 18, Axios, CryptoJS	Responsive UI, Browser-side AES-256 Encryption
Backend	Node.js, Express.js	REST API, AWS proxy wrappers, JWT Verification
Database	MongoDB Atlas (Mongoose)	User data, file metadata, RBAC indexing
Cloud	AWS-SDK (v3) S3 client	Server-Side storage, Pre-signed URL generation
Auth	JWT, bcryptjs	Secure login, session handling, hashed passwords

◈ Core Features
🧠 Zero-Knowledge Encryption Files are encrypted symmetrically in your browser before the transit payload even fires. The server is completely blind to your actual data.

📄 AWS S3 Integration Native utilization of Amazon Web Services. Robust, highly scalable cloud storage using SSE-S3 management.

⏱️ Temporary Link Generation CloudShield restricts file access explicitly. Download URLs cryptographically expire in exactly 300 seconds, making link-sharing exploits impossible.

📊 Smart Operations Vault Search and categorize your assets in real-time. PDFs, Images, and Documents are instantly filtered in the React dashboard with zero latency.

🔐 Role-Based Access Control A robust user schema tied to MongoDB. Files are owned by specific ObjectIDs. You cannot query or interact with files you do not own.

◈ Project Structure
CloudShield/
│
├── backend/
│   ├── config/
│   │   └── db.js                   # MongoDB Atlas connection string logic
│   ├── controllers/
│   │   ├── authController.js       # Signup, login, session JWT generation
│   │   └── fileController.js       # AWS S3 Uploading and URL Expiry Linking
│   ├── models/
│   │   ├── User.js                 # Contains RBAC roles & bcrypt pre-saves
│   │   └── file.model.js           # S3 metadata tracker
│   ├── routes/
│   │   ├── authRoutes.js           # /api/auth/*
│   │   └── fileRoutes.js           # /api/files/*
│   ├── .env                        # Environment variables (Ignored by Git)
│   └── server.js                   # Express entry point & CORS proxies
│
├── frontend/
│   └── src/
│       ├── components/             # Reusable Dashboard & Auth UI
│       ├── index.css               # Glassmorphism security aesthetics
│       ├── App.jsx                 # Vite routing and logic core
│       └── main.jsx                # React DOM entry
│
├── .gitignore                      # Hardened variable leak protection
└── README.md

◈ Getting Started
1. Clone the Repository

```bash
git clone https://github.com/pendalwarmadhukar/CloudShield.git
cd CloudShield
```

2. Backend Setup

```bash
cd backend
npm install
# Create backend/.env (see Environment Variables)
npm start
# Server boots safely on http://localhost:5000
```

3. Frontend Setup

```bash
cd frontend
npm install --force
npm run dev
# Dashboard available on http://localhost:3000
```

◈ Environment Variables
backend/.env

```
PORT=5000
MONGODB_URI=your_mongodb_cluster_url
MOCK_AWS=false
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
S3_BUCKET_NAME=your-bucket
```

🔒 Never commit .env to version control. Let the root .gitignore handle protection.

◈ API Reference
Method	Endpoint	Description	Access
POST	/api/auth/register	Register a new user	Public
POST	/api/auth/login	Authenticate user, obtain JWT	Public
POST	/api/files/upload	Push AES blob to S3 via Multer	Authenticated
POST	/api/files/download	Retrieve 5-minute pre-signed S3 URL	Authenticated
POST	/api/proxy-s3	Bypass browser AWS CORS strict limits	Authenticated
DELETE	/api/files/:id	Execute total cloud & DB eradication	Authenticated

◈ How File Encryption Works
User uploads file via frontend → React locally generates a secret vault key mathematically mapping user.id → CryptoJS encrypts the raw file binary into a secure cipher string → Cipher transmitted to Node.js backend → Node securely proxies the cipher text straight into Amazon S3 Bucket → MongoDB tracks the S3 Object Key and attributes it to { user : userID } → Rendered in Dashboard implicitly as "Locked in Vault"

◈ Example Security Flow
Upload Procedure — Sensitive Diagram

User uploads: financial_report.pdf

Browser Encrypts: The file becomes unreadable garbage data (U2FsdGVkX19s+N...).
Server Stores: AWS saves the garbage data natively without knowing it's a PDF.
Database Maps: Mongo remembers the user owns financial_report at S3 path x.

Download Request — Sensitive Diagram

User clicks download.
Backend validates JWT Auth header.
Express generates an S3 pre-signed URL expiring in 300 seconds.
Browser uses Express proxy to pull the encrypted S3 Blob.
Browser locally reverses the U2FsdGVkX19s+N... text back into a pristine PDF!

◈ Security
Concern	Approach
API Keys	Secured entirely behind dotenv. Root .gitignore prevents commits.
Passwords	Hashed cleanly in MongoDB via robust bcryptjs. Never plaintext.
AWS Tracking	Restricted entirely by pre-signed, mathematically expiring short links.
CORS Access	Controlled strictly via Node.js routing.
Database	MongoDB Atlas — isolated clusters with dynamic ownership routing.

◈ Future Enhancements
📊 Admin Analytics Dashboard — Visualize storage bandwidth distribution for higher-tier users.
📁 Folder Structures — Nest encrypted files dynamically in simulated directories.
🌐 MFA Authentication — Integrate Google Authenticator for two-factor login.
🔗 Secure Peer Sharing — Safely transfer specific encrypted files to alternative users.
📱 Mobile Native Client — A React Native iOS/Android adaptation.

◈ Contributing
Contributions are welcome and appreciated!

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/encryption-upgrade

# 3. Make your changes and commit
git commit -m "Add: AES-GCM integration pipeline"

# 4. Push to your fork
git push origin feature/encryption-upgrade

# 5. Open a Pull Request on GitHub
```

◈ Author
Madhukar Pendalwar
Full Stack Developer · Security Architect · Cloud Engineer

⭐ Star this repo if it helped you · 🔁 Share with others · 💡 Open an issue for feedback

Built with precision · Designed for accessibility · Making cloud security free for everyone

◈ License
This project is licensed under the MIT License — see LICENSE for full details.
