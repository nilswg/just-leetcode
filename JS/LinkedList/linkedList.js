// @ts-check
/**
 * ListNode
 * @param {*} val
 * @param {*} next
 */
export function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 *
 * @param {Array<number>} arr
 * @returns {ListNode}
 */
export function LinkedList(arr=[]) {
  let cur = new ListNode(null);
  let res = cur;
  for (const a of arr) {
    cur = cur.next = new ListNode(a);
  }
  return res.next;
}

/**
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @returns {boolean}
 */
export function isLinkedListEqual(l1, l2) {
  while (l1 && l2) {
    if (l1.val !== l2.val) {
      return false;
    }
    l1 = l1.next;
    l2 = l2.next;
  }
  if (l1 || l2) return false;
  return true;
}
