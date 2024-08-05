import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMember } from "../../redux/actions";
import "../../CSS Files/EditMemberComp.css";

const EditMemberComp = ({ memberId, onCancel }) => {
  const dispatch = useDispatch();
  const member = useSelector((state) =>
    state.members.members.find((m) => m._id === memberId)
  );

  const [name, setName] = useState(member ? member.Name : "");
  const [email, setEmail] = useState(member ? member.Email : "");
  const [city, setCity] = useState(member ? member.City : "");

  useEffect(() => {
    if (member) {
      setName(member.Name);
      setEmail(member.Email);
      setCity(member.City);
    }
  }, [member]);

  const handleUpdate = () => {
    const updatedMember = { Name: name, Email: email, City: city };
    dispatch(updateMember(member._id, updatedMember)).then(() => {
      onCancel();
    });
  };

  return (
    <div className="edit-member-container-unique">
      <h1 className="edit-member-title-unique">Edit Member</h1>
      <div className="input-group-unique">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group-unique">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-group-unique">
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="edit-member-actions-unique">
        <button
          className="action-button-unique save-button-unique"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className="action-button-unique cancel-button-unique"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditMemberComp;
