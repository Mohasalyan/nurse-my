import React from "react";
import Card from "../../Components/Card/Card";
import HomeB from "../../Components/HomeB/HomeB";
import patientsImg from "../../assets/PatientFolder.png";
import homeIcon from "../../assets/Home.png";
import Exit from "../../Components/Exit/Exit";



const PatientRec = () => {
  return (
    <div className="PatientRec">

<div className="home-icon">
      <HomeB
          image={homeIcon}
          style={{ width: "50px", height: "50px", marginBottom: "40px",  backgroundColor: "#f5f5f5" }}
          to="/home" // Replace with the correct path
        />
      </div>

     

      {/* الشبكة */}
      <div className="card-grid">
        {/* <Card image={patientsImg}  /> */}
        <Card
          image={patientsImg}
          title=" מטופלים בעבר"
          color="#808080"
          to="/home" // Replace with the correct path
        />
        <Card
          image={patientsImg}
          title=" מטופלים נוכחיים"
          to="/home" // Replace with the correct path
        />
        {/* <Card image={patientsImg} title=" מטופלים נוכחיים" color="#7bb08e" /> */}
      </div>


    </div>


  );
};

export default PatientRec;
