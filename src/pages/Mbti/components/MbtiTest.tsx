import { Typography } from '@/components';
import ProgressBar from '@/components/bar/ProgressBar';
import { cn } from '@/utils/cn';
import { MBTI_QUESTIONS } from '@/features/mbti/constants/mbtiData';
import { useMbtiActions, useMbtiStore } from '@/hooks/Mbti/useMbtiStore';

const OPTIONS = [
  { label: '매우 그렇다.', score: 5 },
  { label: '그렇다.', score: 4 },
  { label: '보통이다.', score: 3 },
  { label: '아니다.', score: 2 },
  { label: '매우 아니다.', score: 1 },
];

export const MbtiTest = () => {
  const { testStep } = useMbtiStore();
  const { setAnswer, setTestStep, setStep } = useMbtiActions();

  const question = MBTI_QUESTIONS[testStep];

  const handleAnswer = (score: number) => {
    if (!question) return;

    setAnswer(question.id, score);
    if (testStep < MBTI_QUESTIONS.length - 1) {
      setTestStep(testStep + 1);
    } else {
      setStep('loading');
    }
  };

  const progressPercentage = ((testStep + 1) / MBTI_QUESTIONS.length) * 100;

  return (
    <div className={cn('flex flex-col h-full min-h-screen bg-neutral-0')}>
      <div className="w-full">
        <ProgressBar percentage={progressPercentage} className="w-full h-[1px]" />
      </div>

      <div className="flex flex-col flex-1 px-[20px] mt-[19px]">
        <div className={cn('flex flex-col gap-[12px]')}>
          <Typography style="text-headline-3-18-semi-bold" className={cn('text-neutral-90 whitespace-pre-line')}>
            {question?.title}
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
              className={cn('w-full p-[12px] flex items-center gap-[8px] border border-neutral-10 rounded-[8px]')}
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
