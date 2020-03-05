export const randomColor = () => {
  let colors = ["#4a47a3", "#d63447", "#ffb2a7", "#30475e"];
  let randomNumber = Math.floor(Math.random() * colors.length);
  let newColour = colors[randomNumber];
  return newColour;
};
