// Definition for a Node.
/**
 * 
 * @param {any} val 
 * @param {Node[]} neighbors 
 */
export function Node(val, neighbors=[]) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}
