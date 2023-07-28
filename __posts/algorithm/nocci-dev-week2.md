---
title: 노씨데브 코테 스터디 Week2
date: 2023-07-29
slug: 노씨데브-코테-스터디-Week2
tags: Algorithm, Linked List, Stack
summary: Linked List, Stack
category: 🧮Algorithm
---
## Linked List

Node 구조체가 연결되는 형식으로 데이터를 저장하는 자료 구조

**Node의 구현**

```jsx
class Node :
    def __init__(self, value = 0, next = None):
        self.value = value
        self.next = next
```

### 물리적 비연속석, 논리적 연속성

Linked List는 메모리상에서 비연속적으로 저장되어있지만, 각각의 node가 다음 노드의 메모리 주소값을 가리킴으로써 논리적으로 연속성을 갖게 된다.

```python
class LinkedList(object):
    def __init__(self):
        self.head = None
        self.tail = None

		def get(self, idx):
				current = self.head
				for _ in range(idx):
					current = current.next
				return current.value

    def append(self, value):
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node

```

|  | Linked list | Array |
| --- | --- | --- |
| access/update | $O(n)$ | $O(1)$  |
| insert_front | $O(1)$  | $O(n)$ |
| insert_at | $O(n)$ | $O(n)$  |
| insert_back | $O(n)$ | $O(1)$ | $O(1)$ amortized  |
| remove_front | $O(1)$  | $O(n)$ |
| remove_at | $O(n)$ | $O(n)$ |
| remove_back | $O(n)$ | $O(1)$ | $O(1)$  |

### 코테 적용 방법

1. Linked List 자유자재로 구현 (선형 자료구조 + 중간에 데이터 추가/삭제 용이)
2. Tree or Graph에 활용

## Queue (Deque)

> 먼저 저장한 데이터가 먼저 출력되는 선입선출 FIFO(First In First Out)형식으로 데이터를 저장하는 자료구조구현 방법이다.
> 
![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/ea25d913-e4d6-4b08-982e-728c6e16a7fe)


코테에서 단독으로 문제가 나오는 경우는 거의 없고, 다른 자료구조나 알고리즘을 구현하기 위해 사용된다.

- BFS에서 자주 사용된다

구현 방법

- Array list based
    - `enqueue` - $O(1)$
    - `dequeue` - $O(n)$
    
    : 시간복잡도의 이점이 전혀 없다.
    
- Lined list based
    - `from collections import deque`
    - deque(doubly ended queue)은 linked list로 만들어져있다.
        - 양쪽으로 enqueue와 dequeue를 사용할 수 있다
    - `enqueue` - $O(1)$
    - `dequeue` - $O(1)$
- Circular queue를 만들 수 있다.

## Stack

코테는 단독으로 나오기도 하고, 다른 자료 구조나 알고리즘을 구현하기 위해 사용된다.

일반적으로 Array list로 구현한다. LIFO 특성을 활용한 문제, DFS에 사용한다.

**구현 방법**

- Array list based
    - `push` - $O(1)$
    - `pop` - $O(1)$
- Lined list based
    - `push` - $O(1)$
    - `pop` - $O(1)$

## 문제 풀이

### [Design Browser History](https://leetcode.com/problems/design-browser-history/) - Linked List

- 문제
    
    인터넷 브라우저에서 방문 기록과 동일한 작동을 하는 BrowserHistory class를 구현할 것이다. 구현할 브라우저는 homepage에서 시작하고, 이후에는 다른 url에 방문할 수 있다. 또, “뒤로가기”와 “앞으로 가기”가 작동하도록 구현하라.
    
    - `BrowerHistory(string homepage)`를 호출하면 브라우저는 homepage에서 시작 된다
    - `void visit(string url)`를 호출하면 현재 page의 앞에 있는 페이지기록은 다 삭제가 되고 url로 방문을 한다
    - `string back(int steps)`를 호출하면 steps수 만큼 “뒤로가기”를 한다. “뒤로 가기”를 할 수 있는 page 개수가 x이고 `step > x`라면 x번 만큼만 “뒤로가기”를 한다. “뒤로가기”가 완료되면 현재 url을 retern한다
    - `string forward(int steps)`를 호출하면 steps수 만큼 “앞으로 가기”를 한다. “앞으로 가기”를 할 수 있는 page 개수가 x이고 `step > x`라면 x번 만큼만 “앞으로 가기”를 한다. “앞으로 가기”가 완료되면 현재 url을 retern한다.
    
    제약 조건
    
    - `1 <= homepage.length <= 20`
    - `1 <= url.length <= 20`
    - `1 <= step <= 100`
    - homepage와 url은 '.'를 포함한 loercase 영어 문자로 구성되어있다
    - visit, back, forward는 최대 5000번의 호출이 있을 수 있다.

**접근 방법**

앞, 뒤로만 이동하기 때문에 순서가 중요한 선형 자료구조를 사용한다.

