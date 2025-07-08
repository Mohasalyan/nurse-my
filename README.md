# 🩺 Nurse-My: Healthcare Management System

## 📋 Overview

**Nurse-My** is a comprehensive healthcare management system specifically developed for the Matte Yehuda Veterans Association to digitally manage daily health checks, medications, patient files, and mental health monitoring in a convenient, secure, and accessible way. The system is designed for exclusive use by two authorized nurses working at the veterans' association.

### 🎯 Target Users
- Two authorized nurses at the Matte Yehuda Veterans Association
- Restricted access system with secure authentication

### 💻 System Requirements
- Desktop or laptop computer
- Internet connection
- Modern web browser (Google Chrome or Mozilla Firefox recommended)
- No local installation required - web-based application

---

## ✨ Features

### 🧑‍⚕️ Patient Management

* Complete patient records management with categorization:
  * Active patients
  * Inactive patients
  * Deceased patients
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
  * Vital signs monitoring (blood pressure, sugar, pulse, weight, height)

### 🧪 Medical Testing

* **Mini Mental State Examination (MMSE)**
  * Digital form implementation
  * Patient-specific history tracking
  * Comprehensive result analysis with color-coded results:
    * Green - Normal
    * Orange - Unstable
    * Red - Concerning state
  * PDF report generation
* Daily test management with automatic follow-up flagging
* Follow-up test tracking system
* Test results history and analytics
* Export capabilities to PDF and Excel

### 💊 Medication Tracking

* Comprehensive medication management
* Schedule and dosage tracking
* Medication history documentation
* Active medications list by patient
* Alerts and reminders system

### 📊 Dashboard & Analytics

* Patient statistics and metrics
* Test result analytics
* Healthcare trends visualization
* Performance monitoring
* Quick access to critical information

### 🚨 Emergency Features

* One-click ambulance dispatch button always accessible in the top bar
* Quick patient search in emergency situations
* Critical patient information display:
  * Age
  * Current medications
  * Allergies
  * Emergency contact information
* Rapid response system integration

### 🔐 Security & Authentication

* Secure user authentication
* Role-based access control
* Password recovery system
* Session management
* Data encryption
* Automatic logout for security

---

## 🛠️ Tech Stack

### 🔹 Frontend

* **Core Framework**: React with Vite
* **State Management**: Zustand
* **Routing**: React Router DOM
* **UI Components**: 
  * Material-UI (MUI)
  * Custom components
  * React Icons
  * Lucide React
* **Data Visualization**: 
  * Chart.js
  * React-ChartJS-2
* **Date Handling**: date-fns
* **Notifications**: React-Toastify

### 🔹 Backend & Database

* **Firebase**
  * Authentication
  * Firestore Database
  * Real-time data sync
  * Cloud Functions

### 🔹 Document Generation & File Handling

* **PDF Generation**: jsPDF with autotable
* **Excel Handling**: SheetJS (XLSX)
* **File Management**: File-Saver

---

## 📁 Project Structure

```
client/
├── src/
│   ├── Components/           # Reusable UI components
│   │   ├── ui/              # Base UI components (Accordion, Button, Footer)
│   │   ├── AddToFollowUpButton/
│   │   ├── AmbulanceButton/
│   │   ├── AppointmentTable/
│   │   ├── Card/
│   │   ├── ConfirmLogoutModal/
│   │   ├── ConfirmModal/
│   │   ├── DisclaimerModal/
│   │   ├── EmergencyInfo/
│   │   ├── Exit/
│   │   ├── HomeB/
│   │   ├── Navigation/
│   │   ├── NurseNotes/
│   │   ├── PatientSearch/
│   │   ├── Return/
│   │   ├── Search/
│   │   └── VitalStats/
│   ├── pages/               # Main application pages
│   │   ├── Auth/           # Authentication pages (Login, Register, ForgotPassword)
│   │   ├── DailyTest/      # Daily test management
│   │   ├── Dashboard/      # Analytics dashboard
│   │   ├── FollowUpTests/  # Follow-up test management
│   │   ├── HomePage/       # Landing page
│   │   ├── MedicationTracking/ # Medication management
│   │   ├── MiniMental/     # MMSE implementation
│   │   ├── Patients/       # Patient management
│   │   └── TestList/       # Test management
│   ├── firebase/           # Firebase configuration
│   ├── store/              # Zustand state management
│   ├── utils/              # Utility functions
│   └── assets/             # Static resources (images, fonts)
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

## 🔒 Important Notes

### Data Persistence
* All changes must be explicitly saved using the "Save" button
* Unsaved changes will be lost if the page is closed or the session times out
* The system automatically flags abnormal test results for follow-up

### Disclaimer
⚠️ This system was developed as a student project. The responsibility for its use and the data entered into the system lies solely with the user. The developers, course staff, and academic institution are not responsible for malfunctions, data loss, or medical results arising from the use of the system.

By using this system, the user acknowledges understanding its limitations and agrees to these terms.

### Support Contact
For support and inquiries, contact:
- Name: Mohammad Elayyan
- Phone: 0546103029
