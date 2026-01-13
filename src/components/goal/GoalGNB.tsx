import { useNavigate, useLocation } from 'react-router-dom';
import Hamburger from '@/assets/icons/Hamburger.svg';

const GoalGNB = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCurrentActive = location.pathname.includes('currentgoal') || location.pathname === '/goal';
  const isPastActive = location.pathname.includes('pastgoal');

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between px-5 py-5">
        <h1 className="text-[20px] font-bold text-[#171714]">목표</h1>
        <img src={Hamburger} alt="menu" className="w-6 h-6" />
      </div>

      {/* 탭 메뉴 영역 */}
      <div className="flex w-full border-b border-[#E0E0E0]">
        <button
          onClick={() => navigate('/currentgoal')}
          className={`flex-1 py-4 text-center text-[16px] transition-all ${
            isCurrentActive 
              ? 'font-bold text-[#171714] border-b-2 border-[#171714]' 
              : 'font-medium text-[#999999]'
          }`}
        >
          현재 목표
        </button>
        <button
          onClick={() => navigate('/pastgoal')}
          className={`flex-1 py-4 text-center text-[16px] transition-all ${
            isPastActive 
              ? 'font-bold text-[#171714] border-b-2 border-[#171714]' 
              : 'font-medium text-[#999999]'
          }`}
        >
          지난 목표
        </button>
      </div>
    </div>
  );
};

export default GoalGNB;