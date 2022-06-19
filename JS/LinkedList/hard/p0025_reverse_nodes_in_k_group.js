// @ts-check

// 題目鏈結
// https://leetcode.com/problems/reverse-nodes-in-k-group

// 題目說明
// Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.
//
// Input: head = [1,2,3,4,5], k = 2
// Output: [2,1,4,3,5]

// 解題重點
// 1. 瞭解如何反轉串鏈 (可參考 p0206)
// 2. tail 移動k次，並成為每一段reverse的終點
// 3. 不足k 要返回剩餘的串鏈。(直接返回head)
// 4. 串鏈反轉後，頭尾互換，前次頭(新尾)與下一段的舊尾(新頭)對接。
// 5. 深度優先至底，再逐層返回合併，新尾對接新頭。

// 解題思路
//
//  a: head; b : back
//
//  1 -> 2 -> 3 -> 4 -> 5
// a/b
//
//    1 -> 2 -> 3 -> 4 -> 5
//    a         b (因為 k=2，跳躍兩次)
//
//    do reverse...
// x<-1    2 -> 3 -> 4 -> 5 // 第1次後
//    pre  cur
// x<-1 <- 2    3 -> 4 -> 5 // 第2次後，因ˋcur相等於b，退出
//         pre  cur
//    reverse over...
//    2 -> 1->x 3 -> 4 -> 5
//    ^pre a    b
//     newHead
//
//    reverseKGroup...
//    2 -> 1->x 3 -> 4 -> 5
//              a/b
//
//    2 -> 1->x 3 -> 4 -> 5
//              a         b
//    do reverse...
//          x<- 3    4 -> 5
//              pre  cur
//          x<- 3 <- 4    5
//                   pre  cur
//    reverse over...
//    2 -> 1->x 4 -> 3->x 5
//              ^pre a
//              ^newHead
//
//    reverseKGroup...
//                        5
//                        ^pre(次數不足k)
//    merge result...
//    2 -> 1->x|4 -> 3->x|5
//
//              4 -> 3 -> 5
//                   ^a   ^pre
//              ^newHead
//
//    2 -> 1 -> 4 -> 3 -> 5
//         ^a   ^pre
//    ^newHead
//    merge over...
//
// return newHead >> 2 -> 1 -> 4 -> 3 -> 5;

// 複雜度
// Time Complexity : O(??)
// Space Complexity: O(??)

import { LinkedList, ListNode, isLinkedListEqual } from '../linkedList.js';

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {any}
 */
var reverseKGroup = function (head, k) {
  // console.log(head, k)

  const reverse = function (cur, b) {
    let pre = null;
    while (cur !== b) {
      let tmp = cur;
      cur = tmp.next;
      tmp.next = pre;
      pre = tmp;
    }
    return pre;
  };

  const helper = (a, k) => {
    let b = a;
    if (a === null) {
      return a; //關鍵 1-1
    }
    for (let i = 0; i < k; i++) {
      if (b === null) {
        return a; //關鍵 1-2，
      }
      b = b.next;
    }
    let hd = reverse(a, b);
    a.next = helper(b, k); // 關鍵3，用b作為下一次的head。
    return hd;
  };

  return helper(head, k);
};

// 測試
(function () {
  console.log('Testing [p0025_reverseKGroup]...');

  console.log(
    isLinkedListEqual(
      reverseKGroup(LinkedList([1, 2, 3, 4, 5]), 2),
      LinkedList([2, 1, 4, 3, 5])
    )
  );

  console.log('All Testing Passed ✅');
})();
