export function setCanvasResolution(canvas, resolution = 1) {
  const width  = canvas.clientWidth  * resolution | 0;
  const height = canvas.clientHeight * resolution | 0;

  if (canvas.width === width && canvas.height === height) return false;

  canvas.width = width;
  canvas.height = height;
  return true;
}
