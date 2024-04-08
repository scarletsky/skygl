export function getContext(canvas, options = {}) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('Invalid HTMLCanvasElement.');
  }

  return canvas.getContext('webgl', options);
}

export function getExtensions(gl) {
  
}
