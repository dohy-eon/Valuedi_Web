import { useState } from 'react';
import { cn } from '@/utils/cn';

import { MbtiIntro } from '@/features/mbti/components/MbtiIntro';
import { MbtiTest } from '@/features/mbti/components/MbtiTest';
import { MbtiLoading } from '@/features/mbti/components/MbtiLoading';
import { MbtiResult } from '@/features/mbti/components/MbtiResult';
import { MbtiDetail } from '@/features/mbti/components/MbtiDetail';

import { MBTI_RESULTS } from '@/features/mbti/constants/results';

type ScoreType = { [key: string]: number };
type StepType = 'intro' | 'test' | 'loading' | 'result' | 'detail';

export const MbtiPage = () => {
  const [step, setStep] = useState<StepType>('intro');
  const [scores, setScores] = useState<ScoreType>({});

  // calculateMbti(scores) 같은 함수로 키를 동적으로 구해야 합니다.
  // 지금은 'DEFAULT' 데이터를 사용합니다.
  const resultKey = 'DEFAULT';
  const currentResult = MBTI_RESULTS[resultKey];

  // 테스트 완료 시 호출 (점수 저장 -> 로딩 화면으로 이동)
  const handleTestComplete = (finalScores: ScoreType) => {
    console.log('Test Complete, Scores:', finalScores);
    setScores(finalScores);
    setStep('loading');
  };

  // 로딩 완료 시 호출 (로딩 화면 -> 결과 화면으로 이동)
  const handleLoadingComplete = () => {
    setStep('result');
  };

  // 홈으로 / 다시하기
  const handleReset = () => {
    setScores({});
    setStep('intro');
  };

  return (
    <div className={cn('min-h-screen w-full bg-gray-100 flex justify-center items-center')}>
      <div className={cn('w-full max-w-[360px] min-h-screen bg-white relative flex flex-col shadow-lg')}>
        {step === 'intro' && <MbtiIntro onStart={() => setStep('test')} onBack={() => setStep('intro')} />}

        {step === 'test' && <MbtiTest onNext={handleTestComplete} onBack={() => setStep('intro')} />}

        {step === 'loading' && <MbtiLoading onComplete={handleLoadingComplete} />}

        {step === 'result' && <MbtiResult scores={scores} onHome={handleReset} onDetail={() => setStep('detail')} />}

        {step === 'detail' && <MbtiDetail result={currentResult} scores={scores} onBack={() => setStep('result')} />}
      </div>
    </div>
  );
};
