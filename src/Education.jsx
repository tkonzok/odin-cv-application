import { useState } from "react";
import "./App.css";
import Icon from "@mdi/react";
import { mdiPen, mdiTrashCan, mdiPlusCircle } from "@mdi/js";

function DescriptionRow({ description }) {
  return (
    <li className="list-style" key={description}>
      {description}
    </li>
  );
}

function TitleRow({
  id,
  title,
  institute,
  start,
  end,
  editEducation,
  deleteEducation,
  preview,
}) {
  function handleEdit() {
    editEducation(id);
  }

  function handleDelete() {
    deleteEducation(id);
  }

  const startDate =
    start instanceof Date
      ? start.toLocaleDateString("en-EN", {
          year: "numeric",
          month: "short",
        })
      : start;

  let endDate = end;

  if (end instanceof Date) {
    const today = new Date();
    if (
      end.getFullYear() === today.getFullYear() &&
      end.getMonth() === today.getMonth()
    ) {
      endDate = "today";
    } else {
      endDate = end.toLocaleDateString("en-EN", {
        year: "numeric",
        month: "short",
      });
    }
  }

  return (
    <>
      <h3>
        {title} // {institute} // {startDate}
        {" - "}
        {endDate}
      </h3>
      {!preview && (
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

function EducationRow({ education, editEducation, deleteEducation, preview }) {
  return (
    <li key={education}>
      <TitleRow
        id={education.id}
        title={education.title}
        institute={education.institute}
        start={education.start}
        end={education.end}
        editEducation={editEducation}
        deleteEducation={deleteEducation}
        preview={preview}
      />
      <ul>
        {education.description && (
          <DescriptionRow description={education.description} />
        )}
      </ul>
    </li>
  );
}

function EducationListings({
  educations,
  editEducation,
  deleteEducation,
  preview,
}) {
  let rows = [];
  educations.forEach((education) => {
    rows.push(
      <EducationRow
        education={education}
        editEducation={editEducation}
        deleteEducation={deleteEducation}
        preview={preview}
      />
    );
  });
  return <ul>{rows}</ul>;
}

function AddEducation(props) {
  const [newEducation, setNewEducation] = useState({
    id: props.id,
    title: "",
    institute: "",
    start: "",
    end: "",
    description: "",
  });

  function handleEducationChange(e) {
    setNewEducation({
      ...newEducation,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const [startDate, endDate] = convertDates();
    try {
      newEducation.start = startDate;
    } catch (error) {
      console.log(error);
    }
    try {
      newEducation.end = endDate;
    } catch (error) {
      console.log(error);
    }
    props.onSubmit(newEducation);
  }

  function handleCancel() {
    props.formActive();
  }

  function convertDates() {
    let startDate = newEducation.start;
    let endDate = newEducation.end;
    if (!isNaN(new Date(startDate))) {
      startDate = new Date(startDate);
    }
    if (endDate === "today") {
      endDate = new Date();
    } else if (!isNaN(new Date(endDate))) {
      endDate = new Date(endDate);
    }

    return [startDate, endDate];
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Degree: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={newEducation.title}
            onChange={handleEducationChange}
            placeholder="B.Sc / A-Level / ..."
          />
        </div>
        <div>
          <label htmlFor="institute">Institute: </label>
          <input
            type="text"
            name="institute"
            id="institute"
            value={newEducation.institute}
            onChange={handleEducationChange}
            placeholder="University of XY / XY Middle School / ..."
          />
        </div>
        <div>
          <label htmlFor="start">Start Date: </label>
          <input
            type="text"
            name="start"
            id="start"
            value={newEducation.start}
            onChange={handleEducationChange}
            placeholder="YYYY-MM"
          />
        </div>
        <div>
          <label htmlFor="end">End Date: </label>
          <input
            type="text"
            name="end"
            id="end"
            value={newEducation.end}
            onChange={handleEducationChange}
            placeholder="today / YYYY-MM"
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            id="description"
            value={newEducation.description}
            onChange={handleEducationChange}
            placeholder="Final degree / Main courses / ..."
          />
        </div>
        <div>
          <button type="button" id="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" id="submit">
            Add Entry
          </button>
        </div>
      </form>
      <ul className="preview">
        <EducationRow education={newEducation} preview={true} />
      </ul>
    </div>
  );
}

function EditEducation(props) {
  let education = props.education;

  let startString;
  let endString;

  if (education.start.getMonth() < 9) {
    startString = `${education.start.getFullYear()}-0${
      education.start.getMonth() + 1
    }`;
  } else {
    startString = `${education.start.getFullYear()}-${
      education.start.getMonth() + 1
    }`;
  }

  if (education.end.getMonth() < 9) {
    endString = `${education.end.getFullYear()}-0${
      education.end.getMonth() + 1
    }`;
  } else {
    endString = `${education.end.getFullYear()}-${
      education.end.getMonth() + 1
    }`;
  }

  const [editedEducation, setEditedEducation] = useState({
    id: education.id,
    title: education.title,
    institute: education.institute,
    start: startString,
    end: endString,
    description: education.description,
  });

  function handleEducationChange(e) {
    setEditedEducation({
      ...editedEducation,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const [startDate, endDate] = convertDates();
    try {
      editedEducation.start = startDate;
    } catch (error) {
      console.log(error);
    }
    try {
      editedEducation.end = endDate;
    } catch (error) {
      console.log(error);
    }
    props.onSubmit(editedEducation);
  }

  function handleCancel() {
    props.onSubmit(props.education, true);
  }

  function convertDates() {
    let startDate = editedEducation.start;
    let endDate = editedEducation.end;
    if (!isNaN(new Date(startDate))) {
      startDate = new Date(startDate);
    }
    if (endDate === "today") {
      endDate = new Date();
    } else if (!isNaN(new Date(endDate))) {
      endDate = new Date(endDate);
    }

    return [startDate, endDate];
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Education Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={editedEducation.title}
            onChange={handleEducationChange}
          />
        </div>
        <div>
          <label htmlFor="institute">Institute Name: </label>
          <input
            type="text"
            name="institute"
            id="institute"
            value={editedEducation.institute}
            onChange={handleEducationChange}
          />
        </div>
        <div>
          <label htmlFor="start">Start Date: </label>
          <input
            type="text"
            name="start"
            id="start"
            value={editedEducation.start}
            onChange={handleEducationChange}
          />
        </div>
        <div>
          <label htmlFor="end">End Date: </label>
          <input
            type="text"
            name="end"
            id="end"
            value={editedEducation.end}
            onChange={handleEducationChange}
          />
        </div>
        <div>
          <label htmlFor="description">Main Descriptions: </label>
          <input
            type="text"
            name="description"
            id="description"
            value={editedEducation.description}
            onChange={handleEducationChange}
          />
        </div>
        <div>
          <button
            className="btn"
            type="button"
            id="cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="btn" type="submit" id="submit">
            Apply
          </button>
        </div>
      </form>
      <ul className="preview">
        <EducationRow education={editedEducation} preview={true} />
      </ul>
    </div>
  );
}

function Education() {
  const [educations, setEducations] = useState([
    {
      id: 0,
      title: "B.Sc. Media Technology",
      institute: "Hamburg University of Applied Sciences",
      start: new Date("2012-09"),
      end: new Date("2016-07"),
      description: "Final grade: 1.28",
    },
    {
      id: 1,
      title: "Semester Abroad",
      institute: "University of New Orleans",
      start: new Date("2014-08"),
      end: new Date("2014-12"),
      description: "Department Film Arts & Music",
    },
    {
      id: 2,
      title: "Abitur (A-Level)",
      institute: "Ida-Ehre-Schule, Bad Oldesloe",
      start: new Date("2003-08"),
      end: new Date("2012-07"),
      description: "Final Grade: 1.1",
    },
  ]);

  let [id, setId] = useState(3);

  const [formActive, setFormActive] = useState(false);
  const [edit, setEdit] = useState(-1);

  const toggleForm = () => {
    setFormActive((state) => !state);
  };

  const getData = (data) => {
    setEducations([data, ...educations].sort((a, b) => b.end - a.end));
    setFormActive((state) => !state);
    setId(id + 1);
  };

  const getEditData = (data, cancelled = false) => {
    if (cancelled) {
      setEducations([...educations].sort((a, b) => b.end - a.end));
    } else {
      setEducations([data, ...educations].sort((a, b) => b.end - a.end));
    }
    setFormActive((state) => !state);
    setEdit(-1);
  };

  const editEducation = (index) => {
    setFormActive(true);
    setEdit(index);
  };

  const deleteEducation = (index) => {
    setEducations([
      ...educations.filter((education) => education.id !== index),
    ]);
  };

  return (
    <>
      <div className="section">
        <h2>Education</h2>
        {!formActive && (
          <button className="addBtn" onClick={toggleForm}>
            <Icon path={mdiPlusCircle} size={1} />
          </button>
        )}
        {formActive && edit < 0 && (
          <AddEducation id={id} onSubmit={getData} formActive={toggleForm} />
        )}
        {formActive && edit >= 0 && (
          <EditEducation
            education={educations.find((education) => education.id === edit)}
            onSubmit={getEditData}
            formActive={toggleForm}
          />
        )}
        <EducationListings
          educations={educations.filter((education) => education.id !== edit)}
          editEducation={editEducation}
          deleteEducation={deleteEducation}
        />
      </div>
    </>
  );
}

export default Education;
