import { useMemo } from 'react';

interface Job {
  title: string;
  pay_range: string;
  location: string;
}

interface UserAlert {
  title?: string;
  min_pay?: number;
  city?: string;
  job_type?: string;
}

export const useSmartMatchScore = (job: Job | null, userAlerts: UserAlert[] = []) => {
  const matchScore = useMemo(() => {
    if (!job || userAlerts.length === 0) return null;

    const alert = userAlerts[0]; // Use first alert for scoring
    let score = 0;
    let maxScore = 0;
    const matches: string[] = [];

    // Title match (40 points)
    maxScore += 40;
    if (alert.title && job.title.toLowerCase().includes(alert.title.toLowerCase())) {
      score += 40;
      matches.push('title');
    }

    // Pay match (30 points)
    maxScore += 30;
    if (alert.min_pay) {
      const payMatch = job.pay_range.match(/\$(\d+)/);
      if (payMatch && parseInt(payMatch[1]) >= alert.min_pay) {
        score += 30;
        matches.push('pay');
      }
    }

    // Location match (30 points)
    maxScore += 30;
    if (alert.city && job.location.toLowerCase().includes(alert.city.toLowerCase())) {
      score += 30;
      matches.push('location');
    }

    const percentage = Math.round((score / maxScore) * 100);

    let level: 'low' | 'medium' | 'high' = 'low';
    let emoji = '⭐';
    let label = 'Good Match';

    if (percentage >= 80) {
      level = 'high';
      emoji = '🔥';
      label = 'Perfect Match';
    } else if (percentage >= 50) {
      level = 'medium';
      emoji = '⚡';
      label = 'Great Match';
    }

    return {
      percentage,
      level,
      emoji,
      label,
      matches,
      hasMatch: percentage > 0
    };
  }, [job, userAlerts]);

  return matchScore;
};