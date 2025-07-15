# 🩺 Nurse-My: Healthcare Management System

## 📋 Overview

**Nurse-My** is a comprehensive healthcare management system specifically developed for the Matte Yehuda Veterans Association to digitally manage daily health checks, medications, patient files, and mental health monitoring in a convenient, secure, and accessible way. The system features a complete role-based access control system with admin approval for new users.

### 🎯 Target Users
- **Nurses**: Two authorized nurses at the Matte Yehuda Veterans Association
- **Administrators**: System administrators who manage user access and oversee operations
- **Restricted Access**: Secure authentication with admin approval required for all new users

### 💻 System Requirements
- Desktop or laptop computer
- Internet connection
- Modern web browser (Google Chrome or Mozilla Firefox recommended)
- No local installation required - web-based application

---

## ✨ Features

### 👤 User Management & Authentication

* **Complete Registration Flow:**
  * New user registration with email verification
  * Admin approval required for all new accounts
  * Pending users are held in a waiting queue until approved
  * Email notifications for approval/rejection status
  * Role-based access control (Admin/Nurse)
  * Password recovery system
  * Secure logout with confirmation

* **Admin Dashboard:**
  * User verification and approval system
  * Pending user management panel
  * System oversight and monitoring capabilities
  * Email notification system for user status updates

### 🧑‍⚕️ Patient Management

* **Complete Patient Records Management:**
  * Patient categorization: Active, Inactive, Deceased
  * Comprehensive patient creation and editing
  * Patient deletion with full data cleanup
  * Advanced patient search functionality

* **Detailed Patient Information Tracking:**
  * Personal information and demographics
  * Emergency contacts with multiple contact support
  * Main diagnoses (up to 6 entries)
  * Functional assessments with detailed tracking
  * Hospitalization history
  * Vaccination records
  * Emergency service information
  * Allergies and medical restrictions

* **Medical Monitoring:**
  * Appointments scheduling and tracking
  * Blood pressure monitoring with automated flagging
  * Medical history documentation
  * Medication records with dosage tracking
  * Nurse logs and observations
  * Sugar level tracking with trend analysis
  * Vital signs monitoring (blood pressure, sugar, pulse, weight, height, BMI)
  * Automated follow-up flagging for abnormal results

### 🧪 Medical Testing

* **Mini Mental State Examination (MMSE):**
  * Complete digital MMSE implementation
  * Six test sections: Time Orientation, Place Orientation, Calculation, Memory, Language, and Copy
  * Patient-specific history tracking
  * Comprehensive result analysis with color-coded scoring:
    * **Green (≥24 points)**: Normal mental state
    * **Orange (18-23 points)**: Signs of dementia or cognitive decline  
    * **Red (<18 points)**: Severe cognitive dysfunction
  * PDF report generation
  * Historical test tracking per patient

* **Daily Health Tests:**
  * Comprehensive vital signs recording
  * Automatic patient data integration (age, medications, allergies)
  * Real-time validation and health alerts
  * Automatic follow-up flagging for abnormal values
  * Test history and analytics
  * Patient existence verification before testing

* **Follow-up System:**
  * Automated follow-up list generation based on:
    * Blood pressure abnormalities (>140/90 or <90/60)
    * Blood sugar levels (>180 or <70 mg/dL)
    * BMI concerns (≥30)
    * Pulse irregularities (<60 or >100 bpm)
  * Manual follow-up addition capability
  * Export capabilities to PDF and Excel
  * Follow-up resolution tracking

### 💊 Medication Tracking

* **Comprehensive Medication Management:**
  * Patient-specific medication lists
  * Dosage and frequency tracking
  * Medication status monitoring (taken/not taken)
  * Medication history documentation
  * Medication addition and deletion
  * Active medications filtering
  * Safety alerts for high dosages

### 📊 Dashboard & Analytics

* **Comprehensive Analytics Dashboard (Admin Only):**
  * Patient statistics and metrics
  * New patient tracking (weekly)
  * Critical patient identification
  * Test result analytics with charts:
    * Sugar level trends (Line chart)
    * Blood pressure trends (Line chart)
    * Data distribution (Pie chart)
    * Record comparisons (Bar chart)
  * Performance monitoring
  * Appointment tracking
  * Nurse logs overview
  * Healthcare trends visualization

### 🚨 Emergency Features

* **Instant Emergency Response:**
  * One-click ambulance dispatch button always accessible in top navigation
  * Quick patient search in emergency situations
  * **Emergency Information Display:**
    * Patient personal details (age, ID, address)
    * Current medications with dosages
    * Known allergies and medical restrictions
    * Emergency contact information with phone numbers
    * Emergency service details (company, hours, visiting days)
    * Print-ready emergency information cards
  * Rapid response system integration

### 🔐 Security & Authentication

* **Multi-layer Security System:**
  * Firebase Authentication integration
  * Email verification requirement
  * Admin approval workflow for new users
  * Role-based access control (Admin/Nurse permissions)
  * Protected routes with authentication guards
  * Password recovery system
  * Session management with automatic timeout
  * Secure logout with confirmation modal
  * Data encryption at rest and in transit

