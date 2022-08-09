BFS
---
廣度優先搜尋

### Quene(佇列)

```js
function bfs(start) {
  let quene = [];
  quene.push([start])

  while(quene.length > 0) {
    const [node] = quene.pop();

    // do something...
    process(node);

    // add new nodes to quene
    const newNodes = getNewNodes(node)
    quene.push(newNodes);
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