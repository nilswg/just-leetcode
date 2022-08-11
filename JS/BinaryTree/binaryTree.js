// @ts-check

export function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// 多節點樹
export function Node(val, children) {
  this.val = val;
  this.children = children;
}

/**
 *
 * @param {number[]} values
 * @returns {TreeNode}
 */
export function buildTreeNodes(values = []) {
  if (!values.length) return null;
  /**
   * 透過第一個值，創建根節點。
   */
  const root = new TreeNode(values[0]);

  /**
   * 生成Tree所需的 queue
   */
  const queue = [root];

  let i = 1;
  let n = values.length;

  while (queue.length > 0) {
    let curr = queue.shift();
    for (let side of ['left', 'right']) {
      if (!curr[side]) {
        if (values[i] !== null) {
          curr[side] = new TreeNode(values[i]);
        }
        i += 1;
        if (i >= n) return root;
      }
      if (curr[side]) queue.push(curr[side]);
    }
  }
  return root;
}

/**
 *
 * @param {Array<any>} arr1
 * @param {Array<any>} arr2
 */
export const isArrayEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0, n = arr1.length; i < n; i++) {
    if (Array.isArray(arr1[i]) || Array.isArray(arr2[i])) {
      if (!isArrayEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  }

  return true;
};

/**
 * isSameTree 詳細思考過程，請參閱p0100_SameTree.js
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
export const isSameTree = function (p, q) {
  const helper = (p, q) => {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;
    return helper(p.left, q.left) && helper(p.right, q.right);
  };
  return helper(p, q);
};
