# 🩺 Nurse-My: Healthcare Management System

## 📋 Overview
**Nurse-My** is a comprehensive healthcare management system designed to help healthcare professionals, particularly nurses, manage patient care efficiently. The application provides tools for patient monitoring, medical test tracking, medication handling, and healthcare data management.

---

## ✨ Features

### 1. Patient Management
- **Patient List Management**: View and manage patient records  
- **Personal Information**: Track patient personal details  
- **Medical Information**: Comprehensive medical record keeping  
  - Appointments tracking  
  - Blood pressure monitoring  
  - Medical history  
  - Medication management  
  - Nurse logs  
  - Sugar level tracking  
  - Vital signs monitoring

### 2. Medical Testing
- **Mini Mental State Examination (MMSE)**  
  - Digital form implementation  
  - History tracking  
  - Results analysis  
- **Daily Tests**: Regular patient assessment tools  
- **Follow-up Tests**: Track ongoing patient evaluations

### 3. Medication Tracking
- Medication schedule management  
- Dosage tracking  
- Medication history

### 4. Emergency Features
- Quick access ambulance button  
- Emergency contact information  
- Rapid response system

### 5. User Authentication
- Secure login system  
- Password recovery  
- User registration  
- Session management

---

## 🛠️ Technical Stack

### Frontend
- **Framework**: React (Vite)  
- **State Management**: Zustand  
- **Routing**: React Router DOM  
- **UI Components**: Custom components with CSS  
- **Icons**: React Icons, Lucide React

### Backend & Database
- **Firebase** Integration for:  
  - Authentication  
  - Firestore Database  
  - (Optional) Cloud Functions

### Additional Libraries
- **PDF Generation**: jsPDF  
- **Excel Support**: SheetJS (XLSX)  
- **File Handling**: File-Saver  
- **Notifications**: React-Toastify

---

## 📁 Project Structure

client
├── src
├── Components # Reusable UI components
├── pages # Main application pages
├── firebase # Firebase configuration
├── store # Zustand state management
├── utils # Utility functions
└── assets # Static resources (images, icons)  
---

### Prerequisites
- Node.js (Latest LTS version recommended)  
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone [repository-url]
  2. Install dependencies
cd client
npm install
 3. Set up environment variables
Create a .env file inside the client/ directory and add your Firebase configuration:
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id


Running the Application
Development mode
npm run dev
Build for production
npm run build

Preview production build
npm run preview



