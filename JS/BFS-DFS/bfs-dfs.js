/**
 *
 * @param {Array<any>} arr1
 * @param {Array<any>} arr2
 */
 export const isArrayEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0, n = arr1.length; i < n; i++) {
    if (Array.isArray(arr1[i]) || Array.isArray(arr2[i])) {
      if (!isArrayEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  }

  return true;
};


/**
 * 簡易的Queue
 * 因為實作 BFS 中，Queue是相當核心的及儲存結構。對於時間複雜度有要求題目，
 * 若使用 JS 中陣列的 shift 方法來實現 queue 的pop/dequeue方法，其效能會非常差。
 */
export class Queue {

  constructor() {
    this._queue = [];
    this._qi = 0;
  }

  enqueue(element) {
    this._queue.push(element);
  }

  dequeue() {
    return this._queue[this._qi++];
  }

  isEmpty() {
    return this._queue.length === this._qi;
  }
}
