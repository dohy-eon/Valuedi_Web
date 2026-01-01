import MbtiCard from '@/components/mbti/MbtiCard';
import ProgressBar from '@/components/bar/ProgressBar';
import MbtiIcon from '../assets/icons/Mbti.svg?react';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-start justify-center gap-[40px] p-10">
      {/* 1. MBTI Card Preview Section */}
      <section className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-bold text-gray-500">MBTI Card</h2>
        <MbtiCard
          mbtiType="불안한 안정자산 추구형"
          subTitle="금융은 아직 낯설지만, 손해 보고 싶지는 않아요."
          description="위험은 싫지만 목표 달성 의지가 강함, 계획보다는 순간의 충동 소비를 조절하려 노력해요"
          icon={MbtiIcon}
        />
      </section>

      {/* 2. ProgressBar Preview Section */}
      <section className="flex flex-col items-center gap-4 w-full max-w-[400px]">
        <h2 className="text-lg font-bold text-gray-500">ProgressBar</h2>

        <div className="w-full flex flex-col gap-6 p-8 bg-white rounded-[20px] shadow-sm">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-500">0%</span>
            <ProgressBar percentage={0} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-500">15%</span>
            <ProgressBar percentage={15} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-500">20%</span>
            <ProgressBar percentage={20} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-500">50%</span>
            <ProgressBar percentage={50} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-500">75%</span>
            <ProgressBar percentage={75} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-500">100%</span>
            <ProgressBar percentage={100} />
          </div>
        </div>
      </section>
    </div>
  );
};
