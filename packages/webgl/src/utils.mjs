export function isWebGL2(gl) {
  if (gl.isWebGL2) return true;
  if (gl.isWebGL2 === undefined) {
    gl.isWebGL2 = !!gl.texStorage2D;
  }
  return gl.isWebGL2;
}
