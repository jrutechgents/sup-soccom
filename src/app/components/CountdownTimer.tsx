import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';

interface CountdownTimerProps {
  targetDate: Date;
  title: string;
}

export function CountdownTimer({ targetDate, title }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <CardContent className="pt-6">
        <h3 className="text-center font-semibold mb-4">{title}</h3>
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          <div className="text-center">
            <div className="bg-background rounded-lg p-2 md:p-4 shadow-sm">
              <div className="text-2xl md:text-4xl font-bold text-primary">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Days</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-background rounded-lg p-2 md:p-4 shadow-sm">
              <div className="text-2xl md:text-4xl font-bold text-primary">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Hours</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-background rounded-lg p-2 md:p-4 shadow-sm">
              <div className="text-2xl md:text-4xl font-bold text-primary">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Mins</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-background rounded-lg p-2 md:p-4 shadow-sm">
              <div className="text-2xl md:text-4xl font-bold text-primary">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Secs</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
