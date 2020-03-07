import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const Account = ({ email, firstName, lastName }) => {
  const [u_first, setFirst] = useState("");
  const [u_last, setLast] = useState("");
  const [u_email, setEmail] = useState("");

  useEffect(() => {
    setFirst(firstName);
    setLast(lastName);
    setEmail(email);
  }, [email, firstName, lastName]);

  return (
    <div className="account_container">
      <form>
        <label for="email">
          Email *<input placeholder={u_email} name="email" type="text"></input>
        </label>
        <label for="c_email">
          Confirm Email *
          <input placeholder="Confirm Email" name="c_email" type="text"></input>
        </label>

        <label for="firstName">
          First Name *
          <input placeholder={u_first} name="firstName" type="text"></input>
        </label>

        <label for="lastName">
          Last Name *
          <input placeholder={u_last} name="lastName" type="text"></input>
        </label>

        <input type="submit" name="submit" value="Save"></input>
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

export default connect(mapStateToProps)(Account);
