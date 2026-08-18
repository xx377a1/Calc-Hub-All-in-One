import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = 'w-5 h-5', size }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (LucideIcons as any)[name] || LucideIcons.Calculator;
  return <Component className={className} size={size} />;
};
