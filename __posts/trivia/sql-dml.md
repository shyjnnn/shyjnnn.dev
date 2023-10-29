---
date: 2023년 10월 3일
slug: SQL-DML-정리
tags: SQL
summary: sql 총정리
type: Post
category: 🙏잡학사전
title: SQL DML 정리
---

# 기본

## `SELECT` - 데이터 조회

테이블에서 하나 이상의 레코드를 검색한다.

```sql
SELECT column1, column2
FROM table_name;
```

`LIMIT`로 출력 개수 제한이 가능하다

```sql
SELECT * FROM table_name
	LIMIT 3;    		-- 상위 3건만 조회

SELECT * FROM table_name
	LIMIT 3, 2; 		-- 시작 위치(0부터 시작), 개수
	LIMIT 2 OFFSET 3; 	-- 위와 동일, 3번때 데이터부터 2건만 조회
```

`DISTINCT`로 중복 데이터를 제거할 수 있다.

```sql
SELECT DISTINCT addr
	FROM table_name;
```

## `WHERE` - 조건 지정

특정 기준에 따라 레코드를 필터링 할 수 있다.

```sql
SELECT column1, column2
FROM table_name
WHERE condition; -- ex) column1 >= 5L
```

## `INSERT INT` - 새로운 레코드 추가

테이블에 새로운 레코드를 삽입한다.

```sql
INSERT INTO table_name (column1, column2)
VALUES (value1, value2);
```

모든 컬럼에 값을 추가하려면 컬럼 이름을 생략할 수 있다.

```sql
INSERT INTO table_name
VALUES (value1, value2,...);
```

## `UPDATE` - 기존 레코드 수정

테이블의 기존 레코드를 수정함.

```sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
```

**주의할 점**

- `WHERE`절 없이 `UPDATE`문을 실행하면 모든 레코드가 변경된다.

## `DELETE FROM` - 기록 삭제

DELETE FROM 문을 사용하여 하나 이상의 레코드를 삭제한다.

```sql
DELETE FROM table_name WHERE condition;
```

마찬가지로 WHERE절 없이 DELETE문을 실행하면 모든 레코드가 삭제된다.

# 심화

## `JOIN` - 테이블 결합

두 개 이상의 테이블을 연결할 수 있다.

- `(INNER) JOIN` 일반 조인 (= JOIN)
  > 조인 조건문에 따라 2개의 테이블의 컬럼을 합쳐 (공통 컬럼을 기반으로) 새로운 테이블을 생성한다.
  - 결합 조건이 되는 컬럼을 `WHERE`절에 지정하거나
    ```sql
    SELECT column_name(s)
    	FROM table1, table2
    	WHERE table1.column_name = table2.column_name; -- 조인조건 AND 검색조건 순으로 작성
    ```
  - `FROM`절에 테이블 나열 시 `JOIN`을 넣어주고, `ON`으로 결합 조건이 되는 컬럼을 지정한다.
    ```sql
    SELECT column_name(s)
    	FROM table1
    	JOIN table2
    	ON table1.column_name = table2.column_name;
    ```
- `OUTER JOIN` 외부 조인
  > 조건문에 만족하지 않는 행도 표시한다. 한쪽 테이블에 데이터가 없어도 기준이 되는 테이블에 데이터가 있다면 조인 결과에 포함시킨다. (NULL이 들어간다)
  - `LEFT (OUTER) JOIN` - 왼쪽 테이블이 기준이라면,
    ```sql
    SELECT column_name(s)
    	FROM table1 -- 왼쪽
    	LEFT JOIN table2 -- 오른쪽
    	ON table1.column_name = table2.column_name;
    ```
  - `RIGHT (OUTER) JOIN` - 오른쪽 테이블이 기준이라면
    ```sql
    SELECT column_name(s)
    	FROM table1 -- 왼쪽
    	RIGHT JOIN 	table2 -- 오른쪽
    	ON	table1.column_name	=	table2.column_name;
    ```
- `FULL OUTER_JOIN` - 양쪽다 기준이 됨, 즉 LEFT JOIN과 RIGHT JOIN의 합집합
  ```sql
  SELECT column_name(s)
  	FROM 	table1
  	FULL  JOIN  table2
  	ON	table1.column_name	=table2.column_name;
  ```

## `GROUP BY` - 그룹화

결과 집합에서 하나 이상의 열로 데이터를 그룹화 할 수 있다.

각 그룹에 대한 집계 함수(AVG, COUNT, MAX, MIN, SUM 등)를 적용할 수 있다.

