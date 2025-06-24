# 🩺 Nurse-My: Healthcare Management System

## 📋 Overview

**Nurse-My** is a comprehensive healthcare management system designed to assist nurses and healthcare professionals in managing patient care efficiently. It includes tools for patient monitoring, test tracking, medication schedules, emergency protocols, and secure data handling.

---

## ✨ Features

### 🧑‍⚕️ Patient Management

* View and manage patient records
* Track personal and medical information:

  * Appointments
  * Blood pressure
  * Medical history
  * Medication records
  * Nurse logs
  * Sugar level
  * Vital signs

### 🧪 Medical Testing

* **Mini Mental State Examination (MMSE)**

  * Digital form
  * History tracking
  * Result analysis
* Daily and follow-up test tracking

### 💊 Medication Tracking

* Schedule and dosage management
* Medication history tracking

### 🚨 Emergency Features

* Quick-access ambulance button
* Emergency contact info
* Rapid response system

### 🔐 User Authentication

* Secure login and registration
* Password recovery
* Session management

---

## 🛠️ Tech Stack

### 🔹 Frontend

* **Framework**: React (Vite)
* **State Management**: Zustand
* **Routing**: React Router DOM
* **Styling**: Custom CSS
* **Icons**: React Icons, Lucide React

### 🔹 Backend & Database

* **Firebase** for:

  * Authentication
  * Firestore Database
  * (Optional) Cloud Functions

### 🔹 Additional Libraries

* **PDF Generation**: jsPDF
* **Excel Handling**: SheetJS (XLSX)
* **File Handling**: File-Saver
* **Notifications**: React-Toastify

---

## 📁 Project Structure

```
client/
├── src/
│   ├── Components/       # Reusable UI components  
│   ├── pages/            # Main application pages  
│   ├── firebase/         # Firebase configuration  
│   ├── store/            # Zustand state management  
│   ├── utils/            # Utility functions  
│   └── assets/           # Static resources (images, icons)  
```

---

## ⚙️ Getting Started

### ✅ Prerequisites

* Node.js (Latest LTS version recommended)
* npm or yarn

### 📦 Installation

1. **Clone the Repository**

```bash
git clone [repository-url]
```

2. **Install Dependencies**

```bash
cd client
npm install
```

3. **Set Environment Variables**
   Create a `.env` file inside the `client/` directory and add your Firebase credentials:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 🚀 Running the Application

#### Development Mode

```bash
npm run dev
```

#### Production Build

```bash
npm run build
```

#### Preview Production Build

```bash
npm run preview
```
