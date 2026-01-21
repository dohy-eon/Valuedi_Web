import BackPageIcon from '@/assets/icons/BackPage.svg';

interface GoalCreateStepHeaderProps {
  currentStep: number;
  onBack: () => void;
}

const GoalCreateStepHeader = ({ currentStep, onBack }: GoalCreateStepHeaderProps) => {
  return (
    <header className="flex items-center w-full h-[50px] px-[20px] bg-white flex-shrink-0 border-b border-neutral-20">
      <button type="button" onClick={onBack} className="flex items-center justify-center cursor-pointer w-[24px]">
        <img src={BackPageIcon} alt="뒤로가기" />
      </button>
      {currentStep > 1 && <div className="absolute left-[44px] top-[50px] w-[24px] h-[2px] bg-primary-normal" />}
    </header>
  );
};

export default GoalCreateStepHeader;

