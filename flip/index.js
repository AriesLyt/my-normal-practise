/**
 * @type { HTMLElement }
 */
const btn = document.querySelector("#btn");
/**
 * @type { HTMLElement }
 */
const wrapDom = document.querySelector("#list");

const children = wrapDom.children;
btn.onclick = () => {
  /**
   * @type { HTMLElement }
   */
  let moveDom = children[0];
  moveDom.style.removeProperty("transition");
  const { top: sTop, left: sLeft } = getLocation(moveDom);
  wrapDom.insertBefore(
    moveDom,
    children[children.length - 1].nextElementSibling
  );
  const { top: eTop, left: eLeft } = getLocation(moveDom);
  const translateX = sTop - eTop;
  console.log(translateX);
  //   moveDom.style.setProperty("transform", `translateY(${translateX}px)`);
  moveDom.style.transform = `translateY(${translateX}px)`;

  raf(() => {
    moveDom.style.setProperty("transition", "transform 0.25s");
    moveDom.style.removeProperty("transform");
  });
};

const raf = (cb) => {
  //   requestAnimationFrame(() => {
  requestAnimationFrame(cb);
  //   });
};

/**
 *
 * @param {HTMLElement} dom
 */
const getLocation = (dom) => {
  const location = dom.getBoundingClientRect();
  return {
    top: location.top,
    left: location.left,
  };
};
