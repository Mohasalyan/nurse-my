import React from "react";
import Card from "../../Components/Card/Card";
import patientsImg from "../../assets/PatientFolder.png";
import homeIcon from "../../assets/Home.png";
import Exit from "../../Components/Exit/Exit";



const PatientRec = () => {
  return (
    <div className="PatientRec">

      <div className="exit-icon">
        <Exit
          title="יציאה"
          to="/login" // Replace with the correct path
        />
      </div>

      {/* زر الهوم */}
      <div className="home-icon">
        <img src={homeIcon} alt="Home" />
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
