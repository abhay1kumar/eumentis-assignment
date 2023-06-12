import axios from "axios";
import React, { useEffect, useState } from "react";
import CardLayout from "./component/CardLayout";

const App = () => {
  const MemoizedCardLayout = React.memo(CardLayout);
  const [data, setData] = useState();
  const getData = async () => {
    let config = {
      method: "get",
      url: `https://jsonplaceholder.typicode.com/users`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let response = await axios(config);
      // console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <MemoizedCardLayout data={data} setData={setData} />
    </>
  );
};

export default App;
