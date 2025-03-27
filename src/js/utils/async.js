export function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {
    if (isThrottled) {
      // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
