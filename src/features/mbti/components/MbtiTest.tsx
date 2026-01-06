import { useState } from 'react';
import { Typography } from '@/components';
import ProgressBar from '@/components/bar/ProgressBar';
import { cn } from '@/utils/cn';
import { MBTI_QUESTIONS } from '../constants/questions';
import BackPageGNB from '@/components/gnb/BackPageGNB';

type ScoreType = { [key: string]: number };

interface MbtiTestProps {
  onNext: (scores: ScoreType) => void;
  onBack: () => void;
}

const OPTIONS = [
  { label: '매우 그렇다.', score: 5 },
  { label: '그렇다.', score: 4 },
  { label: '보통이다.', score: 3 },
  { label: '아니다.', score: 2 },
  { label: '매우 아니다.', score: 1 },
];

export const MbtiTest = ({ onNext, onBack }: MbtiTestProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const question = MBTI_QUESTIONS[currentStep];

  // GNB 뒤로가기 버튼 핸들러
  const handleBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  // 현재 단계의 답변 저장 및 다음 질문으로 이동
  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [currentStep]: score };
    setAnswers(newAnswers);

    if (currentStep < MBTI_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const finalScores = calculateFinalScores(newAnswers);
      onNext(finalScores);
    }
  };

  // 답변 기록(answers)을 기반으로 MBTI 타입별 점수 합산하는 함수
  const calculateFinalScores = (answerHistory: Record<number, number>): ScoreType => {
    return MBTI_QUESTIONS.reduce((acc, q, index) => {
      const type = q.type;
      const score = answerHistory[index] || 0;
      return {
        ...acc,
        [type]: (acc[type] || 0) + score,
      };
    }, {} as ScoreType);
  };

  const progressPercentage = ((currentStep + 1) / MBTI_QUESTIONS.length) * 100;

  return (
    <div className={cn('flex flex-col h-full min-h-screen bg-neutral-0')}>
      <BackPageGNB className="w-full" onBack={handleBackClick} title="" text="" />

      <div className="w-full">
        <ProgressBar percentage={progressPercentage} className="w-full h-[1px]" />
      </div>

      <div className="flex flex-col flex-1 px-[20px] mt-[19px]">
        <div className={cn('flex flex-col gap-[12px]')}>
          <Typography style="text-headline-3-18-semi-bold" className={cn('text-neutral-90 whitespace-pre-line')}>
            {question.title}
          </Typography>
          <Typography style="text-body-2-14-regular" className={cn('text-neutral-70')}>
            사용자의 소비행태를 분석해요
          </Typography>
        </div>

        <div className="flex flex-col mt-[46px] gap-[8px]">
          {OPTIONS.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.score)}
              className={cn(
                'w-full p-[12px] flex items-center gap-[8px] border border-neutral-10 rounded-[8px]',
                // (선택 사항) 사용자가 선택했던 답변 표시해주고 싶으면 아래 조건 추가 가능
                // answers[currentStep] === option.score ? 'bg-neutral-10 border-neutral-50' : ''
                'active:bg-neutral-5' // 클릭 시 살짝 반응
              )}
            >
              <div
                className={cn('flex items-center justify-center w-[24px] h-[24px] rounded-[12px]', 'bg-primary-normal')}
              >
                <Typography style="text-caption-1-12-semi-bold" className="text-neutral-90">
                  {index + 1}
                </Typography>
              </div>

              <Typography style="text-body-2-14-regular" className="text-neutral-90">
                {option.label}
              </Typography>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
