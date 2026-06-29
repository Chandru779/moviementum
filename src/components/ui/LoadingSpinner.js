const LoadingSpinner = ({ fullScreen = true, className = "" }) => (
  <div
    className={`flex items-center justify-center ${
      fullScreen ? "min-h-[50vh] w-full" : ""
    } ${className}`}
  >
    <div className="relative w-14 h-14">
      <div className="absolute inset-0 rounded-full border-2 border-stream-border" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-stream-accent animate-spin" />
    </div>
  </div>
);

export default LoadingSpinner;
