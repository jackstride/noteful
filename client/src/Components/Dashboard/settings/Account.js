import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { userUpdate } from "../../../actions/authActions";

const Account = ({ email, firstName, lastName, userUpdate, _id }) => {
  let [values, setValues] = useState();

  let handleOnSubmit = () => {
    if (values.email === values.c_email) {
      userUpdate(_id, values);
    }
  };

  return (
    <div className="account_container">
      <form
        onSubmit={event => {
          event.preventDefault();
          handleOnSubmit(event);
        }}
      >
        <label>
          Email *
          <input
            onChange={e => {
              setValues({ ...values, email: e.target.value });
            }}
            placeholder={email}
            name="email"
            type="text"
          ></input>
        </label>
        <label>
          Confirm Email *
          <input
            onChange={e => {
              setValues({ ...values, c_email: e.target.value });
            }}
            placeholder="Confirm Email"
            name="c_email"
            type="text"
          ></input>
        </label>

        <label>
          First Name *
          <input
            onChange={e => {
              setValues({ ...values, firstName: e.target.value });
            }}
            placeholder={firstName}
            name="firstName"
            type="text"
          ></input>
        </label>

        <label>
          Last Name *
          <input
            onChange={e => {
              setValues({ ...values, lastName: e.target.value });
            }}
            placeholder={lastName}
            name="lastName"
            type="text"
          ></input>
        </label>

        <input type="submit" name="submit" value="Save"></input>
      </form>
    </div>
  );
};

const mapDispatchToProps = () => dispatch => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(Account);
