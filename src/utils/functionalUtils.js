const makePreventDefault = (callBack) => {
  return (event) => {
    callBack();
    event.preventDefault();
  };
};

export { makePreventDefault };
