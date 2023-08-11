---
title: 노씨데브 코테 스터디 Week4
date: 2023-08-12
slug: 노씨데브-코테-스터디-Week4
tags: Algorithm, Recursion, Tree
summary: 재귀함수, 트리 순회 (level order, preorder , inorder, postorder traversal)
category: 🧮Algorithm
---
## 재귀 함수

: 자신을 정의할때, 자기 자신을 재참조하는 함수

**팩토리얼(factorial)**

```python
def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)
```

함수 `factorial`의 반환에 `factorial`를 재참조한다. 

**피보나치(fibonacci)**

```python
def fibo(n):
    if n == 1 or n == 2:
        return 1
    return fibo(n - 1) + fibo(n - 2)
```

함수 `fibo`의 반환에 `fibo`를 재참조한다.

### **recurrence relation(점화식)과 base case**

재귀는 reccurence relation과 base case로 구성되는 것이다. reccurence relation은 해답을 직관적으로 제공해주며, base case는 무한 루프를 방지해준다. 두 가지를 모두를 놓치지 않아야한다.

1. 식들의 관계를 생각해본다. (reccurence relation)
2. $n= 0, n=1 , \cdots$  인 경우를 생각해본다. (base case)

**recurrence relation(점화식)**

 `factorial`의 경우, $f(n)=n*f(n-1)$

 `fibonacci`의 경우,  $f(n) = f(n-1) +f(n-2)$으로 표현된다.

**base case**

더 이상 자기 자신을 재참조 하지 않는 상황을 의미한다. 무한 루프를 방지 해주는 base case를 설정해줘야한다.

`factorial`의 경우, $f(1) = 1$

`fibonacci`의 경우, $f(1) = 1, \ f(2) = 1$

### 재귀의 시간 복잡도

<aside>
💡 재귀의 시간복잡도 = 재귀 함수 호출 수 x (재귀 함수 하나당) 시간복잡도

</aside>

- $O(n)$ 에 비래하는 호출 :  $f(n)=f(n-1)+n$
- $O(2^n)$ 에 비래하는 호출 : $f(n)=f(n-1)+f(n-2)$
- $O(3^n)$ 에 비래하는 호출 : $f(n)=f(n-1)+f(n-2)+f(n-3)$
    
    …
    
- $O(log_2N)$ 에 비래하는 호출 :  이진 탐색

## 트리

서로 연결된 Node의 계층형 자료구조로써, root 와 부모-자식 관계의 subtree로 구성되어 있다. 리스트가 단순히 순서를 매겨 데이터를 나열 하는 선형 자료구조였다면, 트리는 비선형적인 자료구조이다.

- 선형 자료구조: 하나의 자료 뒤에 하나의 자료가 존재하는 것
- 비선형 자료구조:  하나의 자료 뒤에 여러개의 자료가 존재하는 것

**기본적인 트리 관련 용어**

- 정점 (Vertex): A,B,C와 같은 값을 갖고 나타내며, 노드로 표현됨
- 간선 (Edge): 정점 간에 연결된 선
- 자식 노드 (Child), 부모 노드 (Parent)
- 형제 노드(sibling): 같은 부모를 가진 노드
- 리프 노드 (Leef): 더 이상 뻗어나갈 수 없는 마지막 노드
![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/7abc88fa-7667-47f9-8a64-7310f006d4ba)


- 차수 (degree): 각 노드가 갖는 자식의 수. 모든 노드의 차수가 n개 이하인 트리를 n진 트리리라고 함
![Untitled 1](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/0e563b7f-3560-462a-88bb-7d9f6104bc90)


- 조상 (ancestor) 위쪽으로 간선을 따라가면 만나는 노드
- 자손 (descendant): 아래쪽으로 간선을 따라가면 만나는 노드
- 루트 노드(Root): 트리의 시작 점
- 높이 (height): 루트 노드에서 가장 멀리 있는 리프 노드 까지의 거리
- 레벨 (level): 루트 노드에서 떨어진 거리
    ![Untitled 2](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/4846fc42-4dc3-4c26-90f0-95912248f63e)

    

### 트리 순회

1. level order traversal = BFS (큐 사용)

DFS = 스택 사용 ⬇️ 

1. preorder traversal 전위 순회
2. inorder traversal 중위 순회
3. postorder traversal  후위 순회

## 문제 풀이

### **[236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) - Post Order**

**접근 방법**

