// @ts-check

// 題目鏈結
// https://leetcode.com/problems/merge-intervals

// 題目說明
// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
//

// Example 1:
// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
//

// Example 2:
// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.
//

// Constraints:
// 1 <= intervals.length <= 10⁴
// intervals[i].length == 2
// 0 <= starti <= endi <= 10⁴
//

// 解題重點
// 1.了解陣列的基本操作
// 2.先將新加入的區間放入後，進行排序。

// 解題思路
// 1. 先進行排序
// 2. 從頭開始每次兩兩比較，將發生重疊區間進行合併

/**
 * Solution : 雙指針
 *
 * 使用雙指針的方式:
 *  i: 指向合併完成後要回填的位址
 *  j: 指向當前要進行合併的對象
 *
 * 分析狀況:
 *  (0) 起始，i = 0; j = 1;
 *  (1) 無重疊，intervals[i+1] = intervals[j];  i+=1;  j+=1;
 *  (2) 重疊時，intervals[i][1] = Math.max(intervals[i][1], intervals[j][1]); j+=1;
 *  (3) 結束後，intervals.length = i+1，表示僅留下有效的部分。
 *
 *  e.g: [1,3],[2,6],[8,10],[15,18]
 *         i     j
 *
 *  ->   [1,6],[2,6],[8,10],[15,18]   (區段j，合併到區段i)
 *         i           j
 *
 *  ->   [1,6],[8,10],[8,10],[15,18]  (沒有重合，複製區段j到區段i+1，i移動至下一格)
 *                i             j
 *
 *  ->   [1,6],[8,10],[15,18],[15,18] (沒有重合，複製區段j到區段i+1，i移動至下一格)
 *                       i              j
 *
 *  ->   重新設定 intervals.length = i+1;  返回 intervals。
 *
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(1)
 *
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var mergeIntervalsTwoPointers = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let i = 0;
  for (let j = 1, n = intervals.length; j < n; j++) {
    if (intervals[i][1] >= intervals[j][0]) {
      intervals[i][1] = Math.max(intervals[i][1], intervals[j][1]);
    } else {
      intervals[i + 1] = intervals[j];
      i += 1;
    }
  }
  intervals.length = i + 1;
  return intervals;
};

// 測試
(function () {
  console.log('Testing [p0056_mergeIntervals]...');

  const isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0, n = arr1.length; i < n; i++) {
      if (arr1[i][0] !== arr2[i][0]) return false;
      if (arr1[i][1] !== arr2[i][1]) return false;
    }

    return true;
  };

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(
      isEqual(
        cb([
          [1, 3],
          [2, 6],
          [8, 10],
          [15, 18],
        ]),
        [
          [1, 6],
          [8, 10],
          [15, 18],
        ]
      )
    );
    console.log(
      isEqual(
        cb([
          [1, 4],
          [4, 5],
        ]),
        [[1, 5]]
      )
    );
  };

  testingWith(mergeIntervalsTwoPointers)

  console.log('All Testing Passed ✅');
})();
