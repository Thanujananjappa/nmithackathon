const FormInput = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  className = '',
  icon: Icon,
  ...props 
}) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200
          ${Icon ? 'pl-10' : ''}
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default FormInput;