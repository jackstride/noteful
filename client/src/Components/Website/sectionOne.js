import React from "react";

import Image_One from '../../images/reading_book.png'
import Card from './Card'


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
        <div className="header_image">
          <h1>Start, simple and ready to use</h1>
          <img src={Image_One} alt="Women reading a book"></img>
        </div>
        <div className="section_card">
          <Card data={{heading: "Jump straight in", body: "Not only can you create rich notes, you can also create tasks and events. It's quick and simple to add a note or task and just as satisfying to mark as complete."}} />

        </div>
      </section>
    </div>
  );
};

export default SectionOne;
