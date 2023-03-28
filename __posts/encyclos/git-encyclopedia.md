---
title: Git 백과사전
date: 2023-03-29
slug: Git-백과사전
tags: Git
category: 🏫백과사전
---

코드 버전 관리 프로그램

- 리누스 토발즈의 git 이름에 대한 [코멘트](https://github.com/git/git/commit/e83c5163316f89bfbde7d9ab23ca2e25604af290) ~~개발자식 유우우머ㅋㅋ😃~~
- repository : 커밋이 저장되는 공간
- [git add가 필요한 이유](https://steady-coding.tistory.com/277)
  - staging area가 필요한 이유와 같다. 원하는 기능만 add해서 그것들만 따로 commit하게 하기 위해서이다.
    - `git add .` 를 적게되면 변동된 모든 사항이 staging area에 추가된다.

### Git의 3가지 작업 영역

1. working directory
   - 작업을 하는 프로젝트 디렉토리
2. staging area
   - git add를 한 파일들이 존재하는 영역
   - 커밋을 하게 되면 staging area에 있는 파일들만 커밋에 반영된다.
3. repository
   - working directory의 변경 이력들이 저장되어 있는 영역

### Git이 보는 파일의 4가지 상태

![https://velog.velcdn.com/images/shinyejin0212/post/ead4aa71-5fb0-47b6-8840-6b03cb99cd0d/image.png](https://velog.velcdn.com/images/shinyejin0212/post/ead4aa71-5fb0-47b6-8840-6b03cb99cd0d/image.png)

1. **Untracked 상태** - git add를 하지 않음
2. **Tracked 상태**
   - Staged 상태
   - Unmodified 상태
   - Modified 상태

### 모르거나 헷갈렸던 Git 명령어s

확실히 알고 있어 빠진 게 더 많다.

1. `git init` : 현재 디렉토리를 working directory로 설정하고 그 안에 레포지토리(.git 디렉토리) 생성
2. `git confit [user.name](<http://user.name>) or [user.email](<http://user.email>)` 커밋할때 필요한 정보 주
3. `git status` : git의 상태 확인
4. `git help [알고싶은 커맨드 이름]` : git 공식 매뉴얼 볼수 있다.

   = `man git-[알고싶은 커맨드]`

5. `git push-u branch이름`
   - 앞으로 현재 브랜치를 자동으로 origin이라는 원격 저장소의 main 브랜치로 연결해 간단히 `git push`만 입력해 반영하거나 `git pull` 을 입력할 때 origin이라는 원격저장소의 main 브랜치를 로컬 저장소의 main 브랜치로 merge 할수 있게 해주겠다는 의미
   - = `-set-upstream`
   - 즉, 로컬 레포지토리에 있는 [branch이름] 브랜치가 origin에 있는 [branch이름] 브랜를 tracking 하는 걸로 설정된다.

### Commit 다루기

- commit은 프로젝트 디렉토리의 특정 모습을 하나의 버전으로 남기는 행위와 그 결과물이다.
  - `git config` 깃에게 commit한 사람 알려주기. 최초 1회
- `git log`
  - `-pretty oneline` 깔끔하게 보여주는 설정으로 한줄씩 보여줘
  - `-all` 다른 브랜치의 log까지 한번에 보여줘
  - `graph` 브랜치 별로 구분해서 깔끔하게 보여
- `git show 커밋ID` : 구체적으로 해당 커밋에서 어떤 파일이 어떻게 바뀌었는지 (어떤 변화가 있었는지) 볼 수 있다.
- `git commit --amend` 최신 커밋을 수정해서 다시 새로운 커밋으로 만들
- `git diff 이전커밋ID 나중커밋ID` 두 커밋 비교하기
  - branch간 차이 보여주기 `git diff shyjnnn origin/shyjnnn`
- `git tag [태그이름] [커밋ID]` 커밋에 tag달기
  - 보통 프로젝트에서 주요 버전의 시작점이 되는 커밋에 태그를 단다
  - ex) Version_1 ..등
  - `git tag` 로 전체 tag 목록 볼 수 있다.

**커밋의 구성요소**

1. 커밋을 한 사용자 ID
2. 커밋을 한 날짜, 시간
3. 커밋 메시지

### **HEAD**

- 보통 가장 최근에 한 커밋을 가리킴. 매번 더 새로운 커밋을 가리킴
- 어떤 커밋 하나를 가리킴. HEAD가 가리키는 커밋에 따라 working directory가 구성된다.
- 사실은 branch를 거쳐서 commit을 가리킴
  - `git checkout 커밋ID`로 HEAD가 직접 커밋을 가리키게 할 수 있다.
  - 브랜치를 통하지 않고, 커밋을 직접적으로 가리키는 HEAD를 Detached HEAD라고 한다

### `git reset --옵션 커밋ID`

- HEAD가 과거 커밋을 가르키게 한.
  - 과거의 커밋으로 git reset을 한다고 그 이후의 커밋들이 **삭제되는 게 절대 아니다**!!!!
  - 과거의 커밋뿐만 아니라 현재 HEAD가 가리키는 커밋 이후의 커밋으로도 할 수 있다.
    ![https://velog.velcdn.com/images/shinyejin0212/post/be7b1c9d-776c-4095-b1be-edbf73d1d28e/image.png](https://velog.velcdn.com/images/shinyejin0212/post/be7b1c9d-776c-4095-b1be-edbf73d1d28e/image.png)
- `-soft` : HEAD가 과거의 특정 커밋을 가리킴
- `-mixed` : HEAD가 해당 커밋을 가리키고 stagint area를 과거의 특정 커밋의 내용과 똑같게 한다.
- `-hard` : HEAD가 과거의 특정 커밋을 가리키도록 하고, staging area를 과거의 특정 커밋의 내용과 똑같게 하고, working directory의 내부도 그 과거 커밋의 내용과 똑같게 만든다.
- 커밋 ID가 아닌 상태 표현법
  - `HEAD^`: 현재 HEAD가 가리키고 있는 커밋의 바로 이전 커밋을 나타낸다.
  - 바로 이전보다 좀 더 전에 있는 커밋을 나타내고 싶다면 `HEAD~숫자`
    - ex) `HEAD~4` 현재 가리키고 있는 HEAD에서 4단 떨어진 이전 커밋

**돌아오기 위해선?**

- 그 ID로 다시 reset 하면 됨 ㅎㅎ
- `git reflog` - 헤드가 이때까지 가리켜온 커밋들의 목록을 알려

### 긴 커맨드 aliasing 하기 - git config 사용

`git config alias.history ‘log -pretty=oneline’`

- `git log —pretty=oneline`을 `git history`라는 별명으로 aliasing

### merge

헤드가 가리키던 커밋에 다른 브랜치가 가리키던 커밋을 합쳐서 새로운 커밋으로 만드는 작업

- `git merge --abort` 머지 취소하기
- **Fast-forward 머지 :** 새로운 커밋이 생기는 게 아니라 단지 브랜치가 이동하게 되는 머지
  - 커밋 히스토리에서 같은 선(line) 상에 있는 브랜치를 머지할 때 Fast-forward 머지가 이루어진다.
- **3-way merge** - 일반적으로 merge 커밋이 생기는 merge
  - 1-way : 두 갈래로 갈라지기 전 공통 조상이 되는커밋
  - 2-way : 한 브랜치가 가리키는 커밋
  - 3-way : 다른 브랜치가 가리키는 커밋

> git push와 git pull은 작업단위가 브랜치이다.

### 몰랐던 git 명령어 2

- `git pull` : fetch + merge.
- `git fetch`: remo가져오기만 하고 자동 merge는 안됨
  - 브랜치가 가리키고 있는 커밋 이전에 이루어진 모든 커밋들을 가져온다.
- `git blame 파일명(대상)` : 역대 커밋 내역 볼 수 있음 (작성자라 날짜도..ㄷㄷ)
  - git lens - vs code extension!이 있다.
- `git revert 커밋ID` → 커밋메시지 작성 → 저장
  - 해당 커밋으로 상태를 돌린 뒤, 새로운 커밋을 추가해주는 것!!
    > reset과의 차이를 잘 이해할 것. reset으로 하게 되면 push를 못함
  - 여러개 커밋 범위로 지정하기
    - `커밋ID1..커밋ID22` - 이때 커밋ID1는 포함되지 않는다. 그 다음부터 커밋ID22까지 삭제됨
- `git rebase branch이름`
  - 커밋을 재배치한다.
  - 머지는 머지를 했다는 새로운 commit이 생긴다. 그러나 rebase는 새로운 커밋을 만들지 않는다. 즉 history가 더 깔끔함~
  - `git rebase --continue` : conflict가 발생해서 중단되었던 rebase를 계속 진행해라
- `git stash` - 작업 도중 다른 branch로 가거나 잘못된 브랜치에서 작업을 하고 있었을 때가 유용하다.
  - 최근 커밋 이후 작업했던 내용은 모드 스택에 옮겨지고 working directory 내부는 다시 최근 커밋 상태로 초기화
  - `git stash list` - git stash의 stack 보여줌
  - `git stash apply` - 스택의 내용 불러오기
  - `git stash drop stash@{숫자}` - stash에서 삭제
  - `git stash pop`
- `git cherry-pick 커밋ID` : 다른 브랜치에서 필요한 커밋만 가져오기

### Stash에 대하여

staging area와 working directory는 모든 브랜치가 공유한다.
즉, 커밋을 안하고 브랜치 이동을 하게 되면 섞이니까 주의!!!
따라서 공유하고 싶지 않으면 해당 브랜치에서 commit을 하거나 stash를 한 뒤 이동해야한다
