import { Typography } from '@/components';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* 메인 타이틀 */}
        <Typography
          variant="title-1"
          weight="bold"
          color="title"
          className="text-center"
        >
          Valuedi
        </Typography>

        {/* 서브 타이틀 */}
        <Typography
          variant="headline-1"
          weight="medium"
          color="title"
          className="text-center"
        >
          디자인 시스템이 적용된 메인페이지
        </Typography>

        {/* 본문 */}
        <div className="space-y-4">
          <Typography variant="body-1" weight="regular" color="body">
            이 페이지는 디자인 시스템의 타이포그래피와 색상을 사용하고 있습니다.
          </Typography>
          
          <Typography variant="body-1" weight="regular" color="body">
            Typography 컴포넌트를 통해 일관된 스타일을 유지하며, Tailwind 유틸리티 클래스를
            조합하여 유연하게 레이아웃을 구성할 수 있습니다.
          </Typography>
        </div>

        {/* 예시 섹션 */}
        <div className="mt-12 space-y-6">
          <Typography variant="title-3" weight="bold" color="title">
            타이포그래피 예시
          </Typography>

          <div className="space-y-3">
            <Typography variant="title-2" weight="bold" color="title">
              Title 2 (28px, Bold)
            </Typography>
            <Typography variant="headline-2" weight="medium" color="title">
              Headline 2 (20px, Medium)
            </Typography>
            <Typography variant="body-1" weight="regular" color="body">
              Body 1 (16px, Regular) - 본문 텍스트에 사용됩니다.
            </Typography>
            <Typography variant="body-2" weight="regular" color="body">
              Body 2 (14px, Regular) - 작은 본문 텍스트에 사용됩니다.
            </Typography>
            <Typography variant="caption-1" weight="medium" color="sub-body">
              Caption 1 (12px, Medium) - 캡션이나 부가 정보에 사용됩니다.
            </Typography>
          </div>
        </div>

        {/* 색상 예시 */}
        <div className="mt-12 space-y-6">
          <Typography variant="title-3" weight="bold" color="title">
            색상 예시
          </Typography>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary p-4 rounded-lg">
              <Typography variant="body-2" weight="medium" className="text-neutral-90">
                Primary
              </Typography>
            </div>
            <div className="bg-primary-strong p-4 rounded-lg">
              <Typography variant="body-2" weight="medium" className="text-white">
                Primary Strong
              </Typography>
            </div>
            <div className="bg-primary-light p-4 rounded-lg">
              <Typography variant="body-2" weight="medium" className="text-neutral-90">
                Primary Light
              </Typography>
            </div>
            <div className="bg-atomic-blue-50 p-4 rounded-lg">
              <Typography variant="body-2" weight="medium" className="text-atomic-blue-90">
                Atomic Blue
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

