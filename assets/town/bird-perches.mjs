/**
 * Bird perch definitions shared by the server and widget.
 *
 * Positions are derived from scene props so bench/tree moves stay single-sourced.
 */

import { PROPS } from "./scene-props.mjs";

/**
 * @typedef {Object} BirdPerch
 * @property {string} id
 * @property {string} propId
 * @property {number} offsetX
 * @property {number} liftPx
 * @property {number} x
 */

/** @param {string} id @returns {number} */
function propX(id) {
  const prop = PROPS.find((candidate) => candidate.id === id);
  if (!prop) {
    throw new Error(`Unknown prop id for bird perch: ${id}`);
  }
  return prop.x;
}

/** @type {Array<BirdPerch>} */
export const BIRD_PERCHES = [
  { id: "bench-west-left", propId: "bench", offsetX: -0.014, liftPx: 18 },
  { id: "bench-west-right", propId: "bench", offsetX: 0.014, liftPx: 18 },
  { id: "bench-east-left", propId: "bench-east", offsetX: -0.014, liftPx: 18 },
  { id: "bench-east-right", propId: "bench-east", offsetX: 0.014, liftPx: 18 },
  { id: "tree-branch", propId: "tree", offsetX: 0, liftPx: 44 },
].map((perch) => ({ ...perch, x: propX(perch.propId) + perch.offsetX }));

/** @type {Map<string, BirdPerch>} */
export const BIRD_PERCHES_BY_ID = new Map(BIRD_PERCHES.map((perch) => [perch.id, perch]));
