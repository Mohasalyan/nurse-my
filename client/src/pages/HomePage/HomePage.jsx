// // src/pages/HomePage.jsx
// import React from "react";
// import Card from "../../Components/Card/Card";
// import Exit from "../../Components/Exit/Exit";
// import HomeB from "../../Components/HomeB/HomeB";
// import medicationImg from "../../assets/medicine.png";
// import trackingImg from "../../assets/medicalReport.png";
// import brainImg from "../../assets/brainPic.png";
// import patientsImg from "../../assets/PatientFolder.png";
// import heartMonitorImg from "../../assets/HeartRate.png";
// import homeIcon from "../../assets/Home.png";

// import "./HomePage.css";  // سنعمل له ملف CSS خارجي كمان

// const HomePage = () => {
//   return (
//     <div className="homepage">

//       <div className="exit-icon">
//         <Exit
//           title="יציאה"
//           to="/login"
//         />
//       </div>

//       <div className="home-icon">
//       <HomeB
//           image={homeIcon}
//           style={{ width: "50px", height: "50px",  backgroundColor: "#f5f5f5" }}
//           to="/home" 
//         />
//       </div>

//       <div className="card-grid">

//         <div className="left-cards">
//           <Card
//             image={medicationImg}
//             title="תרופות"
//             to="/medication" // Replace with the correct path
//           />
//           <Card
//             image={trackingImg}
//             title="רשימת מעקב"
//             to="/tracking" // Replace with the correct path
//           />
//           <Card
//             image={brainImg}
//             title="מינימנטל"
//             to="/minimental" // Replace with the correct path
//           />
//           <Card
//             image={patientsImg}
//             title="תיקי חולים"
//             to="/patientrec" 
//           />
//         </div>

//         <div className="big-card">
//           <Card
//             image={heartMonitorImg}
//             title="בדיקה חדשה"
//             to="/dailytest" 
//             style={{ width: "440px", height: "430px" }}
//           />

//         </div>

//       </div>

//     </div>
//   );
// };

// export default HomePage;

import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../../Components/Card/Card";
import Exit from "../../Components/Exit/Exit";
import HomeB from "../../Components/HomeB/HomeB";
import medicationImg from "../../assets/medicine.png";
import trackingImg from "../../assets/medicalReport.png";
import brainImg from "../../assets/brainPic.png";
import patientsImg from "../../assets/PatientFolder.png";
import heartMonitorImg from "../../assets/HeartRate.png";
import homeIcon from "../../assets/Home.png";
import "./HomePage.css";

const HomePage = () => {
  const location = useLocation();
  const username = location.state?.username || "מִשׁתַמֵשׁ";

  return (
    <div className="homepage">
      <div className="exit-icon">
        <Exit title="יציאה" to="/login" />
      </div>

      <div className="home-icon">
        <HomeB image={homeIcon} style={{ width: "50px", height: "50px" }} to="/home" />
      </div>

      <h2 className="welcome-message">ברוך הבא, {username}!</h2>

      <div className="card-grid">
        <div className="left-cards">
          <Card image={medicationImg} title="תרופות" to="/medication" />
          <Card image={trackingImg} title="רשימת מעקב" to="/tracking" />
          <Card image={brainImg} title="מינימנטל" to="/minimental" />
          <Card image={patientsImg} title="תיקי חולים" to="/patientrec" />
        </div>

        <div className="big-card">
          <Card image={heartMonitorImg} title="בדיקה חדשה" to="/dailytest" style={{ width: "440px", height: "430px" }} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
