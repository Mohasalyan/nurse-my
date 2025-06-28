import React from 'react';
import './ContactsSection.css';

const ContactsSection = ({ contacts, onContactsChange }) => {
  const handleContactChange = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    onContactsChange(newContacts);
  };

  const addContact = () => {
    onContactsChange([...contacts, {
      name: "",
      relationship: "",
      address: "",
      phone: "",
      mobile: "",
    }]);
  };

  const removeContact = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    onContactsChange(newContacts);
  };

  return (
    <div className="section-box">
      <div className="section-title">אנשי קשר</div>
      <div className="contacts-container">
        {contacts.map((contact, index) => (
          <div key={index} className="contact-item">
            {index > 0 && (
              <button 
                type="button" 
                className="remove-contact-button"
                onClick={() => removeContact(index)}
              >
                ❌ הסר איש קשר
              </button>
            )}
            <div className="form-grid">
              <div className="form-field">
                <label>שם</label>
                <input
                  value={contact.name}
                  onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>קרבה</label>
                <input
                  value={contact.relationship}
                  onChange={(e) => handleContactChange(index, 'relationship', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>טלפון</label>
                <input
                  value={contact.phone}
                  onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>נייד</label>
                <input
                  value={contact.mobile}
                  onChange={(e) => handleContactChange(index, 'mobile', e.target.value)}
                />
              </div>
              <div className="form-field full-width">
                <label>כתובת</label>
                <input
                  value={contact.address}
                  onChange={(e) => handleContactChange(index, 'address', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
        <button 
          type="button" 
          className="add-contact-button"
          onClick={addContact}
        >
          ➕ הוסף איש קשר
        </button>
      </div>
    </div>
  );
};

export default ContactsSection; 