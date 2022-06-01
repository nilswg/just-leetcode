// @ts-check
// 2. Add Two Numbers

// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

//  2 --> 4 --> 3
//  5 --> 6 --> 4
// ----------------
//  7 --> 0 --> 8

// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.

// 這題重點在於計算的方式為左到右。也就是跟平常紙筆計算時完全反過來。
// 要有 carry bit 方便進位。
// 不需要太多浮誇的技巧，就穩穩的一步一步做就是答案了。

// Runtime: 97 ms, faster than 95.54% of JavaScript online submissions for Add Two Numbers.
// Memory Usage: 47.3 MB, less than 55.86% of JavaScript online submissions for Add Two Numbers.

// Time Complexity : O( max(n, m) )
// Space Complexity: O( n + m );

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let cur = new ListNode(null);
  let res = cur;
  let carry = 0;

  while (l1 || l2 || carry > 0) {
    if (l1 !== null) {
      carry += l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      carry += l2.val;
      l2 = l2.next;
    }
    cur = cur.next = new ListNode(carry % 10);
    carry = Math.floor(carry / 10);
  }

  return res.next;
};

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function List(arr) {
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
function isEqual_List(l1, l2) {
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

console.log(
  isEqual_List(
    addTwoNumbers(List([2, 4, 3]), List([5, 6, 4])),
    List([7, 0, 8])
  ) === true
);

console.log(
  isEqual_List(
    addTwoNumbers(List([9, 9, 9]), List([9, 9])),
    List([8, 9, 0, 1])
  ) === true
);

// Case 1
//
// Input :  [2,4,3]
//          [5,6,4]
//
// sum : 0
// carry : 0
// res : (null)
//
// sum: 2 + 5 + 0,
// carry : 0
// res : (null) -> (7)
//
// sum: 4 + 6 + 0,
// carry : 1
// res : (null) -> (7) -> (0)
//
// sum: 3 + 4 + 1,
// carry : 0
// res : (null) -> (7) -> (0) -> (8)
//

// Case 2
//
// Input :  [9,9,9]
//          [9,9]
//
// sum : 0
// carry : 0
// res : (null)
//
// sum: 9 + 9 + 0,
// carry : 1
// res : (null) -> (8)
//
// sum: 9 + 9 + 1,
// carry : 1
// res : (null) -> (8) -> (9)
//
// sum: 9 + (null) + 1,
// carry : 1
// res : (null) -> (8) -> (9) -> (0)
//
// sum: (null) + (null) + 1,
// carry : 0
// res : (null) -> (8) -> (9) -> (0) -> (1)
