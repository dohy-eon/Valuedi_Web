import { useQuery } from '@tanstack/react-query';
import { getFinanceMbtiResultApi, getMbtiTypeDetails } from '@/features/mbti/mbti.api';
import DefaultIcon from '@/assets/icons/Mbti.svg?react';
import { MBTI_LOCAL_EXTENSIONS } from '@/features/mbti/constants/mbtiType';

export const useGetMbtiTestResult = () => {
  return useQuery({
    queryKey: ['mbtiResult'],
    queryFn: async () => {
      const [myRes, typesRes] = await Promise.all([getFinanceMbtiResultApi(), getMbtiTypeDetails()]);

      if (!myRes.result || !typesRes.result) throw new Error('데이터 로드 실패');

      const myData = myRes.result;
      const serverDetail = typesRes.result.find((t) => t.type === myData.resultType);

      const localExtension = MBTI_LOCAL_EXTENSIONS[myData.resultType] || {
        icon: DefaultIcon,
        extraDescription: '',
      };

      return {
        ...myData, // 내 점수 (anxietyScore 등)
        ...serverDetail, // 서버의 유형 설명 (title, tagline 등)
        ...localExtension, // 내가 직접 만든 아이콘과 추가 설명
      };
    },
  });
};
