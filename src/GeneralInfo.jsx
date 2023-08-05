import { useState } from "react";
import "./App.css";

function BulletpointRow({ bulletpoint }) {
  return <p>{bulletpoint}</p>;
}

function FullNameRow({ id, fullname, editInfo, deleteInfo }) {
  function handleEdit() {
    editInfo(id);
  }

  function handleDelete() {
    deleteInfo(id);
  }

  return (
    <>
      {fullname !== "" && <button onClick={handleEdit}>Edit</button>}
      <h1>{fullname}</h1>
    </>
  );
}

function InfoRow({ info, editInfo }) {
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
      <FullNameRow id={info.id} fullname={info.fullname} editInfo={editInfo} />
      {bulletpoints}
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
      <form onSubmit={handleSubmit}>
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
      <ul>
        <InfoRow info={newInfo} />
      </ul>
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
    props.onSubmit(props.info, true);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            Apply Changes
          </button>
        </div>
      </form>
      <ul>
        <InfoRow info={editedInfo} />
      </ul>
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

  const getEditData = (data, cancelled = false) => {
    if (cancelled) {
      setInfo(...info);
    } else {
      setInfo(data);
    }
    setFormActive((state) => !state);
    setEdit(-1);
  };

  const editInfo = () => {
    setFormActive(true);
    setEdit(1);
  };

  return (
    <>
      <div className="section">
        {info.fullname === "" && !formActive && (
          <button onClick={toggleForm}>Add Infos</button>
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
        {!formActive && <InfoRow info={info} editInfo={editInfo} />}
      </div>
    </>
  );
}

export default GeneralInfo;
