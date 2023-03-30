---
title: Git의 checkout과 reset의 차이점(with switch)
date: 2023년 3월 31일
slug: Git의-checkout과-reset의-차이점
tags: Git
category: 🙏잡학사전
---

# Reset

- HEAD가 가치키던 브랜치가 다른 커밋을 가치키도록 합니다. 결국 간접적으로 HEAD가 가리키는 commit을 변경하므로 그 후에 commit을 하면 새로운 commit이 생성되고 원래 연결되어있던 commit은 연결성이 없어서 삭제된 것처럼 보입니다.
- 3가지 옵션을 사용해서 파일이나 폴더의 상태를 변경할 수 있습니다.
  - soft - repository에 있는 파일상태를 staging area로 변경합니다.
  - mixed - stage 파일을 unstage 상태로 만듭니다. 즉 working directory에만 적용되어있는 상태.
  - hard - working directory에서도 내립니다.

# Checkout

- git checkotu commitID로 Detached HEAD를 만들 수 있습니다.
  - 브랜치를 통하지 않고 커밋을 직접 가르키는 HEAD를 Detached HEAD라 합니다.
- HEAD 자체가 가리키는 Branch를 변경합니다. 따라서 사용자의 시점이 이동한다고 볼 수 있다. 어느 파일도 삭제가 되지 않고 시점이 바뀌는 change의 느낌을 갖게 됩니다.
- Untracked file은 checkout을 하더라도 삭제되지 않습니다.
- Detached HEAD인 상태에서 git branch 새브랜치 를 하게 되면 새브랜치도 그 커밋을 가리키게 됩니다. 이후 git checkout 새브랜치 를 하면 HEAD가 새브랜치를 가리키면서 정상적인 상태로 돌아옵니다.

<aside>
✅ 즉, 둘의 차이점은
reset은 HEAD가 가리키던 브랜치가 다른 커밋을 가리키도록 하는 것이지만, checkout은 HEAD 자체가 다른 커밋이나 브랜치를 가리키도록 하는 것입니다.
**간접과 직접의 차이!**

</aside>

---

### checkout의 일부 기능이 switch와 restore로 분리되었다!!

## Switch

- `git switch branch`
- 브랜치를 이동할 때 사용한다. 즉 HEAD가 가리키는 branch를 변경한다.
- `c` 옵션으로 브랜치를 새로 생성 후 이동이 가능하다. = `git checkout -b newbranch`
- 특정 시작시점으로 부터 새 브랜치를 생성 후 이동하고 싶다면 마지막에 특정 커밋혹은 브랜치이름을 적으면 된다.
  - `git switch -c new-branch2 <커밋 번호 ex) 515c633a>`
  - `git switch -c new-branch2 <특정 브랜치 이름 ex) upstream/main>`

## restore

- 워킹 트리의 파일을 복원해 주는 역할을 한다.
  - `git restore [file name]` - 특정 파일 HEAD Commit으로 복구하기
  - `git restore --source [commit hash] [file name]` - 특정 파일 특정 Commit으로 복구하기
  - `git restore --staged [file name]`Staging Area에 올라간 파일 다시 Unstaging 시키기
