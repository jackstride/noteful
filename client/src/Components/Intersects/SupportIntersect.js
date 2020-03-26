import useIntersect from "./useIntersect";

export default () => {
  const [one, entry] = useIntersect({
    threshold: 0.1
  });

  return [one];
};
