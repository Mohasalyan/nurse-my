import React from "react";
import Card from "../../Components/Card/Card";
import patientsImg from "../../assets/PatientFolder.png";
import Return from "../../Components/Return/Return";
import "./PastPatientsPage.css"; 

const PastPatientsPage = () => {
  return (
    <div className="PastPatientsPage">
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
