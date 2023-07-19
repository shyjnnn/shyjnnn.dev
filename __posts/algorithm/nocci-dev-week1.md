---
title: 노씨데브 코테 스터디 Week1
date: 2023-07-20
slug: 노씨데브-코테-스터디-Week1
tags: Algorithm, List
summary: 제약 조건 보는법, 리스트, 접근 방법
type: Post
category: 🧮Algorithm
---

## 제약 조건 보는 법

시간 복잡도(Big-O)에 데이터의 크기(n)을 넣어서 나온 값이 **100,000,000($10^8$)**이 넘으면 시간 제한 초과 가능성이 있다.

## 리스트 (List)

- Array list (파이썬에서는 `list`)
    - Array
    - Dynamic array
- Linked list
    - Node

### (static) array

> **배열의 특성**
> 
> 
> 1. 고정된 저장 공간(fixed-size)
> 
> 2. 연속/순차적인 데이터 저장(order)
> 

선언 시에 size를 정해 해당 size만큼 연속된 할당 받아 data를 연속적/순차적으로 저장하는 자료구조

**Random access**

 메모리에 저장된 데이터에 접근하려면 주소값을 알아야한다. 배열변수는 자신이 할당받은 메모리의 첫 번째 주소값을 가리킨다. 배열은 연속적/순차적으로 저장되어 있기 때문에 첫 주소값만 알고 있다면 어떤 index에도 즉시 접근이 가능하다. 이것이 바로 direct access 또는 **random access**이다.

따라서 아무리 긴 배열이더라도 한번의 연산으로 원하는 데이터에 바로 접근할 수 있따. 즉 O(1)의 시간복잡도를 갖는다.

**한계**

데이터 개수가 정해져있는 경우 static array를 사용하는 것이 매우 효율적이다. 하지만 선언 시 정한 size보다 더 많은 데이터를 저장해야하는 경우 문제가 생기고, 만약 더 적은 데이터를 저장할 경우 메모리 비효율이 발생한다.

→ 이를 해결한 것이 dynamic array

### Dynamic array 동적 배열

> (static) array로 만들어졌다.
> 

**resize 과정**

선언 시 정한 size보다 더 많은 데이터를 저장해야할 경우, 기존의 배열보다 더 큰 배열을 새로 선언하고 그곳으로 모든 데이터를 옮긴다. 이후 기존의 배열을 메모리에서 삭제한다. 일반적으로 2배 큰 크기로 resize한다(Doubling)

|  | Static array | Dynamic array |
| --- | --- | --- |
| 선언 및 초기화 | $O(n)$ | $O(n)$ |
| access /  update | $O(1)$ | $O(1)$ |
| insert_back | $O(1)$ | amortized $O(1)$ |
| delete_back | $O(1)$ | $O(1)$ |
| insert_at | $O(n)$ | $O(n)$ |
| delete_at | $O(n)$ | $O(n)$ |

## 접근 방법

- 직관적으로 생각하기
    - 보통 완전 탐색으로 시작
    - 문제 상황을 단순화 하여 생각하기
    - 문제 상황을 극한화 하여 생각하기
- 자료구조와 알고리즘 활용
    - 문제에서 파악한 내용을 토대로 어떤 자료구조를 사용하는 게 가장 적합한지 결정
    - 대놓고 특정 자료구조와 알고리즘을 묻는 문제도 많음
    - 자료 구조에 따라 선택할 수 있는 알고리즘을 문제에 적용
- 메모리 사용
    - 시간 복잡도를 줄이기 위해 메모리를 사용하는 방법
    - 대표적으로 해시테이블

### 파이썬의 정렬(`sort`)는  $O(nlogn)$  시간 복잡도를 가진다.

알고리즘에 다양한 데이터 정렬기법이 있다. 그러나 실제 코테에서는 파이썬을 사용한다면 대부분 `sort` 메소드를 쓴다. 따라서 $O(nlogn)$이라는 것만 기억하면 된다.

**정렬 종류**

1. 버블 정렬 (Bubble Sort):
    - 인접한 두 원소를 비교하여 필요에 따라 교환하는 방식으로 정렬.
    - 시간복잡도: $O(n^2)$
    - 비효율적인 알고리즘으로 대부분의 경우에 권장되지 않음.
2. 선택 정렬 (Selection Sort):
    - 주어진 리스트에서 최솟값(또는 최댓값)을 찾아 맨 앞 원소와 교환하는 방식으로 정렬.
    - 시간복잡도: $O(n^2)$
    - 비효율적이며 주로 학습용으로 사용됨.
3. 삽입 정렬 (Insertion Sort):
    - 정렬되어 있는 부분 리스트를 유지하면서 새로운 원소를 올바른 위치에 삽입하여 정렬.
    - 시간복잡도 :
        - 최선의 경우- $O(n)$
        - 평균 및 최악의 경우- $O(n^2)$
    - 작은 리스트나 이미 정렬된 데이터에 대해서는 효율적.
4. 병합 정렬 (Merge Sort):
    - 분할 정복(divide and conquer) 방법을 사용하여 리스트를 반으로 나눈 뒤 각 부분 리스트를 정렬하고 병합하여 정렬.
    - 시간복잡도: $O(n log n)$
    - 안정적이고 대부분의 상황에서 효율적인 알고리즘.
