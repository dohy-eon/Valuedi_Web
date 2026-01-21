import GoalLinkedAccountHeader from './detail/GoalLinkedAccountHeader';
import GoalProgressGauge from './detail/GoalProgressGauge';
import GoalSummaryCard from './detail/GoalSummaryCard';

type Goal = {
  bankIcon: string;
  progress: number;
  title: string;
  targetAmount: number;
  remainingDays: number;
};

interface GoalSummaryProps {
  goal: Goal;
}

const TotalSection = ({ goal }: GoalSummaryProps) => (
  <>
    <GoalLinkedAccountHeader bankIcon={goal.bankIcon} />
    <GoalProgressGauge progress={goal.progress} />
    <GoalSummaryCard title={goal.title} targetAmount={goal.targetAmount} remainingDays={goal.remainingDays} />
  </>
);

export default TotalSection;
