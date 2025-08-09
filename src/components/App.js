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

  const searchInput = (e) => {
    e.preventDefault()
    fetchData(title);
  };
  return (
    <>
      {/* Do not remove the main div */}
      <form>
      <input onChange={(e) => setTitle(e.target.value)} />
      <button onClick={searchInput} type="submit">Search</button>
      </form>
      {result !== null && 
      (
        <>
          {
          
          result.Response === "True" && (
            <ul>
              {
                result.Search.map((item,ind)=>{
      
                  return(<li key={ind}>
                        <h1>{item.Title}</h1>
                        <img src={item.Poster}/>
                  </li>)
                })
              }
            </ul>
          )}
          {
            result.Response === "False" &&(
              
              <p className="error">Invalid movie name. Please try again.</p>
    
            )
          }
        </>
      )}
    </>
  );
};

export default App;
