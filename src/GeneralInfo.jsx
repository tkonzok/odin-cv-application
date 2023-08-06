import { useState } from "react";
import "./App.css";
import Icon from "@mdi/react";
import { mdiPen, mdiTrashCan, mdiPlusCircle } from "@mdi/js";

function BulletpointRow({ bulletpoint }) {
  return <p>{bulletpoint}</p>;
}

function FullNameRow({ fullname, editInfo, deleteInfo }) {
  function handleEdit() {
    editInfo();
  }

  function handleDelete() {
    deleteInfo();
  }

  return (
    <>
      <h1>{fullname}</h1>
      {fullname !== "" && (
        <div className="icons">
          <button className="editBtn" onClick={handleEdit}>
            <Icon path={mdiPen} size={1} />
          </button>
          <button className="deleteBtn" onClick={handleDelete}>
            <Icon path={mdiTrashCan} size={1} />
          </button>
        </div>
      )}
    </>
  );
}

function InfoRow({ info, editInfo, deleteInfo }) {
  let bulletpoints = [];
  if (info.email) {
    bulletpoints.push(<BulletpointRow bulletpoint={info.email} />);
  }
  if (info.phone) {
    bulletpoints.push(<BulletpointRow bulletpoint={info.phone} />);
  }
  if (info.location) {
    bulletpoints.push(<BulletpointRow bulletpoint={info.location} />);
  }
  return (
    <>
      <FullNameRow
        fullname={info.fullname}
        editInfo={editInfo}
        deleteInfo={deleteInfo}
      />
      <div className="bulletpoints">{bulletpoints}</div>
    </>
  );
}

function AddInfo(props) {
  const [newInfo, setNewInfo] = useState({
    fullname: "",
    email: "",
    phone: "",
    location: "",
  });

  function handleInfoChange(e) {
    setNewInfo({
      ...newInfo,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(newInfo);
  }

  function handleCancel() {
    props.formActive();
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Full Name: </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={newInfo.fullname}
            onChange={handleInfoChange}
            placeholder="Max Mustermann"
          />
        </div>
        <div>
          <label htmlFor="company">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={newInfo.email}
            onChange={handleInfoChange}
            placeholder="xy@z.com"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={newInfo.phone}
            onChange={handleInfoChange}
            placeholder="+49 123 456 789 10"
          />
        </div>
        <div>
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            name="location"
            id="location"
            value={newInfo.location}
            onChange={handleInfoChange}
            placeholder="Hamburg, Germany"
          />
        </div>
        <div>
          <button type="button" id="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" id="submit">
            Apply
          </button>
        </div>
      </form>
      <div className="preview">
        <InfoRow info={newInfo} />
      </div>
    </div>
  );
}

function EditInfo(props) {
  let info = props.info;

  const [editedInfo, setEditedInfo] = useState({
    fullname: info.fullname,
    email: info.email,
    phone: info.phone,
    location: info.location,
  });

  function handleInfoChange(e) {
    setEditedInfo({
      ...editedInfo,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(editedInfo);
  }

  function handleCancel() {
    props.onSubmit(props.info);
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Full Name: </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={editedInfo.fullname}
            onChange={handleInfoChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={editedInfo.email}
            onChange={handleInfoChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={editedInfo.phone}
            onChange={handleInfoChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            name="location"
            id="location"
            value={editedInfo.location}
            onChange={handleInfoChange}
          />
        </div>
        <div>
          <button type="button" id="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" id="submit">
            Apply
          </button>
        </div>
      </form>
      <div>
        <InfoRow info={editedInfo} />
      </div>
    </div>
  );
}

function GeneralInfo() {
  const [info, setInfo] = useState({
    fullname: "Tobias Konzok",
    email: "konzok.tobias@gmail.com",
    phone: "+4915789608114",
    location: "Meddewade, Germany",
  });

  const [formActive, setFormActive] = useState(false);
  const [edit, setEdit] = useState(-1);

  const toggleForm = () => {
    setFormActive((state) => !state);
  };

  const getData = (data) => {
    setInfo(data);
    setFormActive((state) => !state);
  };

  const getEditData = (data) => {
    setInfo(data);
    setFormActive((state) => !state);
    setEdit(-1);
  };

  const editInfo = () => {
    setFormActive(true);
    setEdit(1);
  };

  const deleteInfo = () => {
    setInfo({
      fullname: "",
      email: "",
      phone: "",
      location: "",
    });
  };

  return (
    <>
      <div className="section">
        {info.fullname === "" && !formActive && (
          <button className="addBtn" onClick={toggleForm}>
            <Icon path={mdiPlusCircle} size={1} />
          </button>
        )}
        {formActive && edit < 0 && (
          <AddInfo onSubmit={getData} formActive={toggleForm} />
        )}
        {formActive && edit >= 0 && (
          <EditInfo
            info={info}
            onSubmit={getEditData}
            formActive={toggleForm}
          />
        )}
        {!formActive && (
          <InfoRow info={info} editInfo={editInfo} deleteInfo={deleteInfo} />
        )}
      </div>
    </>
  );
}

export default GeneralInfo;
