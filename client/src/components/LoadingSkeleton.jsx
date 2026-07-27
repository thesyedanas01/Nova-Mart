const LoadingSkeleton = ({ count = 8 }) => {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="glass-card product-card" key={i}>
          <div className="skeleton skeleton--rect"></div>
          <div className="product-card__body">
            <div className="skeleton skeleton--text" style={{ marginBottom: '8px' }}></div>
            <div className="skeleton skeleton--price" style={{ marginBottom: '6px' }}></div>
            <div className="skeleton skeleton--text-sm"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
