---
title: Git에서 reset 대신 revert를 써야하는 이유가 무엇일까?
date: 2023-03-31
slug: Git에서-reset-대신-revert를-써야하는-이유가-무엇일까
tags: Git
category: 🙏잡학사전
---

> git reset과 git revert는 둘다 특정 시점 commit으로 되돌리고 싶을 때 사용하는 명령어입니다.

### git reset commit

- git reset은 HEAD가 가리키는 브랜치가 가리키던 commit을 변경하는 것입니다. 이때, soft, mixed, hard의 옵션이 있습니다.
  ![https://velog.velcdn.com/images/shinyejin0212/post/eacc07a8-a4fd-4fbd-9488-a54e77b3426c/image.png](https://velog.velcdn.com/images/shinyejin0212/post/eacc07a8-a4fd-4fbd-9488-a54e77b3426c/image.png)

> 하지만 reset의 경우는 시점이 과거로 변경되는 것 뿐, 나중의 커밋이 사라지는 것이 아닙니다.

- 따라서 `reflog` 명령어를 사용해 reference 로그(HEAD의 위치 변경 로그)를 확인하여 다시 원래의 커밋으로 HEAD를 변경해주면 복구가 가능합니다. (사실 복구라는 말도 맞지 않음 ㅎㅎ)

### git revert commitID

- 이전 커밋으로 거꾸로 되돌린 후 evert 되었다는 새 커밋을 올릴 수 있습니다.
- 여러 커밋을 되돌리는 경우, 각 revert 마다 새 커밋 메시지를 작성해야하는 번거로움이 잇는데, 이때 `-no-commit` 옵션으로 revert를 위한 커밋 하나만 입력해주면 됩니다.

### reset 대신 rever를 사용해야하는 이유

1. 이미 remote repository에 올라간 커밋을 취소해야할 때
   - 리모트에 모든 커밋을 올린 뒤, 로컬에서 reset을 해서 이전 커밋으로 돌렸을 경우 다시 remote에 push를 할 수가 없습니다.
   - 그 이유는 리모트에는 원래 커밋(더 최신 커밋)이 이미 올라가있는 상태이기 때문에 더 pull을 받아야만 충돌이 일어나지 않기 때문입니다.
2. 협업할 때.
   - reset을 한 후 remote에 강제로 올렸을 경우, 이전 커밋 내역이 전부 삭제됩니다. 협업 시, 팀원이 원격 저장소의 커밋을 되돌린 상태를 모른 상태로 작업을 한후 push를 했을 경우, 되돌렸던 커밋들이 다시 원격 저장소에 추가됩니다.
   - 미리 공지를 하거나 사실 되도록 git revert를 사용하는 것이 안전합니다.

### 그래서 git reset과 git revert의 차이는? (사진참고)

![https://han-joon-hyeok.github.io/assets/images/2021-01-25-git-reset-revert/git_reset_revert_compare.png](https://han-joon-hyeok.github.io/assets/images/2021-01-25-git-reset-revert/git_reset_revert_compare.png)

- `git reset`
  - (push하면) 과거 커밋 내역이 삭제됩니다.
    - 예를 들어, remote에는 올리지 않은 작엄을 1~100까지 진행하다가 잘못된 부분이 있어 reset을 사용해 70으로 돌아간 뒤 작업을 다시 하고 remote에 올릴 경우, 이전에 했던 70~100의 내역은 사라집니다.
  - 과거 커밋으로 되돌아간다는 커밋 메세지를 남기지 않습니다.
  - 주로 로컬 저장소에서 작업할 때 사용할 수 있습니다. (push를 하기 이전)
- `git revert`
  - 과거 커밋 내역을 유지합니다.
  - 과거 커밋으로 되돌아간다는 커밋 메세지를 남길 수 있습니다.
  - 주로 원격 저장소에 이미 push를 했을 때 사용합니다.

### 출처

[https://han-joon-hyeok.github.io/posts/git-reset-revert/](https://han-joon-hyeok.github.io/posts/git-reset-revert/)
