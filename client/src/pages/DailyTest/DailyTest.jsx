import React from "react";
import HomeB from "../../Components/HomeB/HomeB";
import homeIcon from "../../assets/Home.png";
import Exit from "../../Components/Exit/Exit";
import "./DailyTest.css"; 

const DailyTest = () => {
    return (
      <div className="dailytest">
  
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

        </div>


);
};

export default DailyTest;