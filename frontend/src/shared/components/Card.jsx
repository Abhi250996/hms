const Card = ({ title, children, actions, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}
    >
      {title && (
        <div className="mb-3 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {actions && <div>{actions}</div>}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
};

export default Card;