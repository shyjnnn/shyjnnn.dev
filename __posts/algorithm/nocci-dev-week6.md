---
title: 노씨데브 코테 스터디 Week6
date: 2023-08-26
slug: 노씨데브-코테-스터디-Week6
tags: Algorithm, BFS, DFS
summary: dfs, bfs 최단거리
category: 🧮Algorithm
---
## 최단거리 문제 풀이

<aside>
💡 최단 거리는 99% BFS를 사용해야한다.

BFS는 레벨 단위로 탐색을 수행하기 때문에, 시작 지점에서부터 목표 지점까지의 최단 경로를 보장한다. 반면 DFS는 더 깊게 파고들며, 이로 인해 최단 경로를 보장하지 않는다. 때문에 미로찾기나 최단 경로 문제에서는 목적지를 찾을 때까지 깊이 탐색하다가 길을 막히면 이전 단계로 돌아와야 하는데, 이 과정에서 최단 경로를 찾는 것이 보장되지 않는다.

</aside>

### **[1091. Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/) - 최단거리**

접근 방법

BFS를 활용하는 전형적인 최단거리 구하기 문제이다.

1. 8가지 방향을 설정한다
2. 시작점은 0,0이고, 만약 목적지에 도착했을 땐 cur_len을 retrun한다.
3. 연결된 vertex를 순회한다.
    - 만약 grid가 0이고(길) 방문한 적이 없다면 cur_len을 +1 갱신하고 queue에 넣는다

**코드 작성**

```python
from collections import deque

class Solution:
    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
        
        n = len(grid)
        visited = [[False] * n for _ in range(n)]
        dx, dy = [1, 1, 0, -1, -1, -1, 0, 1], [0, 1, 1, 1, 0, -1, -1, -1]
        shortest_path_len = -1

        if not grid or grid[0][0] == 1 or grid[-1][-1] == 1:
            return shortest_path_len
        if n == 1:
            return 0
     

        queue = deque()
        queue.append((0, 0, 1))
        visited[0][0] = True

        while queue:
            cur_x, cur_y, cur_len = queue.popleft()
            # 목적지에 도착했을 때 cur_len을 shortest_path_len에 저장
            if cur_x == n-1 and cur_y == n-1:
                print("durl")
                shortest_path_len = cur_len
                break

            # 연결된 vertex 확인하기
            for i in range(8):
                xx, yy = cur_x + dx[i], cur_y + dy[i]
                if 0 <= xx < n and 0 <= yy < n:
                    if grid[xx][yy] == 0 and not visited[xx][yy]:
                        queue.append((xx, yy, cur_len + 1))
                        visited[xx][yy]= True
        
 
        return shortest_path_len
```

**배우게 된 점**

1. BFS는 레벨 단위로 탐색을 수행하기 때문에, 시작 지점에서부터 목표 지점까지의 최단 경로를 보장한다는 것을 알게되었다. DFS를 사용하면 비효율적인 이유는, DFS는 더 깊게 파고들며, 이로 인해 최단 경로를 보장하지 않기 때문이다. 
    
    최단 거리 문제는 매우 흔하기 때문에 BFS 템플릿을 외우는 것이 매우 중요할 것 같다.
    
2. tuple을 deque에 넣고 싶을 경우, 바로 할당하면 안되고 append로 해야한다. (매우 중요) cannot unpack non-iterable int object 에러가 나기 때문이다. 
    
    즉, `queue = deque((0, 0, 1))`가 아닌 
    
    ```json
    queue = deque()
    queue.append((0, 0, 1))
    ```
    
    이렇게 해야한다.
    

### **[841. Keys and Rooms](https://leetcode.com/problems/keys-and-rooms/)**

**접근 방법**

모든 rooms[I]는 unique하다 → 중복 처리 안해도 된다.

제약 조건 n이 1000이하, 때문에 n^2 가능하다

- 시간 복잡도 :  $O(V + E)$
1. BFS로 접근
    - 0번방에 가서 -> 그 내부의 모든 방으로 가보기
    - 만약 그 방이 visited가 아니면 queue에 append, visited 처리
2. DFS로 접근
    - 먼저 방문 처리하고, 다음 방문할 곳을 rooms 배열에서 for문으로 찾는다
    - 만약 방문한 적이 없다면 dfs로 방문한다.

**코드 작성**

```python
from collections import deque

class Solution:
    def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
        
        visited = [False] * len(rooms)
        
        queue = deque()
        queue.append(0)

        def bfs():
            visited[0] = True # 필수
            while queue:
                cur_room = queue.popleft()
                for key in rooms[cur_room]:
                    if not visited[key]:
                        queue.append(key)
                        visited[key] = True

        def dfs(room):
            visited[room] = True
            for key in rooms[room]:
                if not visited[key]:
                    dfs(key)

        bfs()
        # dfs(0)
        return all(visited)
```

**배우게 된 점**

가장 먼저 떠오른 방법은 완전 탐색을 하는 것이었고, BFS이다. keys들을 우선 queue에 저장해 다음 방문 목적지로 취급하였다. 처음에는 0번방에 가서 0번이 빈 배열일 경우 바로 False해주는 조건을 추가했었는데, 그럴 필요가 없다는 것을 깨달았다. 어차피 for문으로 들어가지 못하기 때문에 바로 queue가 비게 되기 때문이다.

BFS로 풀고 나니 완전탐색은 DFS로도 풀 수 있다는 것을 알고 있어서 (+ 조건이 까다롭지 않아서) DFS도 시도해보았다. 다음 방문하는 곳을 rooms[i] 내부의 배열에 있다는 점이 특이했고, 단순한 문제라 구현이 쉬웠다.