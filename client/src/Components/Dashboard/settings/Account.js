import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { userUpdate } from "../../../actions/authActions";

const Account = ({ email, firstName, lastName }) => {
  const [u_first, setFirst] = useState();
  const [u_last, setLast] = useState();
  const [u_email, setEmail] = useState();
  const [c_email, setCEmail] = useState();

  let handleOnSubmit = event => {
    event.preventDefault();
    console.log(event.target.email.value);
    console.log(u_email);
    // setCEmail(e.target.c_email.value);
    // setFirst(e.target.u_fist.value);
    // setLast(e.target.lastName.value);
  };

  return (
    <div className="account_container">
      <form
        onSubmit={event => {
          handleOnSubmit(event);
        }}
      >
        <label for="email">
          Email *<input placeholder={email} name="email" type="text"></input>
        </label>
        <label>
          Confirm Email *
          <input placeholder="Confirm Email" name="c_email" type="text"></input>
        </label>

        <label>
          First Name *
          <input placeholder={firstName} name="firstName" type="text"></input>
        </label>

        <label>
          Last Name *
          <input placeholder={lastName} name="lastName" type="text"></input>
        </label>

        <input type="submit" name="submit" value="Save"></input>
      </form>
    </div>
  );
};

const mapDispatchToProps = () => dispatch => ({
  userUpdate: values => dispatch(userUpdate(values))
});

const mapStateToProps = state => {
  return {
    email: state.auth.user.email,
    firstName: state.auth.user.firstName,
    lastName: state.auth.user.lastName
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
