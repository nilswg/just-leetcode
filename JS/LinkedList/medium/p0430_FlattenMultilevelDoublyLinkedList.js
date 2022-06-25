// @ts-check

// 題目鏈結
// https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/

// 題目說明
// flatten the list so that all the nodes appear in a single-level (重點就這句)
//
// 把左側攤平化(flatten)成右側的鏈結串列。
//
// 1, 2, 3, 4, 5, 6
//       |
//       7, 8, 9, 10    =>   1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6
//          |
//          11, 12

// 解題重點
// 1. 瞭解鏈結串列的走訪
// 2. 分別使用 dfs 與 bfs 這兩種策略去分析
// 3. 以深度優先的走訪(dfs)應該比較直覺，並配合遞迴中的TopDown去實作
// 4. 以廣度優先(bfs)時，以BottomUp方式，每兩層就合併，直到只剩一層即是解答。

// 解題思路
//
// 以深度優先的走訪(dfs)應該比較直覺，並配合遞迴中的TopDown去實作
//    (1) 每次碰到 child 就往下(深度優先)，並記錄cur.next狀態。
//    (2) 沒有 child時，就向右找出最尾元素(tail)。
//    (3) 反轉時，進行合併 : cur = cur.child = tail = cur.next
//    (4) 將cur.child 設為 null。
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)
// 但是，若遭遇最糟狀況時，每層都要存
// e.g
//     1
//     |
//     2
//     |
//     3     每下一層都要產生一次閉包。

/**
 * @param {any} head
 * @return {any}
 */
var flattenTopDown = function (head) {
  if (!head) {
    return null;
  }
  let traverse = (cur) => {
    if (cur.child !== null) {
      // find the tail.
      let tail = traverse(cur.child);

      if (cur.next !== null) {
        tail.next = cur.next;
        cur.next.prev = tail;
      }
      // remove child
      cur.child.prev = cur;
      cur.next = cur.child;
      cur.child = null;
      // now do it again.
      return traverse(tail.next ?? tail);
    } else if (cur.next !== null) {
      // cur is valid, get next.
      return traverse(cur.next);
    } else {
      // cur is valid, but don't have child or next more.
      return cur;
    }
  };
  traverse(head); // return will be tail
  return head;
};

// 複雜度
// 以廣度優先的走訪(bfs)，是遞迴中BottomUp的思路去實作
//    (1) 碰到含有child的節點時，下至child所在的層級，並搜尋該尋最右側的最尾元素(tail)。
//    (2) 每次合併，進專注主層與該子層，將兩層合併一層。
//    (3) 接著又回到(原先含有child)節點位置，再次走訪。
//    (4) 最終會合併僅剩下一層，即是答案。
//
// Time Complexity : O(2N) => O(N) // 2N 是因為每下一層，最壞狀況就是兩倍走訪時間
// 1 2 3
//     |
//     5 6 7 <= 會做兩次
//         |
//         8 9 10 <= 會做兩次
//
// 倘若每下一層，剛好都是最後元素有子元素時，因為與下層合併後，又會重合併的起始點開始再走訪，
// 所以最糟狀況是走訪該層兩次。但 O(2N) 仍然是 O(N)。
//
// Space Complexity: O(1) //空間複雜度相較前一種最法，不會隨著深度與數量變化，永遠維持O(1)。
//
var flattenBottomUp = function (head) {
  if (!head) return head;

  let cur = head;
  while (cur !== null) {
    if (cur.child === null) {
      cur = cur.next;
    } else {
      let tail = cur.child;

      while (tail.next !== null) {
        tail = tail.next;
      }

      if (cur.next !== null) {
        tail.next = cur.next;
        tail.next.prev = tail;
      }

      cur.next = cur.child;
      cur.next.prev = cur;
      cur.child = null;
      cur = cur.next;
    }
  }

  return head;
};

// 測試
(function () {
  console.log('Testing [p0430_FlattenMultilevelDoublyLinkedList]...');

  function Node(val, prev = null, next = null, child = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
    this.child = child;
  }

  /**
   * 建立多層級的鏈結串列結構。
   * @param {Array<any>} nodes
   */
  const build = function (nodes = []) {
    if (!nodes.length) return;

    const head = new Node(nodes[0]);
    let currentNode = head;

    for (let i = 1; i < nodes.length; i++) {
      const val = nodes[i];
      let nextNode;

      if (Array.isArray(val)) {
        nextNode = build(val);
        currentNode.child = nextNode;
        continue;
      }

      nextNode = new Node(val);
      currentNode.next = nextNode;
      nextNode.prev = currentNode;
      currentNode = nextNode;
    }

    return head;
  };

  /**
   * dfs走訪，並列出多層級鏈結串列的值，便於檢查錯誤。
   * @param {Node} head
   * @param {number[]} expect
   * @returns
   */
  const checkNodes = (head, expect) => {
    let i = 0;
    while (head) {
      // console.log(expect[i], head.val);
      if (expect[i] !== head.val) {
        return false;
      }
      head = head.next;
      i++;
    }
    return true;
  };

  const TestCase = (node, expect) => {
    console.log('flattenTopDown', checkNodes(flattenTopDown(node), expect));
    console.log('flattenBottomUp', checkNodes(flattenBottomUp(node), expect));
  };

  // case1
  //
  // 1, 2, 3, 4, 5, 6
  //       |
  //       7, 8, 9, 10
  //          |
  //          11, 12
  //
  console.log('\ncase1');
  TestCase(
    build([1, 2, 3, [7, 8, [11, 12], 9, 10], 4, 5, 6]),
    [1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6]
  );

  // case2
  //
  // []
  //
  console.log('\ncase2');
  TestCase(build([]), []);

  // case3
  // 1
  // |
  // 2
  // |
  // 3
  console.log('\ncase3');
  TestCase(build([1, [2, [3]]]), [1, 2, 3]);

  console.log('All Testing Passed ✅');
})();
