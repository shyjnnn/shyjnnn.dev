---
title: 다익스트라 알고리즘
date: 2023-06-13
slug: 다익스트라-Dijkstra-알고리즘
tags: Algorithm, Dijkstra
category: 🧮Algorithm
---

# **다익스트라(dijkstra)**

## 개념

> 한 출발점(정점 - 노드)에서 모든 다른지점까지의 최단거리를 구하는 알고리즘 중 하나
> 
> 
> <aside>
> 💡 최소 비용 구하는 알고리즘의 종류
> 
> - 다익스트라(dijkstra) 알고리즘
> - 벨만-포드 알고리즘
> - 프로이드 워샬 알고리즘
> </aside>
> 

도착 노드 뿐만 아니라 **모든 다른 노드까지 최단 경로로 방문**하며 각 노드까지의 최단 경로를 모드 찾게 된다. 즉, 매번 최단 경로의 노드를 선택해 탐색을 반복하는 것!

## 동작 단계

① 출발 노드와 도착 노드를 설정한다.

② '최단 거리 테이블'을 초기화한다.

③ 현재 위치한 노드의 인접 노드 중 방문하지 않은 노드를 구별하고, **방문하지 않은 노드 중 거리가 가장 짧은 노드를 선택**한다. 그 노드를 **방문 처리**한다.

④ 해당 노드를 거쳐 다른 노드로 넘어가는 **간선 비용(가중치)을 계산**해 **'최단 거리 테이블'을 업데이트**한다.

⑤ ③~④의 과정을 반복한다.

## 구현 방법

방문하지 않은 노드를 다루는 방식에 따라 2가지의 방법이 있다.

### 1. 순차 탐색

방문하지 않은 노드 중 **거리값이 가장 작은 노드**를 선택해 다음 탐색 노드로 삼는다. 이 노드를 찾는 방식이 순차 탐색을 사용하는 것이다.

- 시간 복잡도 : `O(N^2)`
    - 거리 테이블의 앞에서부터 찾아내야하므로 노드의 개수 만큼 순차 탐색을 수행한다.
- 코드
    
    ```python
    import sys
    input = sys.stdin.readline
    INF = int(1e9)
    
    # 방문하지 않은 노드이면서 시작노드와 최단거리인 노드 반환
    def get_smallest_node():
        min_value = INF
        index = 0
        for i in range(1, n+1):
            if not visited[i] and distance[i] < min_value:
                min_value = distance[i]
                index = i
        return index
    
    # 다익스트라 알고리즘
    def dijkstra(start):
        # 시작노드 -> 시작노드 거리 계산 및 방문처리
        distance[start] = 0
        visited[start] = True
        # 시작노드의 인접한 노드들에 대해 최단거리 계산
        for i in graph[start]:
            distance[i[0]] = i[1]
    
        # 시작노드 제외한 n-1개의 다른 노드들 처리
        for _ in range(n-1):
            now = get_smallest_node()  # 방문X 면서 시작노드와 최단거리인 노드 반환
            visited[now] = True        # 해당 노드 방문처리
            # 해당 노드의 인접한 노드들 간의 거리 계산
            for next in graph[now]:
    						# 시작->now 거리 + now->now의 인접노드 거리
                cost = distance[now] + next[1]
    						# cost < 시작->now의 인접노드 다이렉트 거리
                if cost < distance[next[0]]:
                    distance[next[0]] = cost
    ```
    

### 2. 우선순위 큐

- 시간 복잡도 : `O(logN)`

순차 탐색을 사용할 경우 노드 개수에 따라 탐색 시간이 매우 오래 걸릴 수 있다. 이를 개선한 것이 우선순위 큐를 사용하는 방법이다.

거리 값을 담을 우선순위 큐는 힙으로 구현한다. 

- 만약 최소 힙으로 구현한다면 매번 루트 노드가 최소 거리를 가지는 노드가 될 것이다.
- 파이썬의 경우 `PriorityQueue`나 `heapq` 라이브러리로 우선순위 큐, 최소 힙이 지원된다.

우선순위 큐에서 사용할 **우선순위**의 기준은 **시작 노드로 부터 가장 가까운 노드**가 된다. 따라서 큐의 정렬은 최단 거리인 노드를 기준으로 최단 거리를 가지는 노드를 앞에 배치한다.

우선순위 큐를 사용하면 **방문 여부를 기록할 배열이 없어도 된다**. 우선 순위 큐가 알아서 **최단 거리의 노드를 앞으로 정렬**하기 때문에, **기존 최단 거리보다 크다면 무시하면 된다**!

- 만약 기존 최단 거리보다 더 작은 값을 가지는 노드가 있다면, 그 노드와 거리를 우선 순위 큐에 넣는다.
- 우선 순위 큐에 삽입 되는 형태는 `<거리, 노드>` 꼴이다.

- 코드
    
    ```python
    import sys
    import heapq
    input = sys.stdin.readline
    
    n, m = map(int, input().split())
    start = int(input())
    INF = int(1e9)
    distance = [INF] * (n+1)
    graph = [[] for _ in range(n+1)]
    
    for _ in range(m):
        a, b, c = map(int, input().split())
        graph[a].append((b, c))
    
    def dijkstra(start):
        q = []
        heapq.heappush(q, (0, start))  # 시작노드 정보 우선순위 큐에 삽입
        distance[start] = 0            # 시작노드->시작노드 거리 기록
        while q:
            dist, node = heapq.heappop(q)
            # 큐에서 뽑아낸 거리가 이미 갱신된 거리보다 클 경우(=방문한 셈) 무시
            if distance[node] < dist:
                continue
            # 큐에서 뽑아낸 노드와 연결된 인접노드들 탐색
            for next in graph[node]:
                cost = distance[node] + next[1]   # 시작-> node거리 + node-> node의인접노드 거리
                if cost < distance[next[0]]:      # cost < 시작-> node의인접노드 거리
                    distance[next[0]] = cost
                    heapq.heappush(q, (cost, next[0]))
    
    dijkstra(start)
    
    for i in range(1, len(distance)):
        if distance[i] == INF:
            print('도달할 수 없음')
        else:
            print(distance[i])
    ```