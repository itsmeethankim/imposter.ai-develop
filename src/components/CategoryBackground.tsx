import { Category } from '../App';

type CategoryBackgroundProps = {
  category?: Category;
  categoryName?: string;
  className?: string;
};

export function CategoryBackground({ category, categoryName, className = '' }: CategoryBackgroundProps) {
  const getCategoryPattern = (categoryId: string) => {
    // Minimal grey particles for all categories
    return (
      <div className={`absolute inset-0 opacity-15 overflow-hidden ${className}`}>
        <div className="absolute top-2 left-2 w-4 h-4 bg-[#1A1A1A] rounded-full blur-sm animate-float-slow"></div>
        <div className="absolute top-8 right-4 w-3 h-3 bg-[#2D2D2D] rounded-full blur-sm animate-float-medium" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-4 left-6 w-3 h-3 bg-[#404040] rounded-full blur-sm animate-float-slower" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-8 right-2 w-2 h-2 bg-[#525252] rounded-full blur-sm animate-float-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>
    );
  };

  const identifier = category?.id || categoryName || '';
  return getCategoryPattern(identifier.toLowerCase());
}
