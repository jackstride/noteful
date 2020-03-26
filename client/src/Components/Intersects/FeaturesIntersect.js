import useIntersect from "./useIntersect";

export default () => {
  const [one, entry] = useIntersect({
    threshold: 0.8
  });

  const [two, entry2] = useIntersect({
    threshold: 0.5
  });

  if (entry.isIntersecting) {
    let el = document.querySelector(".features2 .small_heading");

    el.classList.add("animated", "fadeInUp");
  }

  if (entry2.isIntersecting) {
    let el = document.querySelectorAll(".features2 .features_content");
    let heading = document.querySelector(".features_2 h2");
    el.forEach(element => element.classList.add("animated", "fadeInUp"));
    heading.classList.add("animated", "fadeInUp");
  }
  return [one, two];
};
