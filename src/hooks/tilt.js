/**
 * Inclina un elemento en 3D siguiendo al cursor.
 *
 * Devuelve los manejadores listos para esparcir sobre el contenedor, que debe
 * llevar la clase `.tilt` (es la que pone la perspectiva y la transición).
 * Escribe variables CSS en vez de estado de React: el giro ocurre en cada
 * movimiento del ratón y pasarlo por un render sería tirar fotogramas.
 */
export const tilt = (max = 8) => ({
  onMouseMove: (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * max).toFixed(2)}deg`);
  },
  onMouseLeave: (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  },
});
