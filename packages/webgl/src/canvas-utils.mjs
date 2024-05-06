// NOTE: Alias `devicePixelRatio`
export const CANVAS_PIXEL_RATIOS = new Map();
export function setCanvasPixelRatio(canvas, pixelRatio = 1) {
  CANVAS_PIXEL_RATIOS.set(canvas, pixelRatio);

  const width  = canvas.clientWidth  * pixelRatio | 0;
  const height = canvas.clientHeight * pixelRatio | 0;

  if (canvas.width === width && canvas.height === height) return false;

  canvas.width = width;
  canvas.height = height;
  return true;
}

let canvasResizeObserver = null;
export const CANVAS_RESIZE_CALLBACKS = new Map();
export function addCanvasResizeListener(canvas, callback) {
  let callbacks = CANVAS_RESIZE_CALLBACKS.get(canvas);

  if (!callbacks) {
    callbacks = [];
  }

  if (callbacks.indexOf(callback) > -1) return false;

  callbacks.push(callback);
  CANVAS_RESIZE_CALLBACKS.set(canvas, callbacks);

  if (!canvasResizeObserver) {
    canvasResizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        const pixelRatio = CANVAS_PIXEL_RATIOS.get(canvas) || 1;

        canvas.width = newWidth * pixelRatio;
        canvas.height = newHeight * pixelRatio;

        for (let callback of callbacks) {
          callback(canvas);
        }
      }
    });
  }

  canvasResizeObserver.unobserve(canvas);
  canvasResizeObserver.observe(canvas);

  return true;
}

export function removeCanvasResizeListener(canvas, callback) {
  let callbacks = CANVAS_RESIZE_CALLBACKS.get(canvas);

  if (!callbacks) return false;

  const idx = callbacks.indexOf(callback);

  if (idx === -1) return false;

  callbacks.splice(idx, 1);
  CANVAS_RESIZE_CALLBACKS.set(canvas, callbacks);

  if (callbacks.length === 0 && canvasResizeObserver) {
    canvasResizeObserver.unobserve(canvas);
  }

  return true;
}
