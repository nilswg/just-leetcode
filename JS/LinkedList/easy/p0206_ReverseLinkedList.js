// @ts-check

import { isLinkedListEqual, LinkedList, ListNode } from '../index.js';

// 題目鏈結
// https://leetcode.com/problems/reverse-linked-list/

// 題目說明
// Given the head of a singly linked list, reverse the list, and return the reversed list.
// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]

// 解題重點
// 需要額外的pre保存curr.next，待curr反轉後，再透過pre去移動到下一節點

// 解題思路
// T = 0
// null    1 -> 2 -> 3
//    ^res ^cur/pre
//
// T = 1
// null <- 1    2 -> 3
//    ^res ^cur ^pre
//
// null <- 1    2 -> 3
//         ^cur ^pre
//         ^res
//
// null <- 1    2 -> 3
//         ^res ^cur/pre
//
// T = 2
// null <- 1 <- 2    3
//         ^res ^cur ^pre
//
// null <- 1 <- 2    3
//              ^cur ^pre
//              ^res
//
// null <- 1    2 -> 3
//              ^res ^cur/pre
//
// T = 3
// null <- 1 <- 2 <- 3    null
//              ^res ^cur ^pre
//
// null <- 1 <- 2 <- 3    null
//                   ^cur ^pre
//                   ^res
//
// null <- 1 <- 2 <- 3    null
//                   ^res ^cur/pre
//
// 最後，cur、pre 都指向null,  res 成為反轉後的頭節點。

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 * Definition for singly-linked list.
 * */
// function ListNode(val, next) {
//   this.val = val === undefined ? 0 : val;
//   this.next = next === undefined ? null : next;
// }

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let res = null;
  let cur = head;
  let pre = head;
  while (cur) {
    pre = cur.next;
    cur.next = res;
    res = cur;
    cur = pre;
  }
  return res;
};

// 測試
(function () {
  console.log('Testing p0206_ReverseList...');

  console.log(
    isLinkedListEqual(
      reverseList(LinkedList([1, 2, 3, 4, 5])),
      LinkedList([5, 4, 3, 2, 1])
    ) === true
  );

  console.log('All Testing Passed ✅');
})();