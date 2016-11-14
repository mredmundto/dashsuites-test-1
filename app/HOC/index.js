export default (component, passThroughs) => {
  return passThroughs.reduce((acc, current) => {
    return current(acc);
  }, component);
};