```sql
SELECT column1, AVG(column2) AS "평균"
	FROM table_grouped_by_column3,
	GROUP BY column3;
```

### 집계 함수 (Aggregate Function)

- `SUM()` : 컬럼의 합계를 반환
- `AVG()` : 컬럼의 평균을 반환
- `MIN()` : 컬럼의 최소값을 반환
- `MAX()` : 컬럼의 최대값을 반환
- `COUNT()` : 행의 개수를 셈
- `COUNT(DISTINCT)` : 행의 개수를 셈

### `HAVING` - 그룹 조건

그룹화된 데이터에 대해서 조건을 제한한다.

- `GROUP BY` 뒤에 와야한다.

```sql
SELECT SUM(amount*price) AS "총 금액"
	FROM buy
    GROUP BY mem_id
    HAVING SUM(amount*price) >= 1000;
```

## `ORDER BY` - 정렬

결과 집합을 한 개 이상의 열로 정렬할 수 있다.

```sql
# 오름차순
SELECT * FROM Table_Name ORDER BY Column_Name1, Column_Name2 ... ASC;
# 내림차순
SELECT * FROM Table_Name ORDER BY Column_Name DESC;

# 순차적으로 TOTAL_ORDER을 기준으로 내림차순 후, TOTAL_ORDER 값이 같다면 SHIPMENT_ID을 기준으로 오름차순
SELECT * FROM FIRST_HALF
    ORDER BY TOTAL_ORDER DESC, SHIPMENT_ID ASC;
```

## `UNION` - 합치기

조회한 다수의 `SELECT`문을 하나로 합치고 싶을 때 사용한다.

```sql
SELECT ID, NAME FROM TABLE1 ;
 UNION -- [DISTICT] 생략, 혹은 UNION ALL
 SELECT ID, NAME FROM TABLE2 ;
```

- `UNION (DISTINCT)`: 중복되는 레코드를 제거한다
- `UNION ALL` : 중복을 허용한다. 단순 합집합

## `WITH` - SubQuery 사용

> 이름을 가진 SubQuery를 정의한 후 사용하는 구문

```sql
WITH [ 별명1 ] [ (컬럼명1 [,컬럼명2]) ] AS (
    SUB QUERY
)[, 별명2 AS ... ]
MAIN QUERY
```

# MySQL

## `IS NULL`

WHERE과 주로? 같이 쓰이며 NULL값을 찾는다.

```sql
SELECT ANIMAL_ID
FROM ANIMAL_INS
WHERE NAME IS NULL
```

NULL 이 아닌것을 찾으려면 IS NOT NULL 과 같이 사용하면 될 것이다.

## `IFNULL`

NULL 인 것을 찾아서 치환한다.

```sql
SELECT IFNULL(NAME,'ABC')
```

NAME 열에서 NULL이 있다면 그곳을 'ABC' 로 채워넣는다.

## `IN`

포함되는 것 찾기

```sql
WHERE NAME IN('A','B','C')
```

NAME 열에서 A거나 B거나 C인 것을 찾기

## `LIKE`

문자열이 특정 패턴을 포함하는지 확인한다.

```sql
WHERE NAME LIKE '%AB%'
```

## `IF`

조건을 넣어 칼럼의 값을 바꾸는 방법

```sql
SELECT ANIMAL_ID, IF(NAME LIKE '%AB%', 'X', 'O')
```

NAME 열에서 AB가 포함되어있는 인자가 있다면 X로 치환, 없다면 O로 치환

## `DATE`

문자 -> 날짜

```sql
#DATETIME = '2020-01-01'
DATE(DATETIME)
```

### 날짜 추출

YEAR, MONTH, DAY, HOUR, MINUTE, SECOND

```sql
SELECT HOUR(DATETIME)
```

DATETIME에서 HOUR를 추출해 낸다.

BETWEEN과 응용한다면

```sql
SELECT HOUR(DATETIME)
HAVING HOUR BETWEEN 0 AND 19
```

HOUR를 추출해내고 그를 0~19 사이의 값만 추출해 낸다.

### `DATE_FORMAT`

원하는 날짜 출력 포맷을 지정해준다.

```sql
#DATETIME = '2023-01-01'
SELECT NAME, DATE_FORMAT(DATETIME, "%Y-%m")
```

위 코드의 출력은 포맷을 m까지 줬기 때문에 2023-01 까지가 될 것이다. `%Y-%m-%d` 로 나타낸다.
