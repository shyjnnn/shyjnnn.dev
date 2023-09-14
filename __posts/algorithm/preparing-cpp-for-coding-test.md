---
title: C++로 코딩테스트 준비하기
date: 2023-09-15
slug: Cpp로-코딩테스트-준비하기
tags: Algorithm, C++
summary: C++ 문법 정리
category: 🧮Algorithm
---

## 입출력

```cpp
#inlcude <stdio.h> // <cstdio>
#include <iostream>
using namespace std;
scanf();
printf();
cin >> temp;
cout << "Hello" << temp << endl;
```

---

# 코테 시작 코드

```cpp
#include <bits/stdc++.h> //C++의 표준 라이브러리 헤더 파일들을 모두 포함하는 방법
using namespace std;

int main(int argc, char* argv[]) {

}
```

# Pair

두 가지 자료형을 하나의 쌍으로 묶을 수 있다.

```cpp
#inlcude <vector> // <algorithms>

// pair 선언
pair<int, char> p;

// pair 접근
scanf("%d %c", &p.first, &p.second);

// pair 만들기 함수
p = make_pair(3, 'b');
```

# Vector

크기가 가변적인 배열이다.

- `front()` : 첫 번째 원소
- `back()` : 마지막 원소
- `begin()` : 첫 번째 위치
- `end()` : 마지막 위치
- `push_back()` : 마지막에 데이터 추가
- `pop_back()` : 마지막에 데이터 제거
- `size()` : 원소의 개수
- `erase()` : erase(v.begin()) ⇒ 첫 번째 원소 제거
- `clear()` : 비우기
- `reverse(v.begin(), v.end())` ⇒ string도 reverse가 됨
    
    ```cpp
    vector<int> v = { 1, 1, 1 }; // 3개 원소를 1로 초기화
    fill(v.begin(),v.end(),-1); // 3개 원소를 -1로 초기화
    
    sort(v.begin(), v.end()); // 정렬
    vector<int> slice(array.begin() + start - 1, array.begin() + end);
    int big = *max_element(v.begin(),v.end()); // 가장 큰 원소의 값 저장
    ```
    
- **vector를 2차원배열처럼.**
    
    ```arduino
    #inlcude <vector>
    
    int main(int argec, char *argv[]) {
    		vector<vector<int>> v;
    		vector<int> tv;
    		for (int i = 0; i < n; i++) {
    			for (int j = 0; j < 3; j++) {
    				int temp;
    				scanf("%d", &temp);
    				tv.push_back(temp);
    			}
    			v.push_back(tv);
    			tv.clear();
    		}
    }
    ```
    
- **정적 vector 선언 및 0초기화**
    
    ```cpp
    vector<int> v(n);// n개 길이의 벡터 선언, 자동으로 0으로 채워짐
    vector<vector<int>> v2(vector<int>(n, 0));// 2차원벡터 0 초기화
    ```
    

# Queue

큐 자료구조

- `push()` : 데이터 추가
- `pop()` : 처음의 데이터 뽑기
- `front()` : 첫 번째 원소
- `back()` : 마지막 원소
- `size()` : 큐의 크기
- `empty()` : 큐가 비었는지 확인
- **pair를 원소로 가지는 queue의 접근**
    
    ```cpp
    #inlcude <queue>
    
    int main(int argec, char *argv[]) {
    		queue<pair<int,int>> q;
    		q.push(make_pair(0,0));
    	
    		int x = q.front().first;
    		int y = q.front().second;
    		q.pop();
    }
    ```
    

# Stack

스택 자료구조

- `push()` : top에 데이터 추가
- `pop()` : top의 데이터 뽑기
- `top()` : top의 원소
- `size()` : 스택의 크기
- `empty()` : 스택이 비었는지 확인

# Set

key라고 불리는 원소들의 집합 **중복이 허용되지 않음**

- `insert()` : 원소 삽입
- `begin()` : 첫 번째 원소를 가르키는 iterator를 반환
- `end()` : 마지막 원소를 가리키는 iterator를 반환
- `find(k)` : 원소 k를 가리키는 iterator를 반환
- `size()` : set의 원소 수
- `empty()` : 비었는지 확인

# Map

<key, value> 쌍으로 저장하는 자료구조, **중복이 허용되지 않으며** **자동으로 오름차순 정렬**

**map <key, value> map1;**

- `insert(make_pair(k,v))` : 원소 삽입
- `erase(k)` : key값 k를 갖는 원소를 삭제
- `begin()` : 첫 번째 원소를 가리키는 iterator를 반환
- `end()` : 마지막 원소를 가리키는 iterator를 반환
- `find("1")` : map의 원소 수
- `empty()` : 비었는지 확인

## Sort

- `sort(first, last)` : **오름차순** 정렬

```arduino
int arr[10] = {9, 3, 5, 4, 1, 10, 8, 6, 7, 2};
vector<int> v // ...값 넣기

sort(v.begin(), v.end())
// sort() 함수에 정렬할 배열의 범위를 지정
sort(arr, arr + 10);

```

- `sort(first, last, compare)` : **내림차순** 정렬

```cpp
#include<iostream>#include<algorithm>using namespace std;

/* 두 수인 a와 b가 있을 때 a가 더 클 경우 true를 반환하는 함수 */
bool compare(int a, int b){
		return a > b;
}

int main(){
		int arr[10] = {9, 3, 5, 4, 1, 10, 8, 6, 7, 2};

		// sort() 함수에 정렬 기준을 담은 함수 추가
		sort(arr, arr + 10, compare);
	
		for(int i = 0 ; i < 10 ; i++){
			cout<<arr[i]<<' ';
		}
}

```

- **Map을 value값으로 정렬하기**
    1. map을 vector로 이동
    2. vector를 second 기준으로 정렬
    
    ```arduino
    #include<iostream>
    #include<algorithm>
    #include<map>
    #include<vector>
    using namespace std;
    
    bool compare(int a, int b){
    		if (a.second == b.second) return a.first < b.first;
    		return a.second < b.second;
    }
    
    int main(){
    		map<int, int> m;
    		... // m 세팅
    		for (auto num : m) {
    			cout << "key: " << num.first << " | value: " << num.second << "\\n";
    		}
    		vector<pp> vec( m.begin(), m.end() );
    		sort(vec.begin(), vec.end(), compare); // vector<pair<int,int>> vec( m.begin(), m.end() );
    		for (auto num : vec) {
    			cout << "key: "<< num.first << " | value: " << num.second << "\\n";
    		}
    }
    ```
    

## String

```arduino
string s;

s.append(s2); // 붙이기
s.size(); // 길이
s.length(); // 길이
s.empty(); // empty 여부
s.replace(n, k, str2) // n번째 index부터 k개의 문자를 str2로 대체함
s.clear(); // 저장된 문자열을 모두 지움
s.erase(n, m) // n번째 index부터 m개의 문자를 지움
s.find("abcd") // "abcd"가 str에 포함되어있는지를 확인. 찾으면 그 첫번째 index를 반환

sort(s.begin(),s.end()); // 정렬

//공백을 기준으로 split
stringstream ss(input); // 문자열을 스트림화
string first, second, third; // 스트림을 통해, 문자열을 공백 분리해 변수에 할당
```

## Array

```cpp
int a[3] = { 1, 1, 1 }; // 3개 원소를 1로 초기화
fill_n(a, 3, -1); // 3개 원소를 -1로 초기화
sizeof(a); // 길이
sort(a, a+10); // 정렬
```

## 기타 함수

- `int isdigit(char c)` : 0이면 숫자 아님