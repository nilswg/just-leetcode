// @ts-check

// 題目鏈結
// https://leetcode.com/problems/time-based-key-value-store

// 題目說明
// Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.
// Implement the TimeMap class:
// TimeMap() Initializes the object of the data structure.
// void set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp.
// String get(String key, int timestamp) Returns a value such that set was called previously, with timestamp_prev <= timestamp. If there are multiple such values, it returns the value associated with the largest timestamp_prev. If there are no values, it returns "".
//

// Example 1:
// Input
// ["TimeMap", "set", "get", "get", "set", "get", "get"]
// [[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
// Output
// [null, null, "bar", "bar", null, "bar2", "bar2"]
// Explanation
// TimeMap timeMap = new TimeMap();
// timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.
// timeMap.get("foo", 1);         // return "bar"
// timeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
// timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
// timeMap.get("foo", 4);         // return "bar2"
// timeMap.get("foo", 5);         // return "bar2"
//

// Constraints:
// 1 <= key.length, value.length <= 100
// key and value consist of lowercase English letters and digits.
// 1 <= timestamp <= 10⁷
// All the timestamps timestamp of set are strictly increasing.
// At most 2 * 10⁵ calls will be made to set and get.
//

// 解題重點
// 1. 瞭解 HashMap 與 BinarySearch

// 解題思路
// 1. 使用雜湊表儲存數據，每一筆數據包含 [value, timestamp]。
// 2. 透過set將數據存入進雜湊表，儲存的紀錄會以 timestamp 大小依序(升序)放入。
// 3. 使用get取出數據時，，考慮timestamp，應使用二分查找取出正確的紀錄。

/**
 * Solution :
 * 
 * 取出數據(get)時，須滿足 timestamp_prev <= timestamp。
 *
 * 已知，先前儲存於表中的紀錄，是透過key對應到一個陣列，而陣列中的每個元素包含 [value, timestamp]，
 * 其中，元素會根據 timestamp 由小到大的序列。故當get查找時，再通過二分查找取出滿足條件的紀錄即可。
 * 
 * 使用二分查找實作get時，須考慮以下狀況:
 * 1. 表中不存 key，返回 ""; 
 * 2. 表中存在key對應的序列時，使用二分查找該 timeStamp
 *    (1) 存在此 timeStamp，即返回該筆紀錄的值。
 *    (2) 不存在此 timeStamp，返回 l-1 位址的紀錄值。
 *        因為 l 代表目標"因被放入於序列中的位址"，根據題旨可向前找最近的紀錄返回。
 *        故返回 l-1，但是，l-1 < 0，則在此之前無任何紀錄，應返為返回 ''。
 * 
 * 
 * 時間複雜度分析
 * set 透過map查找，再push新的值，時間複雜度為O(1)
 * get 每次都要做BinarySearch檢查timestamp, N 為存入的數據量。時間複雜度為O(logN)
 * 綜合上述，故時間複雜度: O(1 + logN) ≒ O(logN)
 *
 * 空間複雜度分析:
 * 使用額外的 Map 來儲存 N 筆數據。
 *
 * 複雜度
 * Time Complexity : O(logN)
 * Space Complexity: O(N)
 */

class TimeMap {
  constructor() {
    this.map = new Map();
  }

  /**
   * @param {string} key
   * @param {string} value
   * @param {number} timestamp
   * @return {void}
   */
  set(key, value, timestamp) {
    if (this.map.has(key)) {
      this.map.get(key).push([value, timestamp]);
    } else {
      this.map.set(key, [[value, timestamp]]);
    }
  }

  /**
   * @param {string} key
   * @param {number} timestamp
   * @return {string}
   */
  get(key, timestamp) {
    const paris = this.map.get(key);
    if (!paris) return ''; // 不存在時要返回空字串

    return this.binarySearch(paris, timestamp); // 不存在時要返回空字串
  }

  binarySearch(pairs, target) {
    let l = 0;
    let r = pairs.length - 1;

    while (l <= r) {
      const m = (l + r) >> 1;
      const prevTimeStamp = pairs[m][1]; // [ value, timestamp ]
      if (prevTimeStamp === target) {
        return pairs[m][0];
      } else if (prevTimeStamp < target) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }

    return pairs[l - 1]?.[0] ?? '';
  }
}

// 測試
(function () {
  console.log('Testing [p0981_timeBasedKeyValueStore]...');

  const isEqual = (arr1, arr2) => {
    console.log('Output: ', arr1);
    console.log('Expected: ', arr2);
    if (arr1.length !== arr2.length) return false;
    for (let i = 0, n = arr1.length; i < n; i++) {
      if (arr1[i] !== arr2[i]) {
        console.log(`i:${i}, ${arr1[i]}, ${arr2[i]}`);
        return false;
      }
    }
    return true;
  };

  const testingWith = (testClass) => {
    console.log(`Testing ${testClass.name}`);

    const tester = (todos, args) => {
      let inst = new testClass();
      let output = [null];

      for (let i = 1; i < todos.length; i++) {
        const todo = todos[i];
        const arg = args[i];
        output.push(inst[todo](...arg) ?? null);
      }

      return output;
    };

    console.log(
      isEqual(
        tester(
          ['TimeMap', 'set', 'get', 'get', 'set', 'get', 'get'],
          [
            [],
            ['foo', 'bar', 1],
            ['foo', 1],
            ['foo', 3],
            ['foo', 'bar2', 4],
            ['foo', 4],
            ['foo', 5],
          ]
        ),
        [null, null, 'bar', 'bar', null, 'bar2', 'bar2']
      )
    );

    console.log(
      isEqual(
        tester(
          ['TimeMap', 'set', 'set', 'get', 'get', 'get', 'get', 'get'],
          [
            [],
            ['love', 'high', 10],
            ['love', 'low', 20],
            ['love', 5],
            ['love', 10],
            ['love', 15],
            ['love', 20],
            ['love', 25],
          ]
        ),
        [null, null, null, '', 'high', 'high', 'low', 'low']
      )
    );

    console.log(
      isEqual(
        tester(
          ['TimeMap', 'set', 'set', 'get', 'set', 'get', 'get'],
          [
            [],
            ['a', 'bar', 1],
            ['x', 'b', 3],
            ['b', 3],
            ['foo', 'bar2', 4],
            ['foo', 4],
            ['foo', 5],
          ]
        ),
        [null, null, null, '', null, 'bar2', 'bar2']
      )
    );
  };

  testingWith(TimeMap);

  console.log('All Testing Passed ✅');
})();
