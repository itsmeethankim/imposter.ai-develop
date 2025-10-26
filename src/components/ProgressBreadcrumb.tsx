import { ChevronRight } from 'lucide-react';

type ProgressStep = {
  label: string;
  isActive: boolean;
  isComplete: boolean;
};

type ProgressBreadcrumbProps = {
  steps: ProgressStep[];
};

export function ProgressBreadcrumb({ steps }: ProgressBreadcrumbProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-3">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center gap-2">
          <span
            className={`text-sm transition-colors ${
              step.isActive
                ? 'text-[#1A1A1A] dark:text-white font-medium'
                : step.isComplete
                ? 'text-[#666666] dark:text-[#999999]'
                : 'text-[#B0B0B0] dark:text-[#666666]'
            }`}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <ChevronRight
              className={`w-3.5 h-3.5 transition-colors ${
                step.isComplete
                  ? 'text-[#B0B0B0] dark:text-[#666666]'
                  : 'text-[#E5E5E5] dark:text-[#333333]'
              }`}
              strokeWidth={2}
            />
          )}
        </div>
      ))}
    </div>
  );
}
