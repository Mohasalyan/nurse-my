import React from "react";
import Card from "../../Components/Card/Card";    
import patientsImg from "../../assets/PatientFolder.png";       
import homeIcon from "../../assets/Home.png";



const PatientRec = () => {
  return (
    <div className="PatientRec">
      {/* زر الخروج */}
      <button className="logout-button">יציאה</button>

      {/* زر الهوم */}
      <div className="home-icon">
      <img src={homeIcon} alt="Home" />
      </div>

      {/* الشبكة */}
      <div className="card-grid">
  <div className="left-cards">
 
    <Card image={patientsImg} title=" מטופלים בעבר"  color="#808080" />
       <Card image={patientsImg} title=" מטופלים נוכחיים" color="#7bb08e" />
  </div>

</div>

    </div>
  );
};

export default PatientRec;
