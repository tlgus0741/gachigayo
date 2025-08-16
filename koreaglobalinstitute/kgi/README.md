# KGI - Korea Global Institute

## 다국어 지원 (Internationalization)

이 프로젝트는 **i18next**를 사용하여 다국어를 지원합니다.

### 지원 언어
- 🇺🇸 **English** (기본 언어)
- 🇰🇷 **한국어**

### 사용 방법

#### 1. 컴포넌트에서 번역 사용
```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>
      <button>{t('common.submit')}</button>
    </div>
  );
};
```

#### 2. 언어 전환
```jsx
import LanguageSwitcher from './components/LanguageSwitcher';

// 헤더에 추가
<LanguageSwitcher />
```

#### 3. 새로운 번역 추가
1. `src/i18n/locales/en.json`에 영어 텍스트 추가
2. `src/i18n/locales/ko.json`에 한국어 텍스트 추가
3. 컴포넌트에서 `t('key.path')`로 사용

### 파일 구조
```
src/
├── i18n/
│   ├── index.js          # i18n 설정
│   └── locales/
│       ├── en.json       # 영어 번역
│       └── ko.json       # 한국어 번역
├── components/
│   ├── LanguageSwitcher.jsx  # 언어 전환 컴포넌트
│   └── ExampleUsage.jsx      # 사용 예시
└── App.jsx                   # 메인 앱 (i18n 적용됨)
```

### 개발 명령어
```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run lint     # 코드 검사
```

### 배포
- Netlify에 자동 배포됩니다
- `dist/` 폴더의 내용이 배포됩니다
