// @ts-check

/**
 * similar to build-max-heap, but assumes part of array is sorted.
 *
 * e.g
 *
 *   Step 1: 先排序 (Sort it first)
 *
 *      [2,8,5,3,9,1]                     [9,8,5,3,2,1]
 *
 *            2                                 9
 *          /   \                             /   \
 *         8     5    build-max-heap =>      8     5
 *        / \   /                           / \   /
 *       3   9 1                           3   2 1
 *
 *           tree                            max heap
 *
 *
 *   Step 2:
 *   (1) 頭尾交換後才pop: swap(0, this._heap.length - 1)； this._heap.pop();
 *   (2) Sift Down
 *
 *            1                       8                       8
 *          /   \                   /   \                   /   \
 *         8     5       =>        1     5       =>        3     5
 *        / \                     / \                     / \
 *       3   2                   3   2                   1   2
 *   (9與1互換後，被pop掉)
 *
 */
export class Heap {
  /**
   * comparator 實作範例
   *
   * 大到小為 (a, b) => a > b (Max-Heap) (預設)
   *
   * 小到大為 (a, b) => b > a (Min-Heap)
   *
   * @param {*} comparator
   */
  constructor(comparator = (a, b) => a > b) {
    this.heap = [];
    this.comparator = comparator;
  }
  size = () => this.heap.length;
  /**
   * @returns {boolean}
   */
  isEmpty = () => this.heap.length === 0;
  /**
   * @param {number} i
   * @param {number} j
   * @returns {boolean}
   */
  compare(i, j) {
    return this.comparator(this.heap[i], this.heap[j]);
  }
  /**
   * @param {number} i
   * @param {number} j
   */
  swap(i, j) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
  /**
   * 時間複雜度 :O(logN)
   * @param {number} i
   */
  shiftUp(i) {
    let p = Math.floor((i - 1) / 2);
    if (p >= 0 && this.compare(i, p)) {
      this.swap(i, p);
      this.shiftUp(p);
    }
  }
  /**
   * 時間複雜度 :O(logN)
   * @param {any} x
   * */
  push(x) {
    this.heap.push(x);
    this.shiftUp(this.heap.length - 1);
  }
  /**
   * 時間複雜度 :O(logN)
   * @param {number} i
   */
  shiftDown(i) {
    let c = i * 2 + 1; // left
    if (c + 1 < this.heap.length && this.compare(c + 1, c)) {
      c += 1;
    }
    if (c < this.heap.length && this.compare(c, i)) {
      this.swap(i, c);
      this.shiftDown(c);
    }
  }
  /**
   * 此處要取頭端返回，先頭尾交換，才透過pop去取得原先頭端元素。
   * 時間複雜度 :O(logN)
   *
   * @return {any}
   * */
  pop() {
    this.swap(0, this.heap.length - 1);
    let root = this.heap.pop();
    this.shiftDown(0);
    return root;
  }
  peek() {
    return this.heap[0];
  }
}
