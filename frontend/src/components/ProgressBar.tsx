interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
  height?: string;
}

const ProgressBar = ({ percentage, showLabel = true, height = 'h-2' }: ProgressBarProps) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-semibold text-blue-600">{clampedPercentage}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}>
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
