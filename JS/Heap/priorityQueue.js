class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  isEmpty() {
    return this._heap.length === 0;
  }
  _parent(i) {
    return Math.floor((i - 1) / 2);
  }
  _left(i) {
    return i * 2 + 1;
  }
  _right(i) {
    return i * 2 + 2;
  }
  _swap(i, j) {
    if (i === j) return;
    const tmp = this._heap[i];
    this._heap[i] = this._heap[j];
    this._heap[j] = tmp;
  }
  _compare(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  /**
   * 時間複雜度 :O(logN)
   */
  _shiftUp() {
    let i = this._heap.length - 1;
    let pi = this._parent(i);
    while (pi >= 0 && _compare(i, pi)) {
      this._swap(i, pi);
      i = pi;
      pi = this._parent(i);
    }
  }
  /** 時間複雜度 :O(logN) */
  push(x) {
    this._heap.push(x);
    this._shiftUp();
  }
  /**
   * 時間複雜度 :O(logN)
   * @param {*} i
   */
  _shiftDown(i = 0) {
    let l = this._left(i);
    let r = this._right(i);
    /**
     * get child index of i from left or right
     *
     * if (r < this._heap.length) {
     *   // l,r 皆有效，取符合條件者，進入while
     *   ci = this._compare(l, r) ? l : r;
     * } else if (l < this._heap.length) {
     *   // 取l，進入while
     *   ci = l;
     * } else {
     *   // 因l 超出範圍，無法進入while
     *   ci = l;
     * }
     */
    let ci = r < this._heap.length ? (this._compare(l, r) ? l : r) : l;

    while (ci < this._heap.length && this._compare(ci, i)) {
      this._swap(i, ci);
      i = ci;
      l = this._left(i);
      r = this._right(i);
      ci = r < this._heap.length ? (this._compare(l, r) ? l : r) : l;
    }
  }
  /** 時間複雜度 :O(logN) */
  pop() {
    if (!this._heap.length) return null;
    // 此處要取頭端返回，先頭尾交換，才透過pop去取得原先頭端元素。
    this._swap(0, this._heap.length - 1);
    let root = this._heap.pop();
    this._shiftDown(0);
    return root;
  }
}
