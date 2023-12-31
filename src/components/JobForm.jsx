import React, { useState } from "react";
import axios from "axios";
import FormInput from "./FormInput";
//Going to try adding the Form here:
const JobForm = ({ onJobSubmit }) => {
  const [values, setValues] = useState({
    company: "",
    job_title: "",
    job_posting: "",
    date_applied: "",
    notes: "",
  });
  const inputs = [
    {
      id: 1,
      name: "company",
      type: "text",
      placeholder: "Company",
      errorMessage: "You left Company Blank",
      label: "Company",
      required: false,
      autoFocus: true,
    },
    {
      id: 2,
      name: "job_title",
      type: "text",
      placeholder: "Job Title",
      errorMessage: "You at least need this one",
      label: "Job Title",
      required: true,
    },
    {
      id: 3,
      name: "job_posting",
      type: "text",
      placeholder: "Job Posting",
      errorMessage: "You at least need this one",
      label: "Job Posting",
      required: false,
    },
    {
      id: 4,
      name: "date_applied",
      type: "date",
      placeholder: "Date Applied",
      errorMessage: "",
      label: "Date Applied",
    },
    {
      id: 5,
      name: "notes",
      type: "text",
      placeholder: "Notes",
      errorMessage: "",
      label: "Notes",
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(values);
  };

  //This maybe should be in App.jsx with the other api calls?
  //At some point Ill restructure this whole app to be more organized. lol, no you will.
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/job", values)
      .then((response) => {
        //Since the id is created on the server side I need to send it to the client side
        //After I post, I am getting the ID that the server created and sending it to my client
        values.job_id = response.data.insertId;
        onJobSubmit(values);
      })
      .catch((error) => {
        console.error(`There was an error posting the job: ${error}`);
      });
  };
  return (
    <>
      <h2>Add a job</h2>
      <form onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            autoFocus={index === 0}
          />
        ))}
        <button>Submit</button>
      </form>
    </>
  );
};

export default JobForm;