5. 퀵 정렬 (Quick Sort):
    - 분할 정복 방법을 사용하며, 기준 원소(pivot)를 선택하여 작은 원소들과 큰 원소들을 분할하고 각 부분 리스트를 정렬.
    - 시간복잡도
        - 최선 및 평균의 경우 - $O(n log n)$
        - 최악의 경우 - $O(n^2)$
    - 평균적으로 매우 빠른 속도를 가지지만 최악의 경우에는 성능이 저하될 수 있음.
6. 힙 정렬 (Heap Sort):
    - 힙 자료구조를 이용하여 정렬하는 방식으로, 힙을 구성하고 최대(또는 최소)값을 차례대로 추출하여 정렬.
    - 시간복잡도: $O(n log n)$
    - 평균적으로 빠르며 대량의 데이터에도 효율적인 알고리즘.
7. 기수 정렬 (Radix Sort):
    - 숫자의 자릿수를 기준으로 정렬하는 방식으로, 가장 낮은 자릿수부터 가장 높은 자릿수까지 정렬을 반복.
    - 시간복잡도
        - $O(d * (n + k)$) 또는 $O((n+k) * log(k))$ (d는 자릿수, k는 진법)
    - 특정한 자료형에 최적화되어 효율적인 알고리즘.
8. 계수 정렬 (Counting Sort):
    - 정수나 문자열과 같이 특정한 범위의 값들에 대해서만 정렬하는 방식으로, 각 값의 개수를 세어 정렬.
    - 시간복잡도: $O(n + k)$ (k는 입력 값의 범위)
    - 데이터 크기가 제한된 경우에 매우 빠른 속도를 가지며, 특정 조건에서 매우 효율적인 알고리즘.

## 문제 풀이

### [Two Sum](https://leetcode.com/problems/two-sum/)

**접근 방법**

nums의 요소 중 2가지를 더해 target과 같은 값이 될 때, 두 요소의 인덱스를 리턴하면 된다. 정답은 오직 한개이기 때문에 즉시 리턴을 고려하면 된다.

**Broute Force - $O(n^2)$**
![Untitled](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/f3c90888-e154-4592-8f69-5a2829609908)


1. 이중 for문으로 배열 전체를 순회한다.
2. 만약 두 수의 합과 target 값이 같으면 리턴한다.

**딕셔너리 (해시 테이블) 사용  - $O(n)$**
![Untitled 1](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/f29166ec-3f6f-43ca-8427-7fe9682633e1)


1. 반복문을 돌면서 현재 요소와 target을 뺀다.(result)
2. 만약 result가 딕셔너리에 있면 해당 값과 현재 인덱스를 즉시 반환한다.
3. 만약 result가 딕셔너리에 없다면, 현재 data와 idx를 딕셔너리에 저장한다.

**포인터 사용 -** $O(n log n)$

1. (인덱스, 값) 쌍으로 이루어진 arr 생성 및 값에 따라 오름차순으로 정렬.
2. arr의 의 가장 작은 값과 가장 큰 값에 대한 포인터 i와 j를 설정한다
3. i와 j의 값을 더해 result에 저장한다.
4. i가 j보다 작을 동안 while문 반복
    1. 합이 target과 같으면, 두 수의 인덱스를 반환
    2. 합이 target보다 작으면, i++
    3. 합이 target보다 크면, j-1
    

**코드**

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            for j in range(i+1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i,j]
```

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        dic = {}
        for idx, data in enumerate(nums):
            result = target - data 
            if result in dic : 
                    return [dic[result], idx]
            dic[data] = idx
```

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        arr = [(i, num) for i, num in enumerate(nums)]
        
        arr.sort(key=lambda x: x[1])
        
        i, j = 0, len(arr) - 1
        
        while i < j:
            result = arr[i][1] + arr[j][1]
            
            if result == target:
                return [arr[i][0], arr[j][0]]
            elif result < target:
                i += 1
            else:
                j -= 1
```

**배우게 된 점**

예전에 풀어본 문제라 기억을 더듬으며 풀이했다. 처음엔 우선 Broute Force로 접근했는데, 역시나 이중 for문을 사용하게 되었더니 ~~메모리와~~ 런타임이 좋지 않게 나왔다.  $O(n^2)$ 

- 메모리와 관련해서는 해시테이블을 사용하는 것이 더 좋지 않다. 해시테이블을 사용하게 되면 키와 데이터를 저장할 공간이 필요해지기 때문에 이중 for문보다 메모리를 더 많이 사용하게 된다. 따라서 메모리 측면에선 이중for문에 우세하다.

따라서 이중 for문을 없애는 게 가장 중요하다고 생각해 재풀이했다. 탐색 시 값을 저장할 곳을 배열로 했더니 어차피 값을 찾기 위해서(`value in arr`)는 사실상 시간복잡도는 이중 for문과 유사하게 나왔다. 따라서 키로 값을 바로 찾을 수 있는 해시테이블을 사용했다. $O(n)$

- 배열을 사용해 값을 저장하고, 순회를 통해 값을 찾는 것이 아닌, 배열의 크기를 늘려 배열 인덱스를 통해(키처럼 사용) 값을 접근하면 더 개선할 수 있다. 하지만 배열의 크기가 n만큼 커져 공간복잡도가 매우 비효율적이다. 따라서 이 인덱스 크기를 압축해 사용하는 방식이 해시테이블의 원리이다.

다른 사람들이 시간 복잡도를 보다가 해시테이블보다는 점수가 낮지만 투 포인터를 사용하는 풀이법을 보게 되어서 접근해봤다. 그 사람의 풀이와 강의에서 나온 방식을 더듬으면서 코드를 작성했지만, 확실히 정렬을 해야하기 때문에 더 느릴 것($O(n log n)$)으로 예상된다.