import React, { useState } from "react";

const Home = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("inputs", inputs);
    if (editClick) {
      const tempTableData = tableData;
      Object.assign(tempTableData[editIndex], inputs);
      setTableData([...tempTableData]);
      setEditClick(false);
      setInputs({
        name: "",
        email: "",
      });
    } else {
      setTableData([...tableData, inputs]);
      setInputs({
        name: "",
        email: "",
      });
    }
  };

  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
  };
  const handleEdit = (index) => {
    const tempData = tableData[index];

    setInputs({ name: tempData.name, email: tempData.email });
    setEditClick(true);
    setEditIndex(index);
  };
  return (
    <div>
      <h1>CRUD</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name : </label>
            <input name="name" value={inputs.name} onChange={handleChange} />
          </div>
          <div>
            <label>Email : </label>
            <input name="email" value={inputs.email} onChange={handleChange} />
          </div>
          <button type="submit">{editClick ? "update" : "Add"}</button>
        </form>
      </div>

      <div>
        <div className="data_val">
          <h4>Name</h4>
          <h4>Email</h4>
          <h4>Action</h4>
        </div>

        {tableData.map((item, i) => (
          <div className="data_val">
            <div>{item.name}</div>
            <div>{item.email}</div>
            <div className="data_val">
              <button onClick={() => handleEdit(i)}>Edit</button>
              <button onClick={() => handleDelete(i)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
