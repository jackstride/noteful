import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";
import { faFortAwesome } from "@fortawesome/free-brands-svg-icons";

const Password = () => {
  let [length, setLength] = useState(false);
  let [symbols, setSymbols] = useState(false);
  let [mix, setMix] = useState(false);
  let [valid, setvalid] = useState(false);

  let handleValidation = e => {
    let string = e.target.value;
    console.log(string);
    let checkCase = /(?=.*[a-z])(?=.*[A-Z])/;
    let checkSymbol = /[`!@#$%^&*()_+\-=\[\]{};':"|,.<>?~]/;

    string.length > 8 ? setLength(true) : setLength(false);

    checkSymbol.test(string) ? setSymbols(true) : setSymbols(false);

    checkCase.test(string) ? setMix(true) : setMix(false);

    if (length && symbols && mix) {
      setvalid(true);
    }
  };

  return (
    <div className="settings_password">
      <div className="password-match">
        <h5> Please ensure all criteria is met</h5>
        <div className="length">
          <p> 8 Charcters or More</p>
          {length && <Correct />}
        </div>
        <div className="symbols">
          <p> Mixture of symbols</p>
          {symbols && <Correct />}
        </div>
        <div className="mix">
          <p> Upper and Lowercase </p>
          {mix && <Correct />}
        </div>
      </div>
      <form>
        <label>
          Password
          <input
            onChange={e => {
              handleValidation(e);
            }}
            name="password"
            type="password"
          ></input>
        </label>
        <label>
          Confirm Password
          <input type="password"></input>
        </label>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    email: state.auth.user.email,
    firstName: state.auth.user.firstName,
    lastName: state.auth.user.lastName
  };
};

export default connect(mapStateToProps)(Password);

let Correct = () => {
  return (
    <div className="circle">
      <FontAwesomeIcon icon="check" size="xs" color="green"></FontAwesomeIcon>
    </div>
  );
};
