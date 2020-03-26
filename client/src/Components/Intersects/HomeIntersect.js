import useIntersect from "./useIntersect";

export default () => {
  const [one, entry] = useIntersect({
    threshold: 0.8
  });

  const [two, entry2] = useIntersect({
    threshold: 0.5
  });

  const [three, entry3] = useIntersect({
    threshold: 1
  });

  if (entry.isIntersecting) {
    entry.target.classList.add("animated", "fadeInUp");
    let el = document.querySelectorAll(".large_header");
    el.forEach(el => {
      el.classList.add("animated", "fadeInUp");
      if (el.nextSibling) {
        if (el.nextSibling.className === "view_more") {
          el.nextSibling.classList.add("animated", "fadeInUp");
        }
      } else {
        return;
      }
    });
  }

  if (entry2.isIntersecting) {
    entry2.target.classList.add("animated", "fadeInUp");
  }

  if (entry3.isIntersecting) {
    entry3.target.classList.add("animated", "fadeInUp");
  }

  return [one, two, three];
};
