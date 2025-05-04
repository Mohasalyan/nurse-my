import React from "react";
import Card from "../../Components/Card/Card";
import HomeB from "../../Components/HomeB/HomeB";
import patientsImg from "../../assets/PatientFolder.png";
import homeIcon from "../../assets/Home.png";
import Exit from "../../Components/Exit/Exit";
import "./PatientRec.css"; // Import the CSS file for styling


const PatientRec = () => {
  return (
    <div className="patientrec">

      <div className="exit-icon">
        <Exit
          title="יציאה"
          to="/login" // Replace with the correct path
        />
      </div>

      <div className="home-icon">
        <HomeB
            image={homeIcon}
            style={{ width: "50px", height: "50px",  backgroundColor: "#f5f5f5" }}
            to="/home" 
          />
        </div>

      <div className="cards-grid">
        <Card
          image={patientsImg}
          title=" מטופלים בעבר"
          color="#808080"
          to="/pastrec" 
        />
        <Card
          image={patientsImg}
          title=" מטופלים נוכחיים"
          to="/home" // Replace with the correct path
        />
      </div>


    </div>


  );
};

export default PatientRec;
