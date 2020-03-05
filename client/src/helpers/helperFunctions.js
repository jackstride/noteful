export const randomColor = () => {
  let colors = ["#4a47a3", "#d63447", "#ffb2a7"];
  let randomNumber = Math.floor(Math.random() * colors.length);
  console.log(randomNumber);

  let newColour = colors[randomNumber];
  console.log(newColour);
  return newColour;
};
