// @ts-check

import { isLinkedListEqual, LinkedList, ListNode } from '../linkedList.js';

// 題目鏈結
// https://leetcode.com/problems/add-two-numbers/

// 題目說明
//
//  2 --> 4 --> 3
//  5 --> 6 --> 4
// ----------------
//  7 --> 0 --> 8
//
// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.

// 解題重點
// 1. 這題重點在於計算的方式為左到右。也就是跟平常紙筆計算時完全反過來。
// 2. 要有 carry bit 方便進位。

// 解題思路
//
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

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)
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

// 測試
(function () {
  console.log('Testing p0002_AddTwoNumbers...');

  console.log(
    isLinkedListEqual(
      addTwoNumbers(LinkedList([2, 4, 3]), LinkedList([5, 6, 4])),
      LinkedList([7, 0, 8])
    ) === true
  );

  console.log(
    isLinkedListEqual(
      addTwoNumbers(LinkedList([9, 9, 9]), LinkedList([9, 9])),
      LinkedList([8, 9, 0, 1])
    ) === true
  );

  console.log('All Testing Passed ✅');
})();