이진 트리가 주어졌을 때, 트리에서 주어진 두 노드의 최소 공통 조상(LCA)을 구한다.

- 노드가 `p`와 같으면, `p`를 발견한 것이므로 해당 노드를 반환한다.
- 노드가 `q`와 같으면, `q`를 발견한 것이므로 해당 노드를 반환한다.
- 왼쪽 서브트리와 오른쪽 서브트리에 대해 재귀적으로 LCA를 찾는다.

post order 순회를 DFS를 사용해서 순회한다.

1. 만약 root가 p이거나 q이면 현재 노드 자체가 LCA이므로 root를 반환한다.
    1. 그렇지 않은 경우, `left`와 `right`를 각각 왼쪽 서브트리와 오른쪽 서브트리에서 재귀적으로 얻는다
2. 만약 left와 right의 값이 존재하면 root를 반환한다.
    1. 즉, `p`와 `q`를 서로 다른 서브트리에서 찾았다면 현재 노드 `root`가 LCA이이다
3. left와 right 둘 중 하나만 존재하면 존재하는 값을 반환한다.

**코드 작성**

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if root is None:
            return None

        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        if root == p or root == q:
            return root

        elif left and right:
            return root
        return left or right
```

**배우게 된 점**

이진 트리의 DFS 탐색 방법을 사용하여 노드를 방문하는 방법을 배웠다. 두 노드의 LCA를 찾을 때 재귀적 접근 방법과 조건문의 사용한다. LCA 유형을 푸는 법을 외워야겠다.

- 풀어보기
    
    [3176번: 도로 네트워크](https://www.acmicpc.net/problem/3176)
    

### **[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) - level order**

**접근 방법**

DFS를 사용해 post order로 접근.  각 깊이를 저장한 후, 가장 큰 숫자를 반환한다

BFS를 사용해 level order로 접근했다.

1. q에 root와 level을 tuple로 저장한다.
2. 만약 left 혹은 right이 있다면 level을 +1한다.
3. 모든 순회를 마치고 level을 반환해 트리의 최대 깊이를 구한다.

## 코드 작성

### level order with Queue

```python
from collections import deque

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        
        q = deque()
        q.append((root, 1))  # 초기 레벨은 1로 시작

        while q:
            current, level = q.popleft()

            if current.left:
                q.append((current.left, level + 1))
            if current.right:
                q.append((current.right, level + 1))
        
        return level
```

### post order with recursion

```jsx
from collections import deque

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        max_left_depth = self.maxDepth(root.left)
        max_right_depth = self.maxDepth(root.right)
        return max(max_left_depth, max_right_depth) + 1
```

## 배우게 된 점

강의를 보지 않고, 처음 생각한 방법은 dfs이다. 각 깊이를 저장한 후, 가장 큰 숫자를 반환하고자 했다. 나아가서 level order로도 풀 수 있어서 BFS로 풀었는데, BFS 템플릿을 외워뒀더니 확실히 편했다.

DFS를 사용해 post order로 접근.  각 깊이를 저장한 후, 가장 큰 숫자를 반환한다

BFS를 사용해 level order로 접근했다.

1. q에 root와 level을 tuple로 저장한다.
2. 만약 left 혹은 right이 있다면 level을 +1한다.
3. 모든 순회를 마치고 level을 반환해 트리의 최대 깊이를 구한다.

**코드 작성**

- level order with Queue
    
    ```python
    from collections import deque
    
    class Solution:
        def maxDepth(self, root: Optional[TreeNode]) -> int:
            if root is None:
                return 0
            
            q = deque()
            q.append((root, 1))  # 초기 레벨은 1로 시작
    
            while q:
                current, level = q.popleft()
    
                if current.left:
                    q.append((current.left, level + 1))
                if current.right:
                    q.append((current.right, level + 1))
            
            return level
    ```
    
- post order with recursion
    
    ```jsx
    from collections import deque
    
    class Solution:
        def maxDepth(self, root: Optional[TreeNode]) -> int:
            if root is None:
                return 0
            max_left_depth = self.maxDepth(root.left)
            max_right_depth = self.maxDepth(root.right)
            return max(max_left_depth, max_right_depth) + 1
    ```
    

**배우게 된 점**

강의를 보지 않고, 처음 생각한 방법은 dfs이다. 각 깊이를 저장한 후, 가장 큰 숫자를 반환하고자 했다. 나아가서 level order로도 풀 수 있어서 BFS로 풀었는데, BFS 템플릿을 외워뒀더니 확실히 편했다.