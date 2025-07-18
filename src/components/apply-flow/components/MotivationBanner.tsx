import React, { useState, useEffect } from 'react';
import { CheckCircle, TrendingUp, Users, Gift } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MotivationBannerProps {
  step: number;
}

const MotivationBanner = ({ step }: MotivationBannerProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const motivationData = {
    1: {
      icon: <Users className="h-5 w-5" />,
      message: "87% of people who complete this step get a call 📞",
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      textColor: "text-blue-800 dark:text-blue-200"
    },
    2: {
      icon: <TrendingUp className="h-5 w-5" />,
      message: "✅ 87% who finish this step get contacted",
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      textColor: "text-blue-800 dark:text-blue-200"
    },
    3: {
      icon: <TrendingUp className="h-5 w-5" />,
      message: "📄 Uploading a resume 3x your chances",
      color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      textColor: "text-green-800 dark:text-green-200"
    },
    4: {
      icon: <Gift className="h-5 w-5" />,
      message: "⚡ Referrals = Priority Review",
      color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
      textColor: "text-purple-800 dark:text-purple-200"
    }
  };

  const currentMotivation = motivationData[step as keyof typeof motivationData];

  useEffect(() => {
    if (step > 1) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Add confetti animation at steps 3 and 5
  const showExtraConfetti = step === 3 || step === 5;

  if (!currentMotivation) return null;

  return (
    <Card className={`mb-6 p-4 border ${currentMotivation.color} animate-fade-in ${showExtraConfetti ? 'animate-pulse' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`${currentMotivation.textColor} flex-shrink-0`}>
          {currentMotivation.icon}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${currentMotivation.textColor}`}>
            {currentMotivation.message}
          </p>
        </div>
        {(showConfetti || showExtraConfetti) && (
          <div className="flex gap-1">
            <span className="animate-bounce text-lg">🎉</span>
            {showExtraConfetti && <span className="animate-bounce delay-100 text-lg">✨</span>}
            {showExtraConfetti && <span className="animate-bounce delay-200 text-lg">🎊</span>}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MotivationBanner;