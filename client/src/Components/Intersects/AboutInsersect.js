import useIntersect from "./useIntersect";

export default () => {
  const [one, entry] = useIntersect({
    threshold: 0.1
  });
  const [two, entry2] = useIntersect({
    threshold: 0.8
  });
  const [three, entry3] = useIntersect({
    threshold: 0.8
  });
  const [four, entry4] = useIntersect({
    threshold: 0.8
  });

  const [five, entry5] = useIntersect({
    threshold: 0.8
  });

  if (entry.isIntersecting) {
    entry.target.classList.add("animated", "fadeInUp");
  }
  if (entry2.isIntersecting) {
    entry2.target.classList.add("animated", "fadeInUp");
  }

  if (entry3.isIntersecting) {
    entry3.target.classList.add("animated", "fadeInUp");
  }
  if (entry4.isIntersecting) {
    entry4.target.classList.add("animated", "fadeInUp");
  }

  if (entry5.isIntersecting) {
    let el = document.querySelector(".small_heading");
    let el2 = document.querySelectorAll(".about_title");
    el.classList.add("animated", "fadeInUp");
    el2[1].classList.add("animated", "fadeInUp");
  }

  return [one, two, three, four, five];
};
