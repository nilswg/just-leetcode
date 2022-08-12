// @ts-check

// 題目鏈結
// https://leetcode.com/problems/insert-interval

// 題目說明
// You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.
// Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).
// Return intervals after the insertion.
//

// Example 1:
// Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]
//

// Example 2:
// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
//

// Constraints:
// 0 <= intervals.length <= 10^4
// intervals[i].length == 2
// 0 <= starti <= endi <= 10^5
// intervals is sorted by starti in ascending order.
// newInterval.length == 2
// 0 <= start <= end <= 10^5
//

// 解題重點
// 1.了解陣列的基本操作
// 2.先將新加入的區間放入後，進行排序。

// 解題思路
// 1. 將新加入的區間放入後，進行排序。
// 2. 從頭開始每次兩兩比較，將發生重疊區間進行合併
// 3. 合併方式影響時間複雜度與空間複雜度。

// Solution1 : 暴力解
//
// 1. 兩兩合併的方式使用 splice，更新合併後的新區間，刪掉被合併掉的部分，
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insertIntervalSplice = function (intervals, newInterval) {
  if (!newInterval) {
    return intervals;
  }
  intervals.push(newInterval);
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < intervals.length - 1; i++) {
    const cur = intervals[i];
    const nxt = intervals[i + 1];

    if (nxt[0] <= cur[1]) {
      intervals[i][0] = Math.min(cur[0], nxt[0]);
      intervals[i][1] = Math.max(cur[1], nxt[1]);
      intervals.splice(i + 1, 1);
      i -= 1;
    }
  }
  return intervals;
};

/**
 * Solution2 : 暴力解
 *
 * 1. 使用 splice 是一個相對昂貴的方式。
 * 2. 我們改使用雙指針的方式:
 *    i : 指向合併完成後要回填的位址
 *    i, j : 指向當前要進行合併的對象
 * 3. 限制條件上，newIntervals 不可為空。
 * 4. 開始時，i=0, j=1,
 *    (1) 無重疊，intervals[i+1] = intervals[j]；
 *               i+=1； j+=1
 *    (2) 重疊時，intervals[i][1] = Math.max(intervals[i][1], intervals[j][1])；
 *               i 不變； j+=1
 *    (3) 結束後，intervals.length = i+1，表示僅留下有效的部分。
 *
 *  e.g
 *   intervals : [[1,2],[3,5],[6,7],[8,10],[12,16]],  newInterval : [4,8]
 *
 *   排序後, intervals : [[1,2],[3,5],[4,8],[6,7],[8,10],[12,16]]
 *
 *   T = 0, i = 0, j = 1, [1,2], [3,5] 無重疊
 *   -> [3,5] 放到 i+1 位址, (i的下一筆位置)
 *   -> i +=1,
 *   -> j +=1
 *
 *   T = 1, i = 1, j = 2, [3,5], [4,8] 有重疊
 *   -> 合併成 [3,8] 放入到 i 位址,
 *   -> i 不變 (如果下一個也要合併，就用當前 i 位址)
 *   -> j +=1  (繼續找下一個區間)
 *
 *   T = 2, i = 1, j = 3, [3,8], [6,7] 有重疊
 *   -> 合併成 [3,8] 放入到 i 位址,
 *   -> i 不變
 *   -> j +=1
 *
 *   T = 3, i = 1, j = 4, [3,8], [8,10] 有重疊
 *   -> 合併成 [3,10] 放入到 i 位址,
 *   -> i 不變
 *   -> j +=1
 *
 *   T = 4, i = 1, j = 5, [3,10], [12,16] 無重疊
 *   -> [12,16] 放到 i+1 位址,
 *   -> i +=1,
 *   -> j +=1
 *
 *   T = 5, i = 2, j = 6 (j < intervals.length) 結束迴圈
 *   -> intervals.length = 3 (i+1)
 *   -> 返回結果 intervals
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(1)
 *
 * @param {*} intervals
 * @param {*} newInterval
 * @returns
 */
var insertIntervalTwoPointers = function (intervals, newInterval) {
  if (!newInterval) {
    return intervals;
  }

  intervals.push(newInterval);
  intervals.sort((a, b) => a[0] - b[0]);

  let i = 0;
  let n = intervals.length;

  for (let j = 1; j < n; j++) {
    if (intervals[i][1] >= intervals[j][0]) {
      intervals[i][1] = Math.max(intervals[i][1], intervals[j][1]);
    } else {
      intervals[i + 1] = intervals[j];
      i += 1;
    }
  }
  intervals.length = i+1;
  return intervals;
};

// 測試
(function () {
  console.log('Testing [p0057_insertInterval]...');

  /**
   * Write Some Testing here
   */

  const isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0, n = arr1.length; i < n; i++) {
      if (arr1[i][0] !== arr2[i][0]) return false;
      if (arr1[i][1] !== arr2[i][1]) return false;
    }

    return true;
  };

  const testingWith = (cb) => {
    console.log(isEqual(cb([], null), []));
    console.log(isEqual(cb([], [1, 2]), [[1, 2]]));
    console.log(
      isEqual(
        cb(
          [
            [1, 3],
            [6, 9],
          ],
          [2, 5]
        ),
        [
          [1, 5],
          [6, 9],
        ]
      )
    );

    console.log(
      isEqual(
        cb(
          [
            [1, 2],
            [3, 5],
            [6, 7],
            [8, 10],
            [12, 16],
          ],
          [4, 8]
        ),
        [
          [1, 2],
          [3, 10],
          [12, 16],
        ]
      )
    );
  };

  console.log('Testing [insertIntervalSplice]...');
  testingWith(insertIntervalSplice);

  console.log('Testing [insertIntervalTwoPointers]...');
  testingWith(insertIntervalTwoPointers);

  console.log('All Testing Passed ✅');
})();
