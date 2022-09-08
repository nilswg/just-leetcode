// @ts-check

// 題目鏈結
// https://leetcode.com/problems/find-the-town-judge

// 題目說明
// In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.
// If the town judge exists, then:
// The town judge trusts nobody.
// Everybody (except for the town judge) trusts the town judge.
// There is exactly one person that satisfies properties 1 and 2.
// You are given an array trust where trust[i] = [ai, bi] representing that the person labeled ai trusts the person labeled bi.
// Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.
//

// Example 1:
// Input: n = 2, trust = [[1,2]]
// Output: 2
//

// Example 2:
// Input: n = 3, trust = [[1,3],[2,3]]
// Output: 3
//

// Example 3:
// Input: n = 3, trust = [[1,3],[2,3],[3,1]]
// Output: -1
//

// Constraints:
// 1 <= n <= 1000
// 0 <= trust.length <= 10⁴
// trust[i].length == 2
// All the pairs of trust are unique.
// ai != bi
// 1 <= ai, bi <= n
//

// 解題重點
// 1. 此題為Grapth的簡單題，需將 trust 轉換成圖以分析。 
// 2. 根據圖與題目說明，因能推敲法官(judge) 一定要獲得(不含自身) n-1 人的信任，
//    故限制 trust.length < n - 1 將無法找出法官，返回 -1;
// 3. 直覺上，應能決定使用 HashMap 來統計信任數
// 4. 進一步思考優化作法，

// 解題思路
// 1. 使用HashMap來統計信任數
// 2. 此外，法官不會信任其他人，所以這樣統計，被信任者信任數加一；但相反的，信任他人者則信任數減少。

// Solution :
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)

/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (n, trust) {
  if (trust.length < n - 1) return -1;

  let cnts = new Array(n).fill(0);

  // 先統計信任數
  for (const [a, b] of trust) {
    cnts[a-1] -= 1;
    cnts[b-1] += 1;
  }

  // 找出信任數剛好為 n-1 者
  for (let i = 0; i < n; i++) {
    if (cnts[i] === n - 1) return i + 1;
  }
  return -1;
};

/**
 * 此題無法使用 BoyerMoore
 * 
 * 因為 judge 的受信任得票數固定為 n-1，隨著 n 變大，將遠小於 trust.length。
 * 
 * e.g 
 *    n = 3 時, 需 3-1=2票, trust.length 可能組合: (3-1)^2 = 4; => 1/2   (符合)
 *    n = 4 時, 需 4-1=3票, trust.length 可能組合: (4-1)^2 = 9; => 1/3   (不符合)
 *    n = 5 時, 需 5-1=4票, trust.length 可能組合: (5-1)^2 = 16; => 1/4 (不符合)
 *    ...
 *    n = N 時, 需 N-1 票,  trust.length = (N-1)^2 ; => 1/N-1
 * 
 * 
 *    所以想透過 BoyerMoore 選出 judge 並不合適。
 * 
 * 
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
// var findJudgeBoyerMoore = function (n, trust) {
//   if (!trust.length) return 1;

//   let judge = -1;
//   let cnt = 0;

//   for (const [a, b] of trust) {
//     if (cnt > 0 && b === judge) {
//       cnt += 1;
//     } else if (cnt === 0) {
//       judge = b;
//       cnt = 1;
//     } else {
//       cnt -= 1;
//     }
//   }

//   cnt = 0;
//   for (const [a, b] of trust) {
//     if (a === judge) return -1;
//     if (b === judge) cnt += 1;
//   }

//   return cnt === n - 1 ? judge : -1;
// };

// 測試
(function () {
  console.log("Testing [p0997_findTheTownJudge]...");

  const testingWith = (cb) => {
    console.log(cb(1, []) === 1);
    console.log(cb(2, [[1, 2]]) === 2);
    
    console.log(
      cb(3, [
        [1, 3],
        [2, 3],
      ]) === 3
    );
    
    console.log(
      cb(3, [
        [1, 3],
        [2, 3],
        [3, 1],
      ]) === -1
    );
    
    console.log(
      cb(4, [
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [4, 3],
      ]) === 3
    );
    
    
    console.log(
      cb(4, [
        [1, 2],
        [1, 3],
        [2, 1],
        [2, 3],
        [1, 4],
        [4, 3],
        [4, 1],
      ]) === 3
    );

    console.log(
      cb(4, [
        [1, 2],
        [1, 3],
        [2, 1],
        [2, 3],
        [1, 4],
        [4, 3],
        [3, 1],
      ]) === -1
    );
  };

  console.log('Testing [findJudge]')
  testingWith(findJudge);

  // console.log('Testing [findJudgeBoyerMoore]')
  // testingWith(findJudgeBoyerMoore);

  console.log("All Testing Passed ✅");
})();
