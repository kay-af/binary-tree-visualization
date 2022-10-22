/**
 * Enable hold and move mouse to pan for the given div element.
 * @param scrollableElement The div element to make scrollable with mouse.
 */
export const enableMousePan = (scrollableElement: HTMLDivElement) => {
  let mouseDown: boolean = false;

  scrollableElement.addEventListener("mousedown", () => {
    scrollableElement.classList.add("pan-cursor");
    mouseDown = true;
  });

  const endPan = () => {
    scrollableElement.classList.remove("pan-cursor");
    mouseDown = false;
  };

  scrollableElement.addEventListener("mouseup", endPan);
  scrollableElement.addEventListener("mouseleave", endPan);

  scrollableElement.addEventListener("mousemove", (evt) => {
    if (mouseDown) {
      scrollableElement.scrollTo({
        left: scrollableElement.scrollLeft - evt.movementX,
        top: scrollableElement.scrollTop - evt.movementY,
      });
    }
  });
};
