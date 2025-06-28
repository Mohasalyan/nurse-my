import React from 'react';
import './FunctionalAssessmentSection.css';

const FunctionalAssessmentSection = ({ assessment, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...assessment, [field]: value });
  };

  return (
    <div className="section-box">
      <div className="section-title">הערכה תפקודית</div>
      <div className="functional-assessment-container">
        <div className="assessment-group">
          <h3>ADL - תפקודי יום יום</h3>
          <div className="assessment-items">
            <div className="assessment-item">
              <label>רחצה</label>
              <select 
                value={assessment.bathing || ''} 
                onChange={(e) => handleChange('bathing', e.target.value)}
              >
                <option value="">בחר...</option>
                <option value="independent">עצמאי</option>
                <option value="partial">עזרה חלקית</option>
                <option value="dependent">תלוי לחלוטין</option>
              </select>
            </div>
            <div className="assessment-item">
              <label>הלבשה</label>
              <select 
                value={assessment.dressing || ''} 
                onChange={(e) => handleChange('dressing', e.target.value)}
              >
                <option value="">בחר...</option>
                <option value="independent">עצמאי</option>
                <option value="partial">עזרה חלקית</option>
                <option value="dependent">תלוי לחלוטין</option>
              </select>
            </div>
            <div className="assessment-item">
              <label>אכילה</label>
              <select 
                value={assessment.eating || ''} 
                onChange={(e) => handleChange('eating', e.target.value)}
              >
                <option value="">בחר...</option>
                <option value="independent">עצמאי</option>
                <option value="partial">עזרה חלקית</option>
                <option value="dependent">תלוי לחלוטין</option>
              </select>
            </div>
            <div className="assessment-item">
              <label>ניידות</label>
              <select 
                value={assessment.mobility || ''} 
                onChange={(e) => handleChange('mobility', e.target.value)}
              >
                <option value="">בחר...</option>
                <option value="independent">עצמאי</option>
                <option value="partial">עזרה חלקית</option>
                <option value="dependent">תלוי לחלוטין</option>
              </select>
            </div>
          </div>
        </div>

        <div className="assessment-group">
          <h3>IADL - תפקודי יום יום מורכבים</h3>
          <div className="assessment-items">
            <div className="assessment-item">
              <label>שימוש בטלפון</label>
              <select 
                value={assessment.phoneUse || ''} 
                onChange={(e) => handleChange('phoneUse', e.target.value)}
              >
                <option value="">בחר...</option>
                <option value="independent">עצמאי</option>
                <option value="partial">עזרה חלקית</option>
                <option value="dependent">תלוי לחלוטין</option>
              </select>
            </div>
            <div className="assessment-item">
              <label>ניהול כספים</label>
              <select 
                value={assessment.financialManagement || ''} 
                onChange={(e) => handleChange('financialManagement', e.target.value)}
              >
                <option value="">בחר...</option>
                <option value="independent">עצמאי</option>
                <option value="partial">עזרה חלקית</option>
                <option value="dependent">תלוי לחלוטין</option>
              </select>
            </div>
            <div className="assessment-item">
              <label>הכנת ארוחות</label>
              <select 
                value={assessment.mealPreparation || ''} 
                onChange={(e) => handleChange('mealPreparation', e.target.value)}
              >
                <option value="">בחר...</option>
                <option value="independent">עצמאי</option>
                <option value="partial">עזרה חלקית</option>
                <option value="dependent">תלוי לחלוטין</option>
              </select>
            </div>
            <div className="assessment-item">
              <label>ניהול משק בית</label>
              <select 
                value={assessment.housekeeping || ''} 
                onChange={(e) => handleChange('housekeeping', e.target.value)}
              >
                <option value="">בחר...</option>
                <option value="independent">עצמאי</option>
                <option value="partial">עזרה חלקית</option>
                <option value="dependent">תלוי לחלוטין</option>
              </select>
            </div>
          </div>
        </div>

        <div className="assessment-group">
          <h3>הערות נוספות</h3>
          <textarea
            value={assessment.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="הערות נוספות לגבי התפקוד"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default FunctionalAssessmentSection; 