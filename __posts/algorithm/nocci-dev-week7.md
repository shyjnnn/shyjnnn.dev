---
title: 노씨데브 코테 스터디 Week7
date: 2023-09-02
slug: 노씨데브-코테-스터디-Week7
tags: Algorithm, DP
summary: DP
category: 🧮Algorithm
---
## DP

문제에 대한 정답이 될 가능성이 있는 모든 해결책을 체계적이고 효율적으로 탐색하는 풀이법

1. 크고 복잡한 문제를 작은 문제들로 나눈다. (sub problem - 하위 문제)
2. 하위 문제의 답을 계산한다.
    - 중복 계산해야하는 하위 문제가 있다. (**Overlapping subproblem** - 중복 하위 문제)
    - 한 번 계산한 결과는 메모리에 저장하여 재계산 하지 않도록 한다 → 속도 향상 (memoization, dp table)
3. 하위 문제에 대한 답을 통해 원래 문제에 대한 답을 계산한다 (**Optimal substructure** - 최적 부분 구조)
    - 최적 부분 구조 : 하위 부분 문제에서 구한 최적의 답이 합쳐진 큰 문제의 최적의 답을 구할 수 있는 구조

### Top-down (memoization)

- 재귀를 사용하기 때문에 구현 시간이 빠르다. but 실행시간이 느릴 수 있다.

재귀 사용

```python
memo = {}
def fibo(n):
	if n == 1 or n ==2:
		return 1
	if n not in memo:
		memo[n] = fibo(n-1) +fibo(n-2)
	return memo[n]
```

### Bottom-up (tabulation)

- 반복문을 사용하기 때문에 실행시간이 빠르다.

base case부터 반복문으로 해결

```python
memo = {1: 1, 2: 1}
def fibo(n):
	for i in rnage(3, n+1)
		memo[i] = fibo(i-1) +fibo(i-2)
	return memo[n]
```

## **DP 총 정리**

완전 탐색으로 생각해보고 subproblem의 중복 여부를 판단하는 것이 첫 번째 순서이다. 

1. 일반적으로 재귀 함수로 비효율 적인 완전 탐색 코드를 작성한다.
    
    재귀 관계식(recurrence relation, 점화식)과 base case를 먼저 찾자.
    
2. 중복되는 subproblem의 계산 결과를 저장(memoize)한다.
3. 탑다운 → 바텀업으로 코드전환을 고려한다(stack overflow, 실행 시간 등을 고려)

<aside>
💡 문제에서 hint 찾기!

1. Optimum value(최대, 최소), 방법의 개수 등을 구할 때
    - ~의 최소 비용은?
    - ~의 최대 이익은?
    - ~를 하는 방법의 개수는?
    - What is the longest possible..
    - ~특정 지점에 도달할 수 있는지?
2. 미래의 계산이 앞선 계산 결과에 영향을 받을 때
    - 분할 정복과 반대
</aside>

코딩테스트에서 DP는 문제에 적용하기에 어려운 개념이기 때문에, 기본에 충실한 문제 위주로 출제할 수 밖에 없다.

## 문제 풀이

### **[70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)**

**접근 방법**

f(i) = f(i-1) + f(i-2)

모든 층으로 가는 경우의 수는 1 step 이전의 층의 경우의 수 + 2 step 이전의 츠으이 경우의수를 더한 값이다. 

1. bottom-up으로 풀이
    - base case인 stair 1과 stair 2를 설정한다.
    - dp tabel을 활용해 tabulation한다.
    - n층까지의 경우의 수를 구한 뒤 return 한다.

1. top-down으로 풀이 (recursion 사용)
    - base case인 stair 1과 stair 2일 경우 각각을 returngksek.
    - dp 테이블에 있을 경우, 그대로 return
    - 없을 경우 dp 테이블을 갱신한다.

**코드 작성**

```python
# bottom-up
class Solution:
    def climbStairs(self, n: int) -> int:
        if n == 1:
            return 1

        if n == 2:
            return 2

        dp = [0] * (n + 1)
        dp[1] = 1
        dp[2] = 2

        for i in range(3, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2]

        return dp[n]
```

```python
# top-down
class Solution:
    def climbStairs(self, n: int) -> int:
        dp = [-1] * (n + 1)
        return self.solution(n, dp)

    def solution(self, n, memo):
        if n <= 2:
            return n
        
        if dp[n] != -1:
            return dp[n]
        
        dp[n] = self.solution(n - 1, dp) + self.solution(n - 2, dp)
        return dp[n]
```

**배우게 된 점**

가장 먼저 직관적으로 떠오른 방법은 bottom-up 방식이다.

 $f(i) = f(i-1) + f(i-2)$를 도출해 낸 뒤, base case를 설정하니 쉬웠다.

단순한 문제이기 때문에, bottom-up에서 top-down으로 변경하는 것은 쉬웠다. dictionary를 사용하면 메모리 공간을 더 줄일 수 있을 것 같다.

문제를 풀면서 어떤 유형에서 bottom-up이 편하고, 어떤 유형에서 top-down 방식이 편한지 궁금했다.