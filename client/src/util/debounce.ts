let timerId: NodeJS.Timeout;
const DELAY = 1000;

export const debounce = (func: () => void) => {
  if (timerId) clearTimeout(timerId);
  timerId = setTimeout(() => {
    func();
  }, DELAY);
};
