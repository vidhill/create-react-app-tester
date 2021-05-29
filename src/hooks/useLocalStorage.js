const useLocalStorage = function (key) {
  const currentValue = window.localStorage.getItem(key);
  const updateCurrentValue = (newValue) => {
    window.localStorage.setItem(key, newValue);
  };
  return [currentValue, updateCurrentValue];
};

export default useLocalStorage;
