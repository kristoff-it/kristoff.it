/**
 * Default scene prop definitions shared by the widget and realtime server.
 *
 * Add new props here. The server uses interaction fields; the widget also reads
 * svg, dimensions, and visual effect radii.
 */

/**
 * @typedef {Object} SceneProp
 * @property {string} id
 * @property {number} x
 * @property {number} zoneRadius
 * @property {number} width
 * @property {number} height
 * @property {string} [pose]
 * @property {Array<number>} [seats]
 * @property {boolean} [faceAway]
 * @property {number} [shadeRadius]
 * @property {number} [lightRadius]
 * @property {string} svg
 */

const BENCH_SVG = `
  <svg viewBox="0 0 50 18" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    <line x1="8" y1="8" x2="6" y2="17"></line>
    <line x1="42" y1="8" x2="44" y2="17"></line>
    <line x1="3" y1="8" x2="47" y2="8"></line>
    <line x1="6" y1="1" x2="6" y2="8"></line>
    <line x1="44" y1="1" x2="44" y2="8"></line>
    <line x1="6" y1="2" x2="44" y2="2"></line>
    <line x1="6" y1="5" x2="44" y2="5"></line>
  </svg>
`;

/** @type {Array<SceneProp>} */
export const PROPS = [
  {
    id: "bench",
    x: 0.2,
    zoneRadius: 0.035,
    width: 52,
    height: 18,
    pose: "sitting",
    seats: [-0.01, 0.01],
    svg: BENCH_SVG,
  },
  {
    id: "bench-east",
    x: 0.55,
    zoneRadius: 0.035,
    width: 52,
    height: 18,
    pose: "sitting",
    seats: [-0.01, 0.01],
    svg: BENCH_SVG,
  },
  {
    id: "lamp",
    x: 0.13,
    zoneRadius: 0,
    width: 20,
    height: 56,
    lightRadius: 0.045,
    svg: `
      <svg viewBox="0 0 20 56" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <line x1="3" y1="55" x2="11" y2="55"></line>
        <line x1="7" y1="55" x2="7" y2="10"></line>
        <path d="M7 10 C7 4 9 2 15 2"></path>
        <line x1="15" y1="2" x2="15" y2="5"></line>
        <path d="M12 5 L11 9 L19 9 L18 5 Z"></path>
      </svg>
    `,
  },
  {
    id: "tree",
    x: 0.8,
    zoneRadius: 0.015,
    width: 56,
    height: 76,
    pose: "resting",
    seats: [-0.008, 0.008],
    faceAway: true,
    shadeRadius: 0.045,
    svg: `
      <svg viewBox="0 0 56 76" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <path class="canopy" d="M13 44 C4 39 0 30 4 21 C7 14 12 9 17 8 C20 4 23 2 25 4 C27 1 29 1 31 4 C33 2 36 4 39 8 C44 9 49 14 52 21 C56 30 52 39 43 44 Z"></path>
        <path class="trunk" d="M25 44 L25 75 L31 75 L31 44 Z"></path>
      </svg>
    `,
  },
];
