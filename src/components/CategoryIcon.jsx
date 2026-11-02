import React from 'react';
import {
  Utensils,
  ShoppingBag,
  Plane,
  GraduationCap,
  Home,
  Film,
  HeartPulse,
  MoreHorizontal,
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  PlusCircle,
  HelpCircle,
  CreditCard,
  DollarSign,
  Wallet
} from 'lucide-react';

const iconMap = {
  Utensils,
  ShoppingBag,
  Plane,
  GraduationCap,
  Home,
  Film,
  HeartPulse,
  MoreHorizontal,
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  PlusCircle,
  HelpCircle,
  CreditCard,
  DollarSign,
  Wallet
};

export const CategoryIcon = ({ iconName, className = 'w-5 h-5' }) => {
  const IconComponent = iconMap[iconName] || HelpCircle;
  return <IconComponent className={className} />;
};
