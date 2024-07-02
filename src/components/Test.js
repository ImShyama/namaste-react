import { useState } from "react";

const Test = () => {
  const [select2Data, setSelect2Data] = useState([]);
  const mockData = {
    ind: {
      id: 1,
      name: "India",
      city: ["banglor", "delhi", "mumbai"],
    },
    Nep: {
      id: 2,
      name: "Nepal",
      city: ["kathmandu", "Pokhara", "Biratnagar"],
    },
  };

  const updateSecondDrop = (id) => {
    const selectedCity = Object.entries(mockData).filter(([key, value]) => {
      return value.id == id;
    });
    setSelect2Data(selectedCity[0][1].city)
  };

  return (
    <div>
      <h1>Dependent dropdown question solution</h1>
      <select
        id="select1"
        onChange={(e) => {
          const value = e.target.value;
          updateSecondDrop(value);
        }}
      >
        {Object.entries(mockData).map(([key, value]) => {
          return <option value={value.id}>{key}</option>;
        })}
      </select>
      <select id="select2">
        {select2Data.map((row) => {
          return <option value={row}>{row}</option>;
        })}
      </select>
    </div>
  );
};

export default Test;
