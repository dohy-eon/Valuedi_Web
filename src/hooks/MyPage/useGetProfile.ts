import { MY_TROPHIES, TROPHY_GUIDE } from '@/features/mypage/constants/trophy';
import { useGetMbtiTestResult } from '@/hooks/Mbti/useGetMbtiTestResult';

export const useGetProfile = () => {
  const mbtiResult = useGetMbtiTestResult(); 
  const userName = "김휘주";
  return {
    userName,
    mbtiResult: mbtiResult?.data, 
    scores: mbtiResult.scores,
    myTrophies: MY_TROPHIES,
    trophyGuide: TROPHY_GUIDE,
  };
};