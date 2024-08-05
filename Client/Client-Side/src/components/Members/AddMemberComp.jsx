// AddMemberComp.jsx

import "../../CSS Files/AddMemberComp.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMember } from "../../redux/actions";

const AddMemberComp = ({ onCancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSave = async () => {
    const memberData = {
      Name: name,
      Email: email,
      City: city,
    };
    await dispatch(addMember(memberData));
    console.log("Dispatched addMember with data:", memberData);
    onCancel();
  };

  return (
    <>
      <div className="add-member-card">
        <h2 className="add-member-title">Add New Member</h2>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="add-member-actions">
          <button className="action-button save-button" onClick={handleSave}>
            Save
          </button>
          <button className="action-button cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default AddMemberComp;
