import { useState } from "react";
import "./App.css";
import Icon from "@mdi/react";
import { mdiPen, mdiTrashCan, mdiPlusCircle } from "@mdi/js";

function TaskRow({ task }) {
  return (
    <li className="list-style" key={task}>
      {task}
    </li>
  );
}

function TitleRow({
  id,
  title,
  company,
  start,
  end,
  editJob,
  deleteJob,
  preview,
}) {
  function handleEdit() {
    editJob(id);
  }

  function handleDelete() {
    deleteJob(id);
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
        {title} // {company} // {startDate}
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

function JobRow({ job, editJob, deleteJob, preview }) {
  let tasks = [];
  if (job.task1) {
    tasks.push(<TaskRow task={job.task1} />);
  }
  if (job.task2) {
    tasks.push(<TaskRow task={job.task2} />);
  }
  if (job.task3) {
    tasks.push(<TaskRow task={job.task3} />);
  }
  return (
    <li key={job}>
      <TitleRow
        id={job.id}
        title={job.title}
        company={job.company}
        start={job.start}
        end={job.end}
        editJob={editJob}
        deleteJob={deleteJob}
        preview={preview}
      />
      <ul>{tasks}</ul>
    </li>
  );
}

function JobListings({ jobs, editJob, deleteJob }) {
  let rows = [];
  jobs.forEach((job) => {
    rows.push(<JobRow job={job} editJob={editJob} deleteJob={deleteJob} />);
  });
  return <ul>{rows}</ul>;
}

function AddJob(props) {
  const [newJob, setNewJob] = useState({
    id: props.id,
    title: "",
    company: "",
    start: "",
    end: "",
    task1: "",
    task2: "",
    task3: "",
  });

  function handleJobChange(e) {
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const [startDate, endDate] = convertDates();
    try {
      newJob.start = startDate;
    } catch (error) {
      console.log(error);
    }
    try {
      newJob.end = endDate;
    } catch (error) {
      console.log(error);
    }
    props.onSubmit(newJob);
  }

  function handleCancel() {
    props.formActive();
  }

  function convertDates() {
    let startDate = newJob.start;
    let endDate = newJob.end;
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
          <label htmlFor="title">Job Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={newJob.title}
            onChange={handleJobChange}
            placeholder="Engineer / Developer / ..."
          />
        </div>
        <div>
          <label htmlFor="company">Company Name: </label>
          <input
            type="text"
            name="company"
            id="company"
            value={newJob.company}
            onChange={handleJobChange}
            placeholder="Supercool Company Inc."
          />
        </div>
        <div>
          <label htmlFor="start">Start Date: </label>
          <input
            type="text"
            name="start"
            id="start"
            value={newJob.start}
            onChange={handleJobChange}
            placeholder="YYYY-MM"
          />
        </div>
        <div>
          <label htmlFor="end">End Date: </label>
          <input
            type="text"
            name="end"
            id="end"
            value={newJob.end}
            onChange={handleJobChange}
            placeholder="today / YYYY-MM"
          />
        </div>
        <div>
          <label htmlFor="task1">Main Tasks: </label>
          <input
            type="text"
            name="task1"
            id="task1"
            value={newJob.task1}
            onChange={handleJobChange}
            placeholder="Responsible for ..."
          />
        </div>
        <div>
          <label htmlFor="task2">Further Tasks: </label>
          <input
            type="text"
            name="task2"
            id="task2"
            value={newJob.task2}
            onChange={handleJobChange}
            placeholder="Supporting ..."
          />
        </div>
        <div>
          <label htmlFor="task3">Further Tasks: </label>
          <input
            type="text"
            name="task3"
            id="task3"
            value={newJob.task3}
            onChange={handleJobChange}
            placeholder="Not to forget ..."
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
        <JobRow job={newJob} preview={true} />
      </ul>
    </div>
  );
}

function EditJob(props) {
  let job = props.job;

  let startString;
  let endString;

  if (job.start.getMonth() < 9) {
    startString = `${job.start.getFullYear()}-0${job.start.getMonth() + 1}`;
  } else {
    startString = `${job.start.getFullYear()}-${job.start.getMonth() + 1}`;
  }

  if (job.end.getMonth() < 9) {
    endString = `${job.end.getFullYear()}-0${job.end.getMonth() + 1}`;
  } else {
    endString = `${job.end.getFullYear()}-${job.end.getMonth() + 1}`;
  }

  const [editedJob, setEditedJob] = useState({
    id: job.id,
    title: job.title,
    company: job.company,
    start: startString,
    end: endString,
    task1: job.task1,
    task2: job.task2,
    task3: job.task3,
  });

  function handleJobChange(e) {
    setEditedJob({
      ...editedJob,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const [startDate, endDate] = convertDates();
    try {
      editedJob.start = startDate;
    } catch (error) {
      console.log(error);
    }
    try {
      editedJob.end = endDate;
    } catch (error) {
      console.log(error);
    }
    props.onSubmit(editedJob);
  }

  function handleCancel() {
    props.onSubmit(props.job, true);
  }

  function convertDates() {
    let startDate = editedJob.start;
    let endDate = editedJob.end;
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
          <label htmlFor="title">Job Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={editedJob.title}
            onChange={handleJobChange}
          />
        </div>
        <div>
          <label htmlFor="company">Company Name: </label>
          <input
            type="text"
            name="company"
            id="company"
            value={editedJob.company}
            onChange={handleJobChange}
          />
        </div>
        <div>
          <label htmlFor="start">Start Date: </label>
          <input
            type="text"
            name="start"
            id="start"
            value={editedJob.start}
            onChange={handleJobChange}
          />
        </div>
        <div>
          <label htmlFor="end">End Date: </label>
          <input
            type="text"
            name="end"
            id="end"
            value={editedJob.end}
            onChange={handleJobChange}
          />
        </div>
        <div>
          <label htmlFor="task1">Main Tasks: </label>
          <input
            type="text"
            name="task1"
            id="task1"
            value={editedJob.task1}
            onChange={handleJobChange}
          />
        </div>
        <div>
          <label htmlFor="task2">Further Tasks: </label>
          <input
            type="text"
            name="task2"
            id="task2"
            value={editedJob.task2}
            onChange={handleJobChange}
          />
        </div>
        <div>
          <label htmlFor="task3">Further Tasks: </label>
          <input
            type="text"
            name="task3"
            id="task3"
            value={editedJob.task3}
            onChange={handleJobChange}
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
        <JobRow job={editedJob} preview={true} />
      </ul>
    </div>
  );
}

function WorkExperience() {
  const [jobs, setJobs] = useState([
    {
      id: 0,
      title: "Project Engineer",
      company: "Amptown System Company GmbH",
      start: new Date("2016-08"),
      end: new Date("2023-06"),
      task1:
        "Design, enigneering, configuration and commissioning of video technology and media control systems on cruise ship newbuildings (AIDA, Costa, Royal Caribbean, Genting).",
      task2:
        "Technical project management, engineering, configuration and commissioning in the project 'Media technology modernization lecture hall' at the headquarters of tesa SE.",
      task3:
        "Technical pre-sales support and consulting, focus on moving from face-to-face meetings to livestreaming and hybrid meetings in corporate environments.",
    },
    {
      id: 1,
      title: "Working Student in Engineering Department",
      company: "Amptown System Company GmbH",
      start: new Date("2015-09"),
      end: new Date("2016-07"),
      task1: "Configuration of devices.",
      task2:
        "Commissioning of video technology on cruise ship 'Ovation of the Seas'.",
      task3:
        "Practice-integrated bachelor thesis on the topic of color calibration from multi-projections.",
    },
  ]);

  let [id, setId] = useState(2);

  const [formActive, setFormActive] = useState(false);
  const [edit, setEdit] = useState(-1);

  const toggleForm = () => {
    setFormActive((state) => !state);
  };

  const getData = (data) => {
    setJobs([data, ...jobs].sort((a, b) => b.end - a.end));
    setFormActive((state) => !state);
    setId(id + 1);
  };

  const getEditData = (data, cancelled = false) => {
    if (cancelled) {
      setJobs([...jobs].sort((a, b) => b.end - a.end));
    } else {
      setJobs([data, ...jobs].sort((a, b) => b.end - a.end));
    }
    setFormActive((state) => !state);
    setEdit(-1);
  };

  const editJob = (index) => {
    setFormActive(true);
    setEdit(index);
  };

  const deleteJob = (index) => {
    setJobs([...jobs.filter((job) => job.id !== index)]);
  };

  return (
    <>
      <div className="section">
        <h2>Work Experience</h2>
        {!formActive && (
          <button className="addBtn" onClick={toggleForm}>
            <Icon path={mdiPlusCircle} size={1} />
          </button>
        )}
        {formActive && edit < 0 && (
          <AddJob id={id} onSubmit={getData} formActive={toggleForm} />
        )}
        {formActive && edit >= 0 && (
          <EditJob
            job={jobs.find((job) => job.id === edit)}
            onSubmit={getEditData}
            formActive={toggleForm}
          />
        )}
        <JobListings
          jobs={jobs.filter((job) => job.id !== edit)}
          editJob={editJob}
          deleteJob={deleteJob}
        />
      </div>
    </>
  );
}

export default WorkExperience;
