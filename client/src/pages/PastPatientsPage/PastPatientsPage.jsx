import React from "react";
import Card from "../../Components/Card/Card";
import HomeB from "../../Components/HomeB/HomeB";
import patientsImg from "../../assets/PatientFolder.png";
import homeIcon from "../../assets/Home.png";
import Exit from "../../Components/Exit/Exit";

// import "./PastPatientPage.css"; // Import the CSS file for styling



const PastPatientsPage = () => {
  return (
    <div className="PastPatientsPage">

      <div className="exit-icon">
        <Exit
          title="יציאה"
          to="/login" // Replace with the correct path
        />
      </div>

      <div className="home-icon">
      <HomeB
          image={homeIcon}
          style={{ width: "50px", height: "50px", marginBottom: "40px",  backgroundColor: "#f5f5f5" }}
          to="/home" // Replace with the correct path
        />
          </div>

          <div className="card-grid">

        <Card
          image={patientsImg}
          title=" מטופלים שנפטרו"
          color="#000000"
          to="/home" // Replace with the correct path
        />
        <Card
          image={patientsImg}
          title=" מטופלים שעזבו"
          to="/home" // Replace with the correct path
        />
       
      </div>


    </div>


  );
};

export default PastPatientsPage;
