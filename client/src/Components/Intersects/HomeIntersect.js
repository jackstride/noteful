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
    let things = document.querySelectorAll(".f1");
    things.forEach(thing => thing.classList.add("animated", "fadeIn"));
  }
  if (entry2.isIntersecting) {
    let tt = document.querySelectorAll(".f2");
    tt.forEach(thing => thing.classList.add("animated", "fadeInUp"));
  }
  if (entry3.isIntersecting) {
    let pp = document.querySelectorAll(".f3");
    pp.forEach(thing => thing.classList.add("animated", "fadeInUp"));
  }
  return [one, two, three];
};