- 삽입에 더 효율적인 linked list를 사용하고, 앞뒤로 이동이 가능해야하기 때문에 double linked list를 사용한다.
- step이 100 이하이고, visit, back, forward는 최대 5000번의 호출이 있기 때문에 `100 * 4900 = 49000`이 worst case이다.
- worst case가 매우 작기 때문에 효과적인 접근 방법이다.

**코드 작성**

```python
class ListNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

class BrowserHistory:
    def __init__(self, homepage: str):
        self.head = self.current = ListNode(val=homepage)

    def visit(self, url: str) -> None:
        new_node = ListNode(val=url, prev=self.current)
        self.current.next = new_node
        self.current = new_node

    def back(self, steps: int) -> str:
        while steps > 0 and self.current.prev:
            self.current = self.current.prev
            steps -= 1
        return self.current.val

    def forward(self, steps: int) -> str:
        while steps > 0 and self.current.next:
            self.current = self.current.next
            steps -= 1
        return self.current.val
```

**배우게 된 점**

Linked List를 생각하면서 코드를 작성했다. 확실히 강의를 보고 풀이하니 쉬웠는데, 다음부터는 먼저 풀고 해설 강의를 볼 예정이다.

### **[Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) - stack**

> 괄호 유효성 문제 유형을 만나면 stack으로 풀자
> 

**접근 방법**

제약 조건 `1 <= s.length <= $10^4$`이기 때문에 $n^2$으로 풀진 못한다. 리스트가 input으로 주어졌을 때, $O(n)$보다 더 효율적으로 풀지 못한다. 즉, $nlogn$ 혹은 $n$이 최적의 해

괄호가 유효하려면 열고 닫는 것이 짝이 맞아야한다. 즉 짝수이어야함. 또한 여는 괄호가 먼저와야한다.

여는 괄호가 나올 때는 +1, 닫는 괄호가 나올 때는 -1을 해준다. 그러나 중간에 -1이 될 경우가 생기면, 여는 괄호보다 닫는 괄호가 먼저 나왔기 때문에 invalid하다는 것을 알 수 있다.

소,중,대괄호로 3가지 유형이기 때문에 유형별로 분류를 해야한다. 

- `([)]`이런 형태는 유효하지 않다. 따라서 순서도 매우 중요하다. 가장 최근에 열린 괄호가 닫히기 전에, 그 전 괄호가 닫히면 유효하지 않다. → LIFO의 특성 활용

**코드 작성**

```python
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        parentheses = {')': '(', '}': '{', ']': '['}
        
        for p in s :
            if p in parentheses:
                if not stack or stack.pop() != parentheses[p]:
                    return False
            else:
                stack.append(p)
        
        return not stack
```

******************************배우게 된 점******************************

- 괄호 유효성 문제는 stack을 활용하는 것임을 기억하자
- LIFO 성질이 있다면 stack을 활용할 것. LIFO의 성질은 선입후출도 있지만, 순서가 보장되어야할 경우에도 사용된다.
- 딕셔너리를 활용해서 짝을 찾는 것을 다른 풀이에서도 활용하면 좋을 것 같다.

### **[739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) - stack**

> 매일의 온도가 int형 배열인 temperatures가 주어진다. answer[i]는 i 번 째 날의 온도보다 더 따뜻해지기까지 며칠을 기다려야하는지 나타낸다. 만약 따뜻해지는 날이 없다면 answer[i] = 0이다.
> 

**접근 방법**

제약 조건 • `1 <= temperatures.length <= $10^5$`이기 때문에 $n^2$으로 풀진 못한다. 리스트가 input으로 주어졌을 때, $O(n)$보다 더 효율적으로 풀지 못한다. 즉, $nlogn$ 혹은 $n$이 최적의 해

특정 조건을 만족하는 숫자가 올 때 까지는 stack에 push, 특정 조건을 만족하는 숫자가 오면 만족하지 않을 때 까지 pop을 한다.

특정 조건 : stack의 top보다 큰 숫자

1. stack에 값이 있을 경우, 현재 온도가 stack의 top의 온도보다 높다면 pop한다.
    - 해당 온도의 answer[idx]에 기다린 날을 넣는다. (기다린 날은 idx - 이전 idx)
2. 만약 stack이 비어있거나, 현재 온도가 stack의 top 온도보다 낮다면 push 한다.

**코드 작성**

```python
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        answer = [0] * n
        stack = []  

        for i in range(n):
            while stack and temperatures[i] > temperatures[stack[-1]]:
                prev_idx = stack.pop()
                answer[prev_idx] = i - prev_idx

            stack.append(i)

        return answer
```

**배우게 된 점**

특정 조건을 만족하는 어떤 것이 올 때 까지 기다렸다가, 만족하면 반응하는 것은 대부분 LIFO 로직임을 깨달았다. 

강의를 보고 접근법을 떠올리며 enumerate를 사용하는 것을 생각했지만, 고민해보니 stack에 실제 값이 들어가지 않아도 된다는 것을 깨달았다. 따라서 index를 넣고, 값을 비교할 때 stack의 index를 활용하는 방식으로 풀이했다

<aside>
💡 즉, 특정 조건에서만 반응을 해야 한다면, LIFO 특성을 잘 살펴보자

</aside>