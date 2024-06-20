let timerId: NodeJS.Timeout;
const DEFAULT_DELAY = 500;

export const debounce = (func: () => void, delay = DEFAULT_DELAY) => {
  if (timerId) clearTimeout(timerId);
  timerId = setTimeout(() => {
    func();
  }, delay);
};
