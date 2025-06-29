# 🩺 Nurse-My: Healthcare Management System

## 📋 Overview

**Nurse-My** is a comprehensive healthcare management system designed to assist nurses and healthcare professionals in managing patient care efficiently. Built with React and Firebase, it provides a modern, secure, and user-friendly interface for healthcare management tasks including patient monitoring, medical testing, medication tracking, and emergency response protocols.

---

## ✨ Features

### 🧑‍⚕️ Patient Management

* Complete patient records management
* Detailed medical information tracking:
  * Personal information and demographics
  * Emergency contacts
  * Main diagnoses
  * Functional assessments
  * Hospitalization history
  * Vaccination records
* Medical monitoring:
  * Appointments scheduling and tracking
  * Blood pressure monitoring
  * Medical history documentation
  * Medication records
  * Nurse logs and observations
  * Sugar level tracking
  * Vital signs monitoring

### 🧪 Medical Testing

* **Mini Mental State Examination (MMSE)**
  * Digital form implementation
  * Patient-specific history tracking
  * Comprehensive result analysis
  * PDF report generation
* Daily test management
* Follow-up test tracking system
* Test results history and analytics

### 💊 Medication Tracking

* Comprehensive medication management
* Schedule and dosage tracking
* Medication history documentation
* Alerts and reminders system

### 📊 Dashboard & Analytics

* Patient statistics and metrics
* Test result analytics
* Healthcare trends visualization
* Performance monitoring

### 🚨 Emergency Features

* One-click ambulance dispatch button
* Emergency contact information
* Quick access to critical patient data
* Rapid response system integration

### 🔐 Security & Authentication

* Secure user authentication
* Role-based access control
* Password recovery system
* Session management
* Data encryption

---

## 🛠️ Tech Stack

### 🔹 Frontend

* **Core Framework**: React 19 with Vite
* **State Management**: Zustand 5.0
* **Routing**: React Router DOM 7.5
* **UI Components**: 
  * Material-UI (MUI) 7.1
  * Custom components
  * React Icons 5.5
  * Lucide React 0.510
* **Data Visualization**: 
  * Chart.js 4.5
  * React-ChartJS-2 5.3
* **Date Handling**: date-fns 4.1
* **Notifications**: React-Toastify 11.0

### 🔹 Backend & Database

* **Firebase 11.6**
  * Authentication
  * Firestore Database
  * Real-time data sync
  * Cloud Functions

### 🔹 Document Generation & File Handling

* **PDF Generation**: jsPDF 3.0 with autotable 5.0
* **Excel Handling**: SheetJS (XLSX) 0.18
* **File Management**: File-Saver 2.0

---

## 📁 Project Structure

```
client/
├── src/
│   ├── Components/           # Reusable UI components
│   │   ├── ui/              # Base UI components
│   │   ├── AddToFollowUpButton/
│   │   ├── AmbulanceButton/
│   │   ├── AppointmentTable/
│   │   ├── EmergencyInfo/
│   │   ├── Navigation/
│   │   ├── NurseNotes/
│   │   ├── PatientSearch/
│   │   └── VitalStats/
│   ├── pages/               # Main application pages
│   │   ├── Auth/           # Authentication pages
│   │   ├── Dashboard/      # Analytics dashboard
│   │   ├── MiniMental/     # MMSE implementation
│   │   ├── Patients/       # Patient management
│   │   └── TestList/       # Test management
│   ├── firebase/           # Firebase configuration
│   ├── store/              # Zustand state management
│   ├── utils/              # Utility functions
│   └── assets/             # Static resources
```

---

## ⚙️ Getting Started

### ✅ Prerequisites

* Node.js (v18 or later recommended)
* npm (v9 or later)
* Git

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

3. **Environment Setup**
   Create a `.env` file in the `client/` directory with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 🚀 Development

```bash
# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔒 Security Considerations

* All patient data is encrypted at rest and in transit
* Authentication is required for all protected routes
* Session management with automatic timeout
* Role-based access control implementation
* Regular security audits and updates

---

## 📱 Browser Support

The application is optimized for modern browsers including:
* Chrome (latest)
* Firefox (latest)
* Safari (latest)
* Edge (latest)

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and code of conduct before submitting pull requests.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
