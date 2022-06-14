// @ts-check

import { isLinkedListEqual, LinkedList, ListNode } from '../index.js';

// 題目鏈結
// https://leetcode.com/problems/reverse-linked-list/

// 題目說明
// Given the head of a singly linked list, reverse the list, and return the reversed list.
// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]

// 解題重點
// 需要額外的tmp保存curr.next，待curr反轉後，再透過tmp去移動到下一節點

// 解題思路
// T = 0
// null    1 -> 2 -> 3
//    ^pre ^head
//
// T = 1
// null    1 -> 2 -> 3
//    ^pre ^head/tmp
//
// null    1 -> 2 -> 3  (head = head.next)
//    ^pre ^tmp ^head
//
// null <- 1    2 -> 3 (tmp.next = pre)
//    ^pre ^tmp ^head
//
// null <- 1    2 -> 3 (pre = tmp)
//         ^tmp ^head
//         ^pre
//
// T = 2
// null <- 1    2 -> 3
//         ^pre ^head/tmp
//
// null <- 1    2 -> 3
//         ^pre ^tmp ^head
//
// null <- 1 <- 2    3
//         ^pre ^tmp ^head
//
// null <- 1 <- 2    3
//              ^tmp ^head
//              ^pre
//
// T = 3
// null <- 1 <- 2    3 -> null
//              ^pre ^head/tmp
//
// null <- 1 <- 2    3 -> null
//              ^pre ^tmp ^head
//
// null <- 1 <- 2 <- 3    null
//              ^pre ^tmp ^head

// null <- 1 <- 2 <- 3    null
//                   ^tmp ^head
//                   ^pre
//
// 最後，head 指向null,  tmp, pre 皆可作為反轉後串列的新頭節點； 我們返回 pre 作為答案。

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
  let pre = null;  //反轉後 pre 會成為新的head後返回
  while (head) {
    let tmp = head;  // tmp 就像一個錨節點
    head = tmp.next; // tmp 幫助 head 移動的下一節點
    tmp.next = pre;  // tmp 反轉指針指向 pre
    pre = tmp;       // tmp 幫助 pre 移動到下一節點，完成一次循環。
  }
  return pre;
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
