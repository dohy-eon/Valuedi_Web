import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@/components';
import { cn } from '@/utils/cn';
import ValuediLogo from '@/assets/icons/ValuediLogo.svg?react';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={cn('min-h-screen w-full bg-white flex justify-center items-center')}>
      <div className={cn('w-full max-w-[360px] min-h-screen bg-white relative flex flex-col')}>
        <div className={cn('flex flex-col items-center justify-center min-h-screen w-full relative')}>
          <div
            className={cn(
              'flex flex-col items-center gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px]'
            )}
          >
            <div className={cn('w-[200px] h-[200px] flex items-center justify-center rounded-[7px]')}>
              <ValuediLogo className={cn('w-full h-full')} />
            </div>
          </div>
          <Typography
            style="text-body-2-14-regular"
            className={cn('absolute bottom-[83px] text-center w-[320px] left-1/2 -translate-x-1/2')}
            color="neutral-70"
          >
            똑똑한 금융서비스, 밸류디
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
