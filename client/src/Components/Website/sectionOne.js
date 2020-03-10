import React from "react";

import Card from "./Card";

let SectionOne = ({ title, image, heading, body }) => {
  // const splitHeading = () => {
  //   let parts = [];
  //   let phrase = props.data.heading;

  //   for (let i = 0, j = 0; j < phrase.length; j++) {
  //     if (phrase[j] === " ") {
  //       parts.push(phrase.substring(i, j));
  //       let k = j;
  //       j = k;
  //       i = k;
  //     } else if (j === phrase.length - 1) {
  //       if (i !== j) {
  //         /* Edge case to ensure whole string is collected if no anchor
  //         or chracters exist after an anchor */
  //         parts.push(phrase.substring(i, j + 1));
  //       }
  //     }
  //   }

  //   return parts.map((part, i) => <h2>{parts[i]}</h2>);
  // };

  return (
    <div className="inner_container">
      <section className="section_container">
        <div className="header_image">
          <h1>{title}</h1>
          <img src={image} alt="Women reading a book"></img>
        </div>
        <div className="section_card">
          <Card
            data={{
              heading: heading,
              body: body
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default SectionOne;
