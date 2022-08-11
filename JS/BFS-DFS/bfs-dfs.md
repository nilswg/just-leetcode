BFS
---
廣度優先搜尋

### Queue(佇列)

```js
function bfs(start) {
  let queue = new Queue();
  queue.enqueue([start])

  while(queue.length > 0) {
    const [node] = queue.dequeue();

    // do something...
    process(node);

    // add new nodes to queue
    const newNodes = getNewNodes(node)
    queue.push(newNodes);
  }
}
```


DFS
---
深度優先搜尋


```js
function dfs(start) {

  const helper = (node) => {
    if (!node) return true;
  }

  return helper(start);
}
```