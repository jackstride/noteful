import React from "react";

const Account = () => {
  return (
    <div className="account_container">
      <div className="account_header">
        <div className="account_edit">
          <form>
            <input placeholder="Email" name="email" type="text"></input>

            <input
              placeholder="Confirm Email"
              name="c_email"
              type="text"
            ></input>

            <input
              placeholder="First Name"
              name="firstName"
              type="text"
            ></input>

            <input placeholder="LastName" name="lastName" type="text"></input>

            <input type="submit" name="submit" value="Save"></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
