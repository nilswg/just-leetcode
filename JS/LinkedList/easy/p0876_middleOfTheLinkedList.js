// @ts-check

import { ListNode, LinkedList } from '../linkedList.js';

// 題目鏈結
// https://leetcode.com/problems/middle-of-the-linked-list

// 題目說明
// Given the head of a singly linked list, return the middle node of the linked list.
// If there are two middle nodes, return the second middle node.
//

// Example 1:
// Input: head = [1,2,3,4,5]
// Output: [3,4,5]
// Explanation: The middle node of the list is node 3.
//

// Example 2:
// Input: head = [1,2,3,4,5,6]
// Output: [4,5,6]
// Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.
//

// Constraints:
// The number of nodes in the list is in the range [1, 100].
// 1 <= Node.val <= 100
//

// 解題重點
// 1.瞭解鏈結串鏈快慢指針(Fast-slow Pointers)的使用方式

// 解題思路
// 1.可以先嘗試思考出暴力解，例如走訪兩次，第一次先取出總長度，第二次再根據總長度推算出終點
// 2.活用快慢指針的概念，快指針速度為 2t；慢指針 t，快指針到底後，慢指針所在位置就是中點。

// Solution : 使用 快慢指針
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 *
 * e.g [1,2,3,4,5]
 *
 *   T = 0: t => 1, h => 1
 *   T = 1: t => 2, h => 3
 *   T = 2: t => 3, h => 5
 *
 *   -> 中點為t當前位置: 3
 *
 * e.g [1,2,3,4,5,6]
 *
 *   T = 0: t => 1, h => 1
 *   T = 1: t => 2, h => 3
 *   T = 2: t => 3, h => 5
 *   T = 2: t => 4, h => null (6.next 為 null)
 *
 *   -> 中點為t當前位置: 4
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let h = head;
  let t = head;
  while(h?.next) {
    h = h.next.next;
    t = t.next
  }
  return t;
};

// 測試
(function () {
  console.log('Testing [p0876_middleOfTheLinkedList]...');

  console.log(middleNode(LinkedList([1, 2, 3, 4, 5])).val === 3);
  console.log(middleNode(LinkedList([1, 2, 3, 4, 5, 6])).val === 4);

  console.log('All Testing Passed ✅');
})();
