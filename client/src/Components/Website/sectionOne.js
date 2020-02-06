import React from "react";

let SectionOne = props => {
  const splitHeading = () => {
    let parts = [];
    let phrase = props.data.heading;

    for (let i = 0, j = 0; j < phrase.length; j++) {
      if (phrase[j] === " ") {
        parts.push(phrase.substring(i, j));
        let k = j;
        j = k;
        i = k;
      } else if (j === phrase.length - 1) {
        if (i !== j) {
          /* Edge case to ensure whole string is collected if no anchor
          or chracters exist after an anchor */
          parts.push(phrase.substring(i, j + 1));
        }
      }
    }

    return parts.map((part, i) => <h2>{parts[i]}</h2>);
  };

  return (
    <div className="inner_container">
      <section className="section_container">
        <div className="section_text">
          <div className="section_heading">{splitHeading()}</div>
          <div className="section_para">
            <p>{props.data.text}</p>
          </div>
        </div>
        <div className="section_image">
            <img src={props.data.image}></img>
        </div>
      </section>
    </div>
  );
};

export default SectionOne;
