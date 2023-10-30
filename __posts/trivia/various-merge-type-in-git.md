---
title: Git의 다양한 Merge Type들
date: 2023-03-31
slug: Git의-다양한-Merge-Type들
tags: Git
category: 🙏잡학사전
---

> Git에서 branch merge의 방법은 2가지가 있습니다. 다른 명령어와 함께 쓰는 방법은 추가로 3개지가 더 있습니다.
>
> 아래 블로그들을 참고하여 정리한 내용입니다.
>
> [https://velog.io/@devp1023/GIT-병합-충돌-해결-3-way-merge-fast-forward](https://velog.io/@devp1023/GIT-%EB%B3%91%ED%95%A9-%EC%B6%A9%EB%8F%8C-%ED%95%B4%EA%B2%B0-3-way-merge-fast-forward)
>
> [https://lukemerrett.com/different-merge-types-in-git/](https://lukemerrett.com/different-merge-types-in-git/)[https://velog.io/@msung99/Git-Squash-Merge](https://velog.io/@msung99/Git-Squash-Merge)

## **3-way Merge**

두 브랜치가, 커밋 히스토리 상에서 분리된 2개의 선에 각각 존재할 때 머지를 하면 머지 커밋이 새롭게 생기는 Merge입니다.

3가지의 commit을 고려하기 때문에 3-way입니다.

![https://velog.velcdn.com/images/shinyejin0212/post/40d0c592-5f7b-4481-8edd-2abfa669c2d0/image.png](https://velog.velcdn.com/images/shinyejin0212/post/40d0c592-5f7b-4481-8edd-2abfa669c2d0/image.png)

### 장**점**

- 가장 자세한 history를 남길 수 있습니다.
- merge한 commit도 남기 때문에 언제 병합했는지 알 수 있습니다.
- 손실 없이 최종적으로 병합된 변경 사항을 구성하는 각 커밋을 볼 수 있습니다.

### 단점

- merge commit이 남는 것이 단점이 될 수도 있습니다. 아무런 변경사항을 가지고 있지 않은 commit이기 때문입니다.
- branch끼리 병합되는 과정에서 복잡한 그래프를 갖게 될 수도 있습니다.

## Fast-forward merge

branch간의 병합을 진행할 때, 커밋이 생기지 않고 merge 명령어를 실행하는 브랜치의 HEAD Commit이 병합되는 branch의 HEAD Commit으로 이동되는 방식입니다.

- 즉 단지 branch가 이동하게 되는 것입니다.
- 빨리 감기 한다는 뜻이 있습니다.

**조건**

: commit history에서 같은 line 상에 있는 branch를 merge할 때 이루어집니다.

![https://velog.velcdn.com/images/shinyejin0212/post/aa4ab220-4a27-4d10-a9ec-5ae71f2d26e3/image.png](https://velog.velcdn.com/images/shinyejin0212/post/aa4ab220-4a27-4d10-a9ec-5ae71f2d26e3/image.png)

**이점:**

- 깨끗한 커밋 history를 유지할 수 있습니다.
- 손실 없이 최종적으로 병합된 변경 사항을 구성하는 각 커밋을 볼 수 있습니다.

**단점:**

- 기본 브랜치에 새 커밋이 없는 경우에만 가능하다는 전제조건! 이것을 만족하는 경우는 극히 드뭅니다.
- merge 시점을 정확히 알기 어렵습니다.

## Squash & Merge

**여러번 커밋한 이력을 하나의 커밋 이력으로** 합친후 Merge 하는데 사용합니다. branch간의 병합을 진행할 때, 커밋이 생기지 않습니다.

```bash
git merge --squash sub_bransh
git commit -m "메시지"
```

![https://velog.velcdn.com/images/shinyejin0212/post/b78edbb8-ddb8-455e-8a22-7dab6bce99b3/image.png](https://velog.velcdn.com/images/shinyejin0212/post/b78edbb8-ddb8-455e-8a22-7dab6bce99b3/image.png)

### 장점

- 매우 깨끗한 커밋 history을 유지할 수 있습니다.
- 로그에서 여러 커밋을 통해 이동하는 대신 단일 커밋을 보고 전체 작업을 볼 수 있습니다.

### **단점**

- 세분성 상실, 분기를 구성한 커밋의 유용한 세부 정보, 개발 프로세스 중에 캡처된 흥미로운 결정, 로직 변경 등이 손실됩니다.

## Rebase & Merge

통합커밋 하나를 생성하는 것이 아닌, 서브 브랜치의 커밋 히스토리를 몽땅 다 가져와서 develop 브랜치에다 merge 하는 방식입니다.

```bash
git checkout sub_branch
git rebase develop # rebase
git checkout develop
git merge sub_branch # merge
```

![https://velog.velcdn.com/images/shinyejin0212/post/fa22f361-c6b1-49bb-b404-ad213243f2a4/image.png](https://velog.velcdn.com/images/shinyejin0212/post/fa22f361-c6b1-49bb-b404-ad213243f2a4/image.png)

### **장점**

- 매우 깨끗한 커밋 기록을 유지합니다.
- squash와 달리 각 commit을 유지합니다.

### **단점:**

- merge 전에 누군가 기본 브랜치에 커밋하는 경우 다시 rebase를 해야합니다..ㅎ
- 분기 시점(branch 생성 시점)과 merge 시점이 남지 않아 확인이 어렵습니다.
- 어떤 커밋이 어떤 브랜치와 관련이 있는지 확인하기 어렵습니다.

## Squash와 Rebase의 차이?

쉽게말해 Squash 는 통합커밋 딱 하나를 master 브랜치 뒤에 붙여주는 방식이고, Rebase 는 서브브랜치의 여러 커밋들을 뒤에 붙여주는 방식입니다.
