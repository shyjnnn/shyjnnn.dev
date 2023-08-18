---
title: 노씨데브 코테 스터디 Week5
date: 2023-08-19
slug: 노씨데브-코테-스터디-Week5
tags: Algorithm, Graph
summary: 그래프
category: 🧮Algorithm
---

## 그래프

그래프(G)는 정점(vertex)들의 집합 V와 이들을 연결하는 간선(edge)들의 집합 E로 구성된 자료구조이다.

**그래프 종류**

- 방향 그래프 vs 무향 그래프 (코테에 가장 많이 등장)
- 다중 그래프 vs 단순 그래프
- 가중치 그래프 ⇒ 다익스트라

**그래프의 활용**

그래프는 이렇듯 연결 관계를 표현하기에 현실 세계의 사물이나 추상적인 개념들을 잘 표현 할 수 있다. 

- 도시들을 연결하는 도로망: 도시(vertex), 도로망(edge)
- 지하철 연결 노선도: 정거장(vertex),  정거장을 연결한 선(edge)
- 컴퓨터 네트워크: 각 컴퓨터와 라우터(vertex), 라우터간의 연결 관계(edge)
- 소셜 네트워크 분석: 페이스북의 계정(vertex), follow 관계(edge)

### **그래프의 구현**

그래프를 구현 하는 방법으로는 총 3가지가 있다. 

### 1. 인접 행렬 -  $O(V^2)$

행렬은  행(row)과 열(column)에 따라, 정보들을 직사각형 모양으로 배열한 것이다.

- 코테에서는 vertex는 많지만 보통 edge는 적은 편이다. 따라서 메모리 낭비가 심한 편

```json
graph = [
    [0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
]
```

![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/e7c269e3-92d3-4f66-bf42-a397255604a5)

### 2. 인접 리스트 -  $O(V + E)$

코테에서  활용하기 좋음

```python
graph = {
    1: [3, 5],
    2: [4, 5], 
    3: [1, 5], 
    4: [2, 5], 
    5: [1, 2, 3, 4]
}
```

### 3. 암시적 그래프 -  $O(V + E)$

가장 많이 사용한다. 미로 문제가 대표적이다.

```python
graph = [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
]
```
![Untitled 1](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/96c36315-b939-46e9-9fee-b5ae0756a20e)


상하좌우가 연결되어 있다는 것을 암시적으로 알 수 있다.

## 그래프 순회

그래프 탐색이라고도 하며, 그래프의 각 정점을 방문하는 과정을 말한다. 그래프 순회에는 크게 DFS와 BFS 2가지 알고리즘이 있다.

### BFS

```python
from collections import deque

def bfs(graph, start_v):
    visited = [start_v]

    queue = deque(start_v)
    while queue:
        cur_v = queue.popleft()
        for v in graph[cur_v]:
            if v not in visited:
                visited.append(v)
                queue.append(v)
    return visited
```

### DFS

```python
def dfs(graph, cur_v, visited=[]):
    visited.append(cur_v)
    for v in graph[cur_v]:
        if v not in visited:
            visited = dfs(graph, v, visited)
        return visited
```

## 문제 풀이

### **[200. Number of Islands](https://leetcode.com/problems/number-of-islands/)**

**접근 방법**

전형적인 BFS & DFS 문제이다

그래프를 순회하면서 (이중 for문) 땅이거나 방문하지 않은 곳이면 섬 개수를 +1 갱신한 후, bfs or dfs로 순회한다.

1. q가 없을 때 까지 bfs를 순회한다. next는 dx, dy로 설정한다.
    - 그래프의 가장자리를 확인하고,
    - 만약 grid == “1” (땅) 이거나 visited하지 않은 곳이면
        - 방문하고, queue에 append한다.
2. bfs로 순회한다.(재귀)
    - 그래프의 가장자리를 확인하고,
    - 만약 grid == “1” (땅) 이거나 visited하지 않은 곳이면
        - 방문하고, queue에 append한다.
    

**코드 작성**

```python
from collections import deque

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0

        m, n = len(grid), len(grid[0])
        visited = [[False] * n for _ in range(m)]
        dx, dy = [1, 0, -1, 0], [0, 1, 0, -1]

        def bfs(x, y):
            queue = deque()
            queue.append((x, y))
            visited[x][y] = True

            while queue:
                cur_x, cur_y = queue.popleft()
                for i in range(4):
                    xx, yy = cur_x + dx[i], cur_y + dy[i]
                    if xx >= 0 and xx < m and yy >= 0 and yy < n:
                        if grid[xx][yy] == "1" and not visited[xx][yy]:
                            visited[xx][yy] = True
                            queue.append((xx, yy))
					def dfs(x, y):
            visited[x][y] = True
            for i in range(4):
                xx, yy = x + dx[i], y + dy[i]
                if 0 <= xx < rows and 0 <= yy < columns and grid[xx][yy] == "1" and not visited[xx][yy]:
                    dfs(xx, yy)

        num_islands = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == "1" and not visited[i][j]:
                    num_islands += 1
                    bfs(i, j)
										# dfs(i,j)

        return num_islands 
```

**배우게 된 점**

무조건 bfs or dfs로 순회하는 것이 아닌, 특정 조건을 만족할 경우 (땅인데 방문하지 않았음)에만 순회하면 되는 것을 깨달았다. 즉, num_islands 갱신을 bfs or dfs 안에서 하는 것이 아닌 밖에서 하면 된다.