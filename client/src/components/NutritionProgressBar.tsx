import React from 'react';
import { getPercentage } from '@/lib/utils';

interface NutritionProgressBarProps {
  label: string;
  current: number;
  target: number;
  unit?: string;
  color?: string;
  className?: string;
}

const NutritionProgressBar: React.FC<NutritionProgressBarProps> = ({
  label,
  current,
  target,
  unit = '',
  color = 'blue',
  className = ''
}) => {
  // 안전한 값 처리
  const safeCurrent = typeof current === 'number' ? current : 0;
  const safeTarget = typeof target === 'number' ? target : 0;
  
  // 데이터가 유효하지 않은 경우 로딩 상태 표시
  if (typeof current !== 'number' || typeof target !== 'number') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-1">
          <div className="text-sm font-medium">{label}</div>
          <div className="text-sm text-gray-400">정보 없음</div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-2 rounded-full bg-gray-300" style={{ width: '0%' }} />
        </div>
        <div className="text-xs text-gray-400 mt-1 text-right">-</div>
      </div>
    );
  }
  
  const percentage = getPercentage(safeCurrent, safeTarget);
  const isExceeded = safeCurrent > safeTarget;
  const isNearTarget = percentage >= 90 && percentage <= 110;
  
  // Get color class based on status
  const getColorClass = () => {
    if (isExceeded) return 'bg-red-500';
    
    if (isNearTarget) return 'bg-green-500';
    
    switch (color) {
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'purple': return 'bg-purple-500';
      case 'orange': return 'bg-orange-500';
      default: return 'bg-blue-500';
    }
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-sm text-gray-500">
          {safeCurrent.toFixed(0)}{unit} / {safeTarget.toFixed(0)}{unit}
        </div>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-2 rounded-full ${getColorClass()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1 text-right">
        {percentage.toFixed(0)}%
      </div>
    </div>
  );
};

export default NutritionProgressBar;