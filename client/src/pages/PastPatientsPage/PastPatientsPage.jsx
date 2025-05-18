import React from "react";
import Card from "../../Components/Card/Card";
import HomeB from "../../Components/HomeB/HomeB";
import patientsImg from "../../assets/PatientFolder.png";
import homeIcon from "../../assets/Home.png";
import Exit from "../../Components/Exit/Exit";
import "./PastPatientsPage.css"; 
import Return from "../../Components/Return/Return";



const PastPatientsPage = () => {
  return (
    <div className="PastPatientsPage">
      <div className="exit-icon">
        <Exit
          title="יציאה"
          to="/login" // Replace with the correct path
        />
      </div>

      <div className="home">
        <HomeB
          image={homeIcon}
          style={{ width: "55px", height: "55px" }}
          to="/home"
        />
      </div>
      
      <div className="return-icon">
        <Return
          title="חזור"
          to="/patientrec"
        />
      </div>


      <div className="cards-grid">
        <Card
          image={patientsImg}
          title=" מטופלים שנפטרו"
          color="#000000"
          to="/home" // Replace with the correct path
        />
        <Card
          image={patientsImg}
          title=" מטופלים שעזבו"
          color="#808080"
          to="/home" // Replace with the correct path
        />

      </div>
    </div>


  );
};

export default PastPatientsPage;
