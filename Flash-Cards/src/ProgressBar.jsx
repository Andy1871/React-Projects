import "./ProgressBar.css";

export default function ProgressBar({
  total,
  currentQuestion,
  progressPercentage,
}) {
  return (
    <div className="progress-container">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        >
          <span className="progress-percent">{progressPercentage}%</span>
        </div>

        {progressPercentage < 100 && (
          <span className="progress-current">
            {currentQuestion + 1} of {total}
          </span>
        )}
      </div>
    </div>
  );
}
