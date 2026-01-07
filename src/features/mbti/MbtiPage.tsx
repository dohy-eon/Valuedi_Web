import { useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';

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
  const [testStep, setTestStep] = useState(0);

  const resultKey = 'DEFAULT';
  const currentResult = MBTI_RESULTS[resultKey];

  const handleTestComplete = (finalScores: ScoreType) => {
    setScores(finalScores);
    setStep('loading');
    setTestStep(0);
  };

  const handleLoadingComplete = () => {
    setStep('result');
  };

  const handleReset = () => {
    setScores({});
    setStep('intro');
    setTestStep(0);
  };

  const getGnbConfig = () => {
    switch (step) {
      case 'intro':
        return { title: '', text: '' };
      case 'test':
        return {
          title: '',
          text: '',
          onBack: () => {
            if (testStep > 0) {
              setTestStep((prev) => prev - 1);
            } else {
              setStep('intro');
            }
          },
        };
      case 'loading':
        return { title: '', text: '' };
      case 'result':
        return { title: '', text: '결과 공유하기', onBack: handleReset };
      case 'detail':
        return { title: '', text: '결과 공유하기', onBack: () => setStep('result') };
      default:
        return null;
    }
  };

  const gnbConfig = getGnbConfig();

  return (
    <MobileLayout>
      {gnbConfig && <BackPageGNB title={gnbConfig.title} text={gnbConfig.text} onBack={gnbConfig.onBack} />}

      {step === 'intro' && <MbtiIntro onStart={() => setStep('test')} />}

      {step === 'test' && <MbtiTest currentStep={testStep} onStepChange={setTestStep} onNext={handleTestComplete} />}

      {step === 'loading' && <MbtiLoading onComplete={handleLoadingComplete} />}

      {step === 'result' && <MbtiResult scores={scores} onHome={handleReset} onDetail={() => setStep('detail')} />}

      {step === 'detail' && <MbtiDetail result={currentResult} scores={scores} />}
    </MobileLayout>
  );
};
