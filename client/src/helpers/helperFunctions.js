export const randomColor = () => {
  let colors = ["#4a47a3", "#d63447", "#ffb2a7", "#30475e"];
  let randomNumber = Math.floor(Math.random() * colors.length);
  let newColour = colors[randomNumber];
  return newColour;
};

export const setDarkMode = () => {
  let isSet = JSON.parse(localStorage.getItem("dark_mode"));
  if (isSet) {
    document.querySelector(".app_container").classList.add("dark-mode");
  } else {
    document.querySelector(".app_container").classList.remove("dark-mode");
  }
};
