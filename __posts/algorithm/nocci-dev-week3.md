---
title: 노씨데브 코테 스터디 Week3
date: 2023-08-03
slug: 노씨데브-코테-스터디-Week3
tags: Algorithm, Dictionary, Hash Table
summary: Hash Table, Dictionary
category: 🧮Algorithm
---
## Hash Table

> 구현 방법은 크게 2가지이다.
> 
> - Array List 사용 (Open addressing)
>     - python의 dictionary는 array list로 만들어졌다.
> - ~~Array list +Linked list based (Seperate chaining)~~
> 
> 개념적으로만 알아두면 된다.
> 

효율적인 탐색(빠른 탐색)을 위한 자료구조로써 key-value쌍의 데이터를 입력받는다. hash function $h$에 key값을 입력으로 넣어 얻은 해시값 $h(k)$를 위치로 지정하여 key- value 데이터 쌍을 저장한다. 

- 시간 복잡도 : 저장, 삭제, 검색 모두 $O(1)$

**Direct-address Table (직접 주소화 테이블)**

 key값이 $k$인 데이터를 index $k$ 위치에 저장하는 방식이다.

- 문제점
    - 불필요한 공간 낭비
    - Key값으로 문자열이 올 수 없다.

이런 이유로, 직접 주소화 방법은 `(key, value)` 데이터 쌍을 저장하기 위한 방법으로 합리적이지 않다.ㄷ 따라서 대안으로 Hash table을 이용한다. 

- $h(k)$는 키 $k$의 해시값이다

모든 데이터에 key값은 무조건 존재해야 하며, 중복되는 key값이 있어서는 안된다.

 `(key, value)` 데이터를 저장할 수 있는 각각의 공간을 slot 또는 bucket이라고 한다.

**Collision**

서로 다른 key의 해시값이 똑같을 때를 말한다. 즉, 중복되는 key는 없지만 해시값은 중복될 수 있는데 이 때 collision이 발생.다다고한 다.서따라l clsiison이 최대한 적게 나도록 hash function을 잘 설계해야하고, 어쩔 수 없이 collision이 발생하는 경우 seperate chaining 또는 open addressing등의 방법을 사용하여 해결한다.

|  | Hash table | Linked list | Array |
| --- | --- | --- | --- |
| access | $O(1)$ | $O(n)$ | $O(1)$  |
| insert | $O(1)$ | $O(1)$ | $O(n)$  |
| append |  | $O(1)$ | $O(1)$ |
| delete | $O(1)$ | $O(1)$ | $O(n)$  |

## python의 Dictionary

- `**in` 연산자 - 시간복잡도**  $O(1)$
    
    `in`은 dictionary에서 `key`가 존재하는 지 확인해준다. 만약 key가 존재하면 `True`를 반환하고 존재하지 않으면 `False`를 반환한다.
    

> list도 `in` 연산자를 사용하여, value가 있는지 없는지 확인할 수 있지만, $O(n)$의 시간복잡도를 가진다.
> 

- dictionary.items()

`key`와 `value` 모두 접근할 때 사용한다.

```python
dic = {"one": 1, "two": 2, "three": 3}

for key, value in dic.items():
    print(key, value)

# one 1
# two 2
# three 3
```

- dictionary.keys() : dictionary의 `key`들을 접근할 때 사용
- dictionary.values() : dictionary의 `value`들을 접근할 때 사용
- dictionary.get(key) : `key`에 해당하는 `value`을 가져올 때 사용
    - 없는 값을 가져오면 None
    - 없는 값을 가져올 경우, default를 지정할 수도 있다.
        
        ```python
        print(dic.get("없는키", "default출력")) # default출력
        # dic에 삽입되는건 아님
        ```
        
        ```python
        if 3 not in a:
        	a[3] = 1
        else:
        	a[3] += 1
        
        # 같은 효과
        a[3] = 1 + a.get(3, 0)
        ```
        

dictionary를 정렬할 수 없다

- `sorted_dic = sorted(dic.items())`
    - list가 반환된다. 따라서 데이터의 순서가 중요할 때는 list를 사용하는 것이 바람직하다.

## 문제 풀이

### **[Two Sum](https://leetcode.com/problems/two-sum/)**

**접근 방법**

