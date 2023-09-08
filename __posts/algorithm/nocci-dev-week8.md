---
title: 노씨데브 코테 스터디 Week8
date: 2023-09-09
slug: 노씨데브-코테-스터디-Week8
tags: Algorithm, DP
summary: DP 문제 풀이
category: 🧮Algorithm
---
## 문제 풀이

### **[62. Unique Paths](https://leetcode.com/problems/unique-paths/)**

**접근 방법**

Top-Down 방식을 사용한다.

- 점화식
    - dp[i][j] = dp[i-1][j] + dp[i][j-1]

bottom right으로 가는 최단 경로 수는, 위에서 온 경로의 수와 왼쪽에서 온 경로의 수를 합친 것이다.

base case는 첫번째 row이거나 첫번째 column일때이다. 이때는 해당 칸까지 갈 수 있는 경로의 수가 첫번째 row의 경우 왼쪽에서 오고, 첫번째 column의 경우 위에서 오는 경로 딱 한가지만 존재하기 때문에 1로 설정한다.

**코드 작성**

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[0] * n for _ in range(m)]
        for i in range(m):
            for j in range(n):
                if i == 0 or j == 0:
                    dp[i][j] = 1
                    continue
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
        return dp[-1][-1]
```

**배우게 된 점**

직관적으로 떠오르기 쉬운 방법이었다. bottom-up의 전형적인 문제인 듯!

bfs 완전탐색으로 해도 시간초과 안날 듯하다. $O(m*n)$

그러나 dp를 사용하면 중복 계산을 줄이기 때문에 훨씬 효율적이다. 가장 작은 case로 쪼갤 수 있고(중복 하위 문제), 그 쪼갠 케이스를 합쳤을 때 해가 나오기 때문에 (최적 부분 구조) DP를 활용할 수 있다.