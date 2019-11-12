import React from "react";

let time = () => {
  //https://stackoverflow.com/questions/10599148/how-do-i-get-the-current-time-only-in-javascript

  let time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  
 let getEx = (time) => {
  let res = time.substr(0,2) <= 11 ? 'am' : 'pm'
  return res
 }

  return (
    <div className="time_container">
      <h4 style={{color: "white"}}>{time + getEx(time)}</h4>
    </div>
  );
};

export default time;