### 📧 Email Notification System

* **Automated Email Communications:**
  * User approval/rejection notifications
  * Login button inclusion for approved users
  * EmailJS integration for reliable delivery
  * Customizable email templates

---

## 🛠️ Tech Stack

### 🔹 Frontend

* **Core Framework**: React 19.0.0 with Vite 6.2.0
* **State Management**: Zustand 5.0.4
* **Routing**: React Router DOM 7.5.2
* **UI Components**: 
  * Material-UI (MUI) 7.1.2
  * React Icons 5.5.0
  * Lucide React 0.510.0
  * Custom component library
* **Data Visualization**: 
  * Chart.js 4.5.0
  * React-ChartJS-2 5.3.0
* **Date Handling**: date-fns 4.1.0
* **Notifications**: React-Toastify 11.0.5
* **Email Services**: EmailJS Browser 4.4.1

### 🔹 Backend & Database

* **Firebase 11.6.1:**
  * Authentication with email verification
  * Firestore Database with real-time sync
  * Cloud storage capabilities
  * Analytics integration

### 🔹 Document Generation & File Handling

* **PDF Generation**: jsPDF 3.0.1 with autotable 5.0.2
* **Excel Handling**: SheetJS (XLSX) 0.18.5
* **File Management**: File-Saver 2.0.5

---

## 📁 Project Structure

```
nurse-my/
├── client/
│   ├── src/
│   │   ├── Components/           # Reusable UI components
│   │   │   ├── ui/              # Base UI components
│   │   │   │   ├── Accordion/   # Collapsible content component
│   │   │   │   ├── Button/      # Custom button component
│   │   │   │   └── Footer/      # End-of-page indicator
│   │   │   ├── AddToFollowUpButton/    # Manual follow-up addition
│   │   │   ├── AmbulanceButton/        # Emergency dispatch button
│   │   │   ├── AppointmentTable/       # Appointment display component
│   │   │   ├── Card/                   # Homepage navigation cards
│   │   │   ├── ConfirmLogoutModal/     # Logout confirmation dialog
│   │   │   ├── ConfirmModal/           # Generic confirmation dialog
│   │   │   ├── DisclaimerModal/        # System disclaimer
│   │   │   ├── EmergencyInfo/          # Emergency patient information display
│   │   │   ├── Exit/                   # Logout component
│   │   │   ├── HomeB/                  # Home navigation button
│   │   │   ├── Navigation/             # Main navigation bar
│   │   │   ├── NurseNotes/             # Nurse observation component
│   │   │   ├── PatientSearch/          # Patient search functionality
│   │   │   ├── PendingUsersPanel/      # Admin user approval panel
│   │   │   ├── Return/                 # Back navigation component
│   │   │   ├── Search/                 # Generic search component
│   │   │   └── VitalStats/             # Vital signs display
│   │   ├── pages/               # Main application pages
│   │   │   ├── AdminDashboard/         # Admin user management
│   │   │   ├── AdminSetup/             # Initial admin configuration
│   │   │   ├── Auth/                   # Authentication system
│   │   │   │   ├── Login/              # User login
│   │   │   │   ├── Register/           # User registration
│   │   │   │   └── ForgotPassword/     # Password recovery
│   │   │   ├── DailyTest/              # Daily health check forms
│   │   │   ├── Dashboard/              # Analytics dashboard (Admin)
│   │   │   ├── FollowUpTests/          # Follow-up patient management
│   │   │   ├── HomePage/               # Main landing page
│   │   │   ├── MedicationTracking/     # Medication management
│   │   │   ├── MiniMental/             # MMSE test implementation
│   │   │   │   ├── components/         # MMSE sub-components
│   │   │   │   │   ├── Question/       # Individual test questions
│   │   │   │   │   ├── QuestionGroup/  # Question grouping
│   │   │   │   │   └── ResultBox/      # Test results display
│   │   │   │   ├── MiniMentalForm/     # Main MMSE form
│   │   │   │   └── MiniMentalHistory/  # Historical test results
│   │   │   ├── Patients/               # Patient management system
│   │   │   │   ├── MedicalInfo/        # Medical records dashboard
│   │   │   │   │   └── components/     # Medical info sections
│   │   │   │   │       ├── AppointmentsSection/
│   │   │   │   │       ├── BloodTrackingSection/
│   │   │   │   │       ├── MedicalHistorySection/
│   │   │   │   │       ├── NurseLogsSection/
│   │   │   │   │       ├── SugarTrackingSection/
│   │   │   │   │       └── VitalsSection/
│   │   │   │   ├── PatientsList/       # Patient directory
│   │   │   │   └── PersonalInfo/       # Patient personal information
│   │   │   │       ├── components/     # Personal info sections
│   │   │   │       │   ├── ContactsSection/
│   │   │   │       │   ├── EmergencyServiceSection/
│   │   │   │       │   ├── FunctionalAssessmentSection/
│   │   │   │       │   ├── HospitalizationsSection/
│   │   │   │       │   ├── MainDiagnosesSection/
│   │   │   │       │   ├── MedicationsSection/
│   │   │   │       │   └── VaccinationsSection/
│   │   │   │       └── CreatePatient/  # New patient creation
│   │   │   ├── TestList/               # Test history and records
│   │   │   └── Unauthorized/           # Access denied page
│   │   ├── firebase/           # Firebase configuration
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── useUserRole/   # Role-based access hook
│   │   ├── store/             # Zustand state management
│   │   │   ├── miniMentalStore/  # MMSE test state
│   │   │   └── userStore/        # User authentication state
│   │   ├── utils/             # Utility functions
│   │   │   ├── AlefFont/      # Hebrew font configuration
│   │   │   └── sendEmail/     # Email notification system
│   │   └── assets/            # Static resources
│   │       ├── fonts/         # Custom fonts (Alef Hebrew font)
│   │       └── images/        # UI icons and illustrations
│   ├── public/               # Public assets
│   ├── package.json         # Dependencies and scripts
│   └── vite.config.js       # Vite configuration
└── README.md               # Project documentation
```

