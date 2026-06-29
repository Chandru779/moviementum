const LoadingSpinner = ({ className = "w-1/6 m-auto" }) => (
  <div className="w-full h-full flex items-center justify-center">
    <img className={className} src="/projects/loader.svg" alt="Loading" />
  </div>
);

export default LoadingSpinner;