- 딕셔너리에 미리 저장 후 탐색
    ![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/dcf31fdc-cf50-4b02-9cf7-7087f3fd0301)

    
    1. 해시테이블에 키와 값을 바꿔서 저장한다.
    2. 타겟에서 첫 번째 수를 뺀 결과(second)로 키를 조회한다.
        - 만약 해시테이블에 second가 있고, 자기자신이 아니라면 첫번째 수와 두번째 수의 index를 반환한다.
- 딕셔너리에 저장하면서 탐색
    <img width="915" alt="Untitled 1" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/cecfb513-8541-4e02-9d09-02e38f22d168">

    
    1. nums를 순회한다.
    2. 타겟에서 첫 번째 수를 뺀 결과(second)로 딕셔너리를 조회한다.
        - 만약 없다면 딕셔너리에 추가한다. value를 키로, index를 값으로 한다 (탐색을 위해)
        - 만약 딕셔너리에 있다면 첫번째 수와 두번째 수의 index를 반환한다.

**코드 작성**

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        dic = {}
        for i, num in enumerate(nums):
            dic[num] = i
        
        for i, num in enumerate(nums):
            second = target-num
            if second in dic and dic[second] != i:
                return nums.index(num), dic[second]
```

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        dic = {}
        for idx, data in enumerate(nums):
            second = target - data 
            if second in dic : 
                    return [dic[second], idx]
            dic[data] = idx
```

**배우게 된 점**

지난 번에 접근했던 방법을 복기하며 접근했다.

예상처럼 dictionary에 모든 값을 미리 저장하고 순회하던, 저장하면서 탐색을 하던 시간, 공간복잡도는 비슷했다.

key에 찾고자하는 값을 넣는 것이 핵심인 것 같다. 즉, “key와 value라는 명칭에 얽메이지말고 필요한 상황에 따라 유동적이게 쓸줄 아는 것이 힘이다”라는 피드백을 받았다.

코드에서도 들어나지만 직관적인 논리와 연산의 횟수로는 아래의 코드(순회하며 해시테이블에 저장)가 더 깔끔하다. 

### **[Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)**

**접근 방법**

1. 앞에서부터 탐색한다.
    1. 탐색 시간 줄이기
        - 딕셔너리 key를 활용해서 $O(n)$가 걸리는 탐색 시간을 $O(1)$로 줄인다.
    2. 중복 탐색 제거
        - 시작 숫자일 경우에만 탐색을 한다. 시작 숫자란, 연속된 솟자의 시작점을 말하기 때문에, dictionary에 그보다 -1 작은 숫자는 없다는 조건을 활용한다.
2. 만약, 현재 값보다 +1 큰 숫자가 없을 때까지 cnt와 next_num 을 +1해준다.
3. 만약 현재 값보다 +1 만큼 큰 숫자가 없다면, while 문을 종료하고, longest를 갱신하다.
4. 탐색이 끝나면 longest를 반환한다.

**코드 작성**

```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        dic = {}
        for num in nums:
            dic[num] = num

        longest = 0

        for num in nums:
            cnt = 1
            if num-1 not in dic:
                next_num = num+ 1
                while next_num in dic:
                    cnt += 1
                    next_num += 1
                longest = max(longest, cnt)
        return longest
```

**배우게 된 점**
<img width="1297" alt="Untitled 2" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/8acf24cd-6324-4714-9079-9cac99341b07">

82%E1%85%A9%E1%84%8A%E1%85%B5%E1%84%83%E1%85%A6%E1%84%87%E1%85%B3%20%E1%84%8F%E1%85%A9%E1%84%90%E1%85%A6%20%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%83%E1%85%B5%20Week3%209d90574fb54f49ce932f79d1f0194fce/Untitled%202.png)

중복을 제거하면 왜 $O(n)$으로 시간 복잡도가 주는 지 알게되었다. 리스트의 길이가 n이라고 할 때, 최악의 경우에 딱 1번만 n번 탐색을 한다. 원래는 n*n번을 반복하겠지만, 최악의 경우를 생각하고 중복 탐색을 없앤다고 가정하면, n개를 탐색해야하는 경우 딱 1번이 나온다.

또한, 탐색때 딕셔너리의 키를 활용하면 $O(n)$이 걸리는 탐색 작업을 $O(1)$로 줄일 수 있으니 앞으로 많이 활용할 것!