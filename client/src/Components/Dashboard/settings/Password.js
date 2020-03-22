import React, { useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../fontawesome";
import { userUpdate } from "../../../actions/authActions";

const Password = ({ _id, userUpdate }) => {
  let [length, setLength] = useState(false);
  let [symbols, setSymbols] = useState(false);
  let [mix, setMix] = useState(false);
  let [valid, setvalid] = useState(false);
  let [match, setMatch] = useState(false);
  let [values, setValues] = useState();

  let handleValidation = e => {
    let string = e.target.value;
    let checkCase = /(?=.*[a-z])(?=.*[A-Z])/;
    let checkSymbol = /[`!@#$%^&*()_+\-=\[\]{};':"|,.<>?~]/;
    string.length > 8 ? setLength(true) : setLength(false);
    checkSymbol.test(string) ? setSymbols(true) : setSymbols(false);
    checkCase.test(string) ? setMix(true) : setMix(false);
  };

  let handlePasswordMatch = () => {
    if (values.password === values.c_password) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  };

  let handleSubmit = () => {
    if (length && symbols && mix && match) {
      userUpdate(_id, { password: values.password });
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
        <div className="match">
          <p> Passwords Match </p>
          {match && <Correct />}
        </div>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label>
          Password
          <input
            onChange={e => {
              setValues({ ...values, password: e.target.value });
              handleValidation(e);
            }}
            name="password"
            type="password"
          ></input>
        </label>
        <label>
          Confirm Password
          <input
            onChange={e => {
              setValues({ ...values, c_password: e.target.value });
            }}
            onKeyUp={() => {
              handlePasswordMatch();
            }}
            name="c_password"
            type="password"
          ></input>
          <input type="submit" name="submit" value="Submit"></input>
        </label>
      </form>
    </div>
  );
};

const mapDisptachToProps = () => dispatch => ({
  userUpdate: (_id, values) => dispatch(userUpdate(_id, values))
});

const mapStateToProps = state => {
  return {
    _id: state.auth.user._id,
    email: state.auth.user.email,
    firstName: state.auth.user.firstName,
    lastName: state.auth.user.lastName
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(Password);

let Correct = () => {
  return (
    <div className="circle">
      <FontAwesomeIcon icon="check" size="xs" color="green"></FontAwesomeIcon>
    </div>
  );
};
