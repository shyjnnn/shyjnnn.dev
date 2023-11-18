---
title: '나 사용 설명서 제작 플랫폼, 나자신 회고'
date: 2023-09-01
slug: na-jasin-reviews
tags: '👻나자신'
summary: 나자신 프로젝트 회고
category: 🌱회고
thumbnail: 'https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/e78da46e-718a-4e84-b983-0a9a15be707e'
---

> [GitHub](https://github.com/najasin/na-jasin-FE) | [사이트](https://na-jasin.com/)

약 한달 간 최종 프로젝트를 진행하느라 바쁜 한달을 보냈다.

한달 간의 여정을 잊지 않기 위해, 회고록을 작성한다.

## 너가 모르는 너 사용법을 알려줄게, 나자신

우선, 나자신은 메타인지를 위해 스스로 나 사용 설명서 입력 및 제작하고 타인에게 평가를 받는 웹 서비스이다.

나에 대한 설명을 스스로 작성해보고 공유할 수 있으며, 사용자별 링크로 접속한 다른 사람에게 그들이 생각하는 나에 대해 받을 수 있다.

어떻게 보면 학창시절 유행하던 (어쩌면 현재에도 유행 중인?) [ask](https://asked.kr/welcome)와 비슷한 서비스이다.

나 사용 설명서를 적고 받아보면서 메타인지를 하고 나아가 성장을 도모하는 플랫폼이다. 기본적으로 간단히 나 사용 설명서를 적을 수 있는 `Just For Fun` 모드가 있다. 개발자 준비생 맞춤형 메타인지 플랫폼까지 확장을 고려했으나, 현재에는 `Just For Fun` 모드까지만 제공한다.

더 자세한 기획 배경과 디자인 과정은 <u>아래 글</u>에서!.

> [나 자신의 기획 배경](/review/na-jasin-planning-and-design)

나는 **아래와 같은 부분을 맡아 구현**했다.

### 1. 백엔드 API 설계 및 소통 담당

기획부터 시작한 프로젝트이다 보니 백엔드의 필요성을 느꼈다. 그러나 최소한의 CRUD만 필요했기 때문에 2명의 백엔드 개발자를 구해서 협업했다.

첫 기획부터 함께한 것은 아니기 때문에 요구사항을 명확히 전달하고, 설계를 함께해 구조에 대해 맞춰놓는 것이 중요했다.

이를 위해 개발 시작 전, <u>요구사항을 기능별</u>로 쪼개고 회의를 통해 확정하는 작업을 담당했다.
<img width="500" alt="image" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/0bcdd12f-328f-4044-ac4c-75445d7fe25e">

<br/>

원활한 소통을 위해 <u>유저 플로우</u>를 정리해서 공유했다.
<img width="404" alt="image" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/a585fb39-65d8-412d-a094-3c3a6a4d4cac">

백엔드에 대해 아예 무지한 것이 아니기 때문에 도움이 되었다. 특히 ERD를 함께 보면서 일대다 관계를 가져야하는 나 설명서에 대해 다대다로 변경하는 등 **백엔드 소통에 기여**했다고 생각한다.😁

프론트엔드는 혼자만 존재해서 개발할 수 있는 분야가 아니다. 풀스택까진 아니더라도 <u>백엔드에 대한 기본적인 개념</u>을 알아야하고, 협업에서 큰 도움이 됨을 느꼈다.

<br/>

![아키텍처](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/4641d105-b4f9-46cb-9950-dde3c06efaad)

결론적으로 위와 같은 형태로 서비스 아키텍처를 구축했다.

### 2. Input, Butotn, 입력폼, 캐릭터 선택 컴포넌트 .. etc

<img width="223" alt="image" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/4019ed55-ab7f-4c66-af3d-b9823c180580">
<img width="415" alt="image" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/12e9a520-44c4-4897-8b22-f1ac31c00548">
<img width="426" alt="image" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/8845c59e-f9d4-4df5-b728-c7f0805ea239">
<img width="372" alt="image" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/d9777b3f-f325-4d3e-a92f-018908709fd1">

입력이 중점이 되는 사이트다보니 관련 공통 컴포넌트를 최대한 **범용적으로 구현**하는 것이 중요했고 해당 부분을 담당하게 되었다.

특히 입력과 버튼에서 <u>유효성 검사 로직</u>이 필수적이었다. 이를 쉽게 하기 위해 `React-hook-Form` 라이브러리를 사용했다.

### 3. 등록하기 페이지 - useFunnel

2번의 컴포넌트들을 모두 조합해 만들 수 있는 등록하기 페이지를 담당했다.

<img width="1256" alt="image" src="https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/6016b561-5dc3-4e15-9b10-b1412532a67f">

총 5가지의 섹선으로 (닉네임, 캐릭터 꾸미기, 설명서 상세 작성, 키워드 선택, 그래프 선택) 나누어져있었고, 캐릭터가 들어가다 보니 한 페이지에 입력해야하는 정보가 <u>과도하게 많았다</u>.

따라서 더줄게 프로젝트에서도 도입했었던 **Funnel Pattern**을 도입해 페이지는 동일하지만 컨텐츠만 바꿔줘 마치 여러 페이지를 왔다갔다하는 것 처럼 <u>입력 흐름을 가질 수 있도록</u> 했다.

<aside>
✋ 잠깐! 퍼널이란?

![funnlePattern](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/05b335ec-6066-487a-8949-9ca9681ede65)
_마케팅 용어 퍼널_

퍼널은 마케팅 분야에서 사용되는 용어로 깔때기라는 의미이다. 즉,유저가 구매 고객이 될 때까지의 과정을 한번에 처리하지 않고 단계를 나눠 유저 이탈을 막는 마케팅 전략이 바로 퍼넡이다.

이를 사용자 경험 측면에서 재해석해 토스에서 이름을 붙인 것이 퍼넡패턴이다. 유저가 모든 정보를 하나의 페이지에서 입력하지 않고 하나의 페이지에서는 하나의 정보만 처리할 수 있게 사용자 경험 개선을 위해 페이지를 여러 개로 분리하되, 페이지를 **한방에 쉽게 관리하기 위해 로컬 상태로 페이지 관리**하는 것이다.

프론트엔드적으로 다시 보자면, 실제 페이지가 아닌 **렌더링만 변경해 마치 페이지가 변경되 듯 작동**하도록 해 **한 페이지에서는 하나의 정보만 처리**하는 것이다.

</aside>

기존 Toss의 Slash 라이브러리의 useFunnel hook을 사용하면 손쉽게 구현할 수 있는데, 해당 라이브러리는 내부적으로 Next page router의 `next/router`에 의존해 사용할 수 없었다.

따라서 <u>직접 제작해서 사용</u>했는데 많은 우여곡절이 있었다. funnel 패턴을 도입한 과정과 방식은 아래의 `Problem`과 `Try`에서 다룰 예정이다.

## Keep

### 1. Compound Component Pattern

컴포넌트를 만들 때, 가장 중요하게 생각하는 것 중 하나는 **컴포넌트의 독립성**이다. 종속성을 최대한 배제한 컴포넌트가 확장성을 높일 수 있다고 생각한다.

**기존의 문제점**

```tsx
<NoticeDetailShell
  noticeId={params.noticeId}
  shopId={params.shopId}
  name={name as string}
  category={category as string}
  imageUrl={imageUrl as string}
  startsAt={startsAt as string}
  workhour={workhour as number}
  address={address as string}
  closed={closed as boolean}
  shopDescription={shopDescription as string}
  noticeDescription={noticeDescription as string}
  hourlyPay={hourlyPay as number}
  originalHourlyPay={originalHourlyPay as number}
  userType={userType}
  isProfile={isProfile}
  isApplication={isApplication}
/>
```

더 줄게 프로젝트를 진행하면서 위와 같은 구조로 **Polymorphic 컴포넌트**를 제작했다. 하나의 컴포넌트가 다양한 일을 수행할 수 있도록 props를 사용해 <u>역할을 부여</u>한 것이다.

하지만, 수행해야 할 일이 많아질수록 여러 개의 컴포넌트가 상위 컴포넌트와 **종속성이 과하게 강해**지는 문제점이 있었다. 색상만 변경하려고 해도 props를 수정해야하기 때문에 <u>수정이 힘들었다</u>. 또한 각 props가 어떤 조건을 의미하는 지 파악하기 어려웠다.

사실 개발을 진행하면서 계속해서 추가하다보니 로직이 복잡해질수록 의존성이 강해지고 위의 문제점이 대두되었다.

```tsx
<Input variant={inputVariant}>
  <Input.TextField
    id='nickname'
    register={register('nickname', {
      ...(step === 'nickname' && validationRules),
    })}
    isInvalid={formState.isSubmitted ? !!formState.errors.nickname : undefined}
  />
</Input>
```

```tsx
export function Input({ children, variant }: InputProps) {
  const child = Children.only(children);

  return (
    <div className={cx('inputWrapper')}>
      {cloneElement(child, {
        className: cx('inputTextField', [variant]),
        ...child.props,
        variant,
      })}
    </div>
  );
}

Input.TextField = forwardRef(function TextField(
  { onChange, ...props }: TextFeildProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <>
      <div className={cx('errorInfo')}>
        {props.isInvalid && (
          <p className={cx('errorInfoText', hsYuji.className)}>필수!</p>
        )}
      </div>
      <input
        className={cx('inputTextField')}
        ref={ref}
        onChange={onChange}
        {...props.register}
        defaultValue={props.defaultValue}
        aria-invalid={props.isInvalid}
        autoComplete='off'
      />
    </>
  );
});
```

본 경험을 바탕으로 의존성을 최대한 없애고 <u>변경에 유연한</u> Comound Component Pattern을 도입했다. 확실히 **의존성을 분리한 컴포넌트**를 만들 수 있었고, **잦은 변경에 대응 가능**했다.

특히 기획과 디자인, 개발이 병렬적으로 이루어지는 본 프로젝트에 <u>적합한 디자인 패턴</u>이었다고 생각한다.

하지만 <u>불필요한 컴포넌트가 많아질 수 있고</u> props가 많아진 것처럼 하위 컴포넌트가 많아질 수 있다고 느꼈다.
아주 작은 컴포넌트를 작성하기 위해 부모, 자식을 가져와야하기 때문에 기존 1단계 컴포넌트가 2단계로 늘어나는 셈이다. 그러나 <u>유연성이 앞도적으로 높다</u>는 점에서 앞으로도 이 패턴을 애용할 것 같다.

### 2. Trunk-based development & Squash Merge

![TBD](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/8d05866d-4cba-4f3e-b100-24f280b3e8e5)

브랜치 전략으로는 **TBD**를 택하고 **Squash merge**로 병합을 진행했다. 인당 하루 <u>최소 3개</u>의 PR merge를 목표로 개발을 진행했다.

이유는 다음과 같다.

1. PR 단위가 커질수록 코드리뷰하기 어려움

   이전 프로젝트 당시, 개발과 코드리뷰를 동시에 진행하면서 코드리뷰 재촉을 받은 적이 있다. 하지만 코드의 길이가 200줄이 넘어가고, 여러 기능이 한번에 올라오다보니 리뷰 하는데 시간이 많이 소요되었다. 결과적으로 프로젝트의 지연을 야기했다.

2. 4명의 소규모, 4주의 짧은 기간

   4명이라는 소규모 팀으로 진행되고, 짧은 기간동안의 프로젝트이다보니, long-term branch의 필요성을 느끼지 못했다. 오히려 branch가 오래 살아있을 수록 해당 기능은 적용하지 못해 개발 지연이 생겼다.

3. Vercel을 통해 배포

   이로 인해 Vercel의 강력한 CI/CD 기능을 활용할 수 있었다.

따라서 TBD를 사용하지않을 이유는 없었고 오히려 생산성을 위해 도입해야했다.
따라서 TBD 방식처럼 항상 배포가능한 main 브랜치를 두고, 짧은 수명을 가진 feature 브랜치를 운용했다.

최대한 작은 실행 가능한 기능 단위로 쪼개어 진행했기 때문에 commit 내역도 불필요하다고 생각했다. 따라서 오히려 revert하기 쉽도록 squash merge를 해 여러개의 커밋을 하나의 커밋으로 합친 후 merge했다.

프로젝트를 하면서 밀도있고, 소규모 프로젝트에 이정도로 딱 맞는, 잘 어울리는 전략이 없다는 생각을 했다.

### 3. 스토리북을 활용한 컴포넌트 문서화

![storybook](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/5be47f66-b2b6-4004-811c-9238dba79ea0)

범용적으로 사용되는 공통 컴포넌트의 다양한 쓰임세를 스토리북으로 문서화했다. 특히 chromatic과 github action을 활용해 매 PR 시 변경된 story 파일이 있으면 자동 배포해 협업 방식을 개선했다.

사실 더줄게 프로젝트 때 스토리북을 도입했다면 훨씬 좋았을 것 같다. 그러나 이번 프로젝트에서도 반복 소통을 줄인다는 점에서 의미가 있었다 :)

![radder](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/3435b3ea-a2b4-4b8c-9e7a-dc68a940d874)
_왼 - 내가 설정한 값만 존재 / 오 - 타인이 설정한 값의 평균이 존재(회색)_

특히 Radder Chart를 사용할 때 큰 도움이 되었다. Rechart라는 라이브러리를 사용하기 때문에, 해당 라이브러리 사용법을 알지 못하면 어떤 props를 받아야할 지 헷갈렸는데, 스토리북을 활용해 각 페이지별 스토리를 설정해둬서 빠르게 사용할 수 있었다.

## Problem

### 1. Funnel 컴포넌츠의 infinite depth error

![regacy-useFunnel](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/abe673ec-003f-40d9-91ea-143d506fa842)

앞서 언급했듯이, `@toss/useFunnel`은 내부적으로 next/router에 의존하고 있어, `next/navigation`으로 마이그레이션이 필요한 next 13 버전에서는 사용할 수 없다.

따라서 필수로 필요한 기능 2가지를 포함해 기존 훅과 유사한 형태로 커스텀하였다.

필수 기능은은 다음과 같다.

- Step에 따라 렌더링되는 기능
- 뒤로가기 할 시, 이전 Step으로 가는 History 기능

1. Step에 따라 렌더링 되는 기능

우선 가장 기본적인 단계별 렌더링 컴포넌트를 다르게 해주는 기능을 컴포넌트 filtering으로 구현했다.

```tsx
// 단계별로 컴포넌트를 렌더링해주는 Funnel 컴포넌트
function Funnel<T extends readonly string[]>({ step, children }: IFunnelProps<T>) {
  // 유효한 자식 요소 필터링
  const validElement = Children.toArray(children).filter(isValidElement);
  // 현재 단계와 일치하는 Step 컴포넌트를 찾음
  const targetElement = validElement.find(
    (child) => (child.props as IStepProps<T>)?.name === step
  );

  // 일치하는 Step 컴포넌트가 없으면 null 반환
  if (!targetElement) {
    return null;
  }

  return <>{targetElement}</>;
}

// 단순히 자식 요소들을 렌더링해주는 Step 컴포넌트
function Step<T extends readonly string[]>({ children }: IStepProps<T>) {
  return <>{children}</>;
}
```

Funnel 컴포넌트로 단계별로 컴포넌트를 렌더링해준다. 이때,유효한 자식 요소 필터링해 현재 단계와 일치하는 Step 컴포넌트를 찾는다. 일치하는 Step 컴포넌트가 없으면 null 반환을 반환한다.
Step 컴포넌트는 단순히 자식 요소들을 렌더링해주는 Step 컴포넌트이다.

2. History 기능

   가장 중요한 것은 단순 렌더링만 달리지는 것이지만, **브라우저의 뒤로가기 기능을 사용했을 때, 페이지가 변경되는 것이 아닌 이전 step으로 가도록 하는 것**이었다. 이를 위해 step이 바뀔때 마다 `router.push`를 사용해 직접 쌓아줬다.

```tsx
/**
 * Funnel 컴포넌트와 현재 단계를 설정할 수 있는 setter를 포함하는 튜플을 반환하는 훅
 * @param {T} steps - Funnel의 사용 가능한 단계 배열
 * @param {T[number]} defaultStep - 시작 기본 단계
 * @returns {[typeof Funnel, React.Dispatch<React.SetStateAction<T[number]>>]}
 * Funnel 요소와 현재 단계를 설정할 수 있는 setter를 포함하는 튜플을 반환한다.
 * @example
 * const steps = ['Step1', 'Step2', 'Step3'] as const;
 * const defaultStep = 'Step1';
 * const [FunnelElement, setStep] = useFunnel(steps, defaultStep);
 * // FunnelElement를 JSX로 렌더링하고, setStep을 사용하여 현재 단계를 변경할 수 있다.
 */

export const useFunnel = <T extends readonly string[]>(
  steps: T,
  defaultStep: T[number]
) => {
  const [step, setStep] = useState(defaultStep);

  // Funnel 컴포넌트와 함께 Step 컴포넌트를 반환하는 객체를 생성
  const FunnelElement = useMemo(
    () =>
      Object.assign(
        (props: Omit<IFunnelProps<T>, 'step'>) => <Funnel step={step} {...props} />,
        { Step: (props: IStepProps<T>) => <Step<T> {...props} /> }
      ),
    [step]
  );

  const pathname = usePathname();
  const searchParams = useSearchParams().get('step');
  const router = useRouter();

  useEffect(() => {
    if (step === defaultStep) {
      return;
    }
    if (searchParams) setStep(searchParams);
  }, [defaultStep, searchParams]);

  useEffect(() => {
    router.push(`${pathname}?step=${step}`); // history 기능
  }, [pathname, router, step]);

  useEffect(
    () => () => {
      setStep(defaultStep);
    },
    [defaultStep]
  );

  const goNext = () => {
    const idx = steps.indexOf(step);
    if (idx === steps.length - 1) return;
    setStep(steps[idx + 1]);
  };

  const goPrev = () => {
    const idx = steps.indexOf(step);
    if (idx === 0) return;
    setStep(steps[idx - 1]);
  };
  // FunnelElement와 현재 단계를 설정할 수 있는 setter를 튜플로 반환
  return { Funnel: FunnelElement, step, setStep, goNext, goPrev } as const;
};
```

이 과정에서 발생한 문제는 step을 변경할 때마다 `infinite depth error`가 발생하는 것이었다.

![useFunnel-infinite-depth](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/5eb32bd1-11d3-439c-abef-f39ea00ecb7e)

### 2. 많은 API 호출

![too-many-api-call](https://github.com/shyjnnn/shyjnnn.dev/assets/81355590/a0b6905a-13d3-45af-854a-6b4121ca528d)

나자신 등록하기 페이지에서 **입력시 필요한 폼은 백엔드에서 api 호출**로 불러오고 있다. 데이터 변경의 유연성 때문에 프론트엔드에서 static하게 구현한 것이 아닌 백엔드에서 가져오는 방식을 택했다.

하지만 **퍼널 패턴**으로 이루어져있는 페이지의 특성 상, 각 컴포넌트(=단계) 별로 필요한 데이터가 달랐다.
따라서 처음에는 각 단계에 필요한 데이터를 매번 다른 endpoint에 요청해 받아왔다.

예컨데 캐릭터 꾸미기 단계에서는 `GET /api/inventpory`, 키워드 선택 단계에선 `GET /api/keyword`을 한 것이다.

이러다 보니 한 페이지에서 무려 **최소 5번의 API 호출**이 필요했다.

따라서 <u>첫 페이지 로드 시에만 하나의 Endpoint</u>에서 전체 입력 데이터를 받을 수 있도록 설계를 변경했다.

그러나 문제점이 있었다. 처음에 데이터를 다 가져오다 보니, 컴포넌트 단계가 깊어질 수록 **props drilling이 과해지는 것**이었다. 또한 가져온 데이터를 state에 담아서 관리하다 보니 하나의 state가 너무 비대해지는 것도 문제었다.

## Try

### 1. Funnel 컴포넌트 memoization 하기

처음에는 `Funnel`의 문제가 아닌 Radder 컴포넌트의 state 관리 문제인 줄 알았다. 부모에 있는 Radder의 5가지 아이템 state가 끊없이 렌더링을 발생시키는 것이다. (실제로 문제가 있었고 수정했다.) 하지만 주 원인은 아니었다..

3일 동안 고민한 끝에 원인을 파악할 수 있었다. ~~아주 초보적인 실수를..ㅎ~~

step이 변경되면 렌더링이 발생하고 -> 리렌더링 발생으로 `Funnel` 컴포넌트가 다시 생성되면서 렌더링 지옥에 빠진 것이다. 다시 말해, **step 상태가 변경될 때마다 `FunnelElement` 객체가 새로 생성**되면서 Funnel을 사용 중인 모든 컴포넌트들이 리렌더링된다는 것이었다.

```tsx
// Funnel 컴포넌트와 함께 Step 컴포넌트를 반환하는 객체를 생성
const FunnelElement = useMemo(
  // useMemo 필수
  () =>
    Object.assign(
      (props: Omit<IFunnelProps<T>, 'step'>) => <Funnel step={step} {...props} />,
      { Step: (props: IStepProps<T>) => <Step<T> {...props} /> }
    ),
  [step]
);
```

이를 방지하기 위해 `useMemo`를 사용해 정말로 step이 변경되었을 때만 객체를 새로 생성하도록 최적화해줘 해결할 수 있었다.

사실 `React`를 공부하면서 Memoization 의 필요성이 크게 와닿진 않았다. 오히려 메모리 누수를 야기할 수도 있다는 글을 보기도 했다. 하지만 이번 경험을 통해 **Memoization이 정말로 필요한 순간**이 있음을 깨달을 수 있었다.

<br/>

**아쉬운 점**

아쉬운 점은 useFunnel로 인해 **서버 컴포넌트**를 활용하지 못한 것이다. useFunnel hook에서 받은 Funnel 컴포넌트로 렌더링을 관리하다 보니, 모든 컴포넌트를 "use client" 하위에 둘 수 밖에 없었다. 해당 훅 로직을 외부로 분리해서 컴포넌트 소유자를 변경해서 서버 컴포넌트를 사용할 수 있을 것 같기도 한데.. 어떻게 분리할 수 있을 지 아직까진 잘 모르겠다. 고민이 더 필요할 것 같다.

### 2. React-Query를 사용해 API 호출 최적화

API 호출을 1회로 줄이면서도 State가 커지지 않고, props drilling이 발생하지 않도록 하려면 어떻게 해야할지 많은 고민을 했다.

결론은 cache를 사용하는 것이었다. 사실 등록하기 페이지에 처음 들어갔을 때 받아온 데이터는 대부분 중간에 변경되지 않는다. 만약, 5번의 API 호출로 각 단계별 데이터를 받아올 경우, 각각의 데이터가 중간에 변경되면 단계별 관계가 깨진다. 즉 변경이 될 경우 5개 단계 모두 업데이르를 해야하는 것이다.

따라서 우선, 등록하기 페이지 첫 로드 시, 하나의 endpoint에서 전체 데이터를 받아오는 방식을 체택했다.

2번째 문제점인 State가 비대해지고, props drilling이 과도해지는 것은 `React-Query`의 캐싱을 사용해 해결했다. 앞서 언급했둣, 입력 중간에 데이터가 변경되면 모든 단계가 새로 업데이트되어야한다. 하지만 이때 이미 작성 중인 사용자는 변경 된 데이터가 아닌 기존의 데이터로 계속 작성하도록 하기 위해 한 플로우 내에서는 캐시를 사용했다. 그 이유는 중간에 데이터가 변경되었다고 새로운 데이터로 업데이트 해버리면, 이미 작성한 모든 데이터를 다시 적어야해 사용자 경험에 좋지 않을 것이라고 판단했다.

> 사실 입력 중에 데이터가 변경되는 일은 거의 드물다고 판단한 이유도 한목한다.

결론적으로 `React-Query`의 Cache를 사용해서, 부모 컴포넌트에서 data를 props로 내려주는 것이 아닌, 각 컴**포넌트 내에서 다시 한번 요청을 보내 캐시되어있는 데이터를 활용**할 수 있도록 변경했다.

이로 인해 **API 호출을 1회로 줄이면서도 state 관리의 복잡성을 없앨 수** 있었다.

## 소감

한달이라는 시간 동안 기획/디자인/백엔드 협업을 동시에 진행해야 하다보니 개발 시간이 많이 부족했다. 그러다보니 처음의 목표였던 이용자 유치를 위한 마케팅을 잘하지 못해서 아쉬움이 남는다.

또한 Next.js app router의 특징 중 하나인 <u>서버 컴포넌트를 더욱 적극적으로 활용하지 못했다</u>. ~~(더줄게 프로젝트에서 오히려 더 많이 활용한듯..ㅎ)~~ 또, 아직까지 컴포넌트 의존성에 대해 완벽히 이해하진 못한 것 같다. 차츰차츰 더 좋은 코드를 위해 **다양한 패턴을 살펴보고 고민해보는 자세**를 가져야겠다.

그러나, 짧은 기간 내 **밀도있게 기획 배경 리서칭, 디자이너와 백엔드 개발자와의 비동기적 협업, 디자인 시스템 구축, 개발 및 릴리즈 이 일렬의 과정**을 경험할 수 있었다는 점에서 배운 것이 많았다고 생각한다.

기술적으론 컴포넌트 디자인 패턴, 팀 상황에 알맞는 협업 전략 수립, 메모이제이션과 캐시의 필요성 등을 고민해보면서 **가장 합리적인 선택을 하는 경험**이었다.

개발 외 적으로 자잘한 이슈들을 많이 마주했고, **개발 외 적으로 성장이 더 필요함**을 깨달을 수 있었다. 이번에도 또한 빠른 개발과 클린 코드 사이의 트레이드 오프를 마주했다. 현업에서는 조금 더 기능 구현에만 초점을 맞춘 것이 아닌 **유지보수에 초점을 맞춘 개발을 하고 싶다는 니**즈를 강하게 느낀 경험이었다.

이번 프로젝트로 성장할 수 있었지만, 아직 모르는 분야가 많음을 깨달았다. 부지런히 공부하고 부지런히 부딪히며 노력하는 사람이 되어야겠다고 다짐한다.