---

## ⚙️ Getting Started

### ✅ Prerequisites

* Node.js (v18 or later recommended)
* npm (v9 or later)
* Git
* Firebase project with Firestore enabled
* EmailJS account for notification services

### 📦 Installation

1. **Clone the Repository**

```bash
git clone [repository-url]
cd nurse-my
```

2. **Install Dependencies**

```bash
cd client
npm install
```

3. **Environment Setup**
   Create a `.env` file in the `client/` directory with your Firebase and EmailJS configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# EmailJS Configuration (for user notifications)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Application URL (for email links)
VITE_NURSE_APP_URL=https://your-app-url.com
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

### 🔧 Initial Setup

1. **Firebase Setup:**
   - Create a Firebase project
   - Enable Firestore Database
   - Enable Authentication with Email/Password
   - Configure Firebase Security Rules for your collections

2. **EmailJS Setup:**
   - Create an EmailJS account
   - Set up email service and template
   - Configure template for user approval/rejection notifications

3. **Admin Account Creation:**
   - The first registered user can be manually promoted to admin role in Firebase Console
   - Alternatively, use the AdminSetup page for initial configuration

---

## 🔒 User Registration & Approval Flow

### For New Users:
1. **Registration**: User registers with email and password
2. **Email Verification**: User receives verification email and must verify
3. **Admin Queue**: Verified user is placed in pending approval queue
4. **Admin Review**: Admin reviews and approves/rejects the application
5. **Notification**: User receives email notification of decision
6. **Access Granted**: Approved users can log in and access the system

### For Administrators:
1. **Pending Users Panel**: View all users waiting for approval
2. **User Information Review**: See name, email, and registration details
3. **Approval Actions**: Approve or reject with confirmation dialogs
4. **Automatic Notifications**: System sends email notifications automatically
5. **User Management**: Ongoing oversight of system users

---

## 🔒 Security Considerations

* **Multi-layer Authentication**: Email verification + Admin approval required
* **Role-based Access Control**: Strict separation between Admin and Nurse permissions
* **Data Encryption**: All patient data encrypted at rest and in transit
* **Protected Routes**: Authentication required for all sensitive areas
* **Session Management**: Automatic timeout and secure logout
* **Input Validation**: Real-time validation on all forms (ID verification, etc.)
* **Audit Trail**: Comprehensive logging of user actions
* **Firebase Security Rules**: Database-level access controls

---

## 📱 Browser Support

The application is optimized for modern browsers including:
* Chrome (latest)
* Firefox (latest)
* Safari (latest)
* Edge (latest)

**Note**: Right-to-left (RTL) text support for Hebrew interface elements.

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and code of conduct before submitting pull requests.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🔒 Important Notes

### User Access & Approval
* **All new registrations require admin approval** - no user can access the system without explicit administrator permission
* Users receive email notifications about their application status
* Pending users are held in a separate queue until reviewed

### Data Persistence & Safety
* **All changes must be explicitly saved** using the "Save" button
* Unsaved changes will be lost if the page is closed or session times out
* **Automatic follow-up flagging** for abnormal test results based on medical thresholds
* Patient data validation ensures data integrity (9-digit ID verification, etc.)

### Emergency Procedures
* **Ambulance button** is always accessible in the top navigation for emergency situations
* Emergency patient information includes critical details needed for first responders
* **Print-ready emergency cards** can be generated instantly

### System Limitations & Disclaimer
⚠️ **Important**: This system was developed as a student project for the Matte Yehuda Veterans Association. The responsibility for its use and the data entered into the system lies solely with the user. The developers, course staff, and academic institution are not responsible for malfunctions, data loss, or medical results arising from the use of the system.

By using this system, the user acknowledges understanding its limitations and agrees to these terms.

---

## 📞 Support & Contact

For technical support and inquiries:
- **Contact**: Mohammad Elayyan
- **Phone**: 0546103029

For system administration and user approval issues, please contact your local system administrator.


