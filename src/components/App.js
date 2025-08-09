import React, { useEffect, useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);
  const fetchData = async (title) => {
    try {
      const data = await fetch(
        `http://www.omdbapi.com/?apikey=99eb9fd1&s=${title}`
      );
      const response = await data.json();
      setResult(response);
    } catch (error) {
      console.log(error);
    }
  };

  const searchInput = () => {
    fetchData(title);
  };
  return (
    <div>
      {/* Do not remove the main div */}
      <input onChange={(e) => setTitle(e.target.value)} />
      <button onClick={searchInput}>Search</button>
      {result !== null && 
      (
        <>
          {
          
          result.Response === "True" && (
            <>
              {
                result.Search.map((item,ind)=>{
      
                  return(<div key={ind}>
                        <h1>{item.Title}</h1>
                        <img src={item.Poster}/>
                  </div>)
                })
              }
            </>
          )}
          {
            result.Response === "False" &&(
              <>
              <p>Invalid movie name. Please try again.</p>
              </>
            )
          }
        </>
      )}
    </div>
  );
};

export default App;
