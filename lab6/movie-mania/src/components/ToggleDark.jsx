export const ToggleDark = ({ isChecked, setIsChecked }) => {
  const handleChange = (event) => {
    if (event.target.checked) {
      document.documentElement.classList.add('dark-theme');
      setIsChecked(true);
    } else {
      document.documentElement.classList.remove('dark-theme');
      setIsChecked(false);
    }
    localStorage.setItem('darkMode', isChecked ? 'disabled' : 'enabled');
  };
  
  return (
    <div className="toggle-container mt-10 ml-5">
      <label className="inline-flex items-center mb-5 cursor-pointer">
        <input type="checkbox" value="" id="check" className="sr-only peer" onChange={handleChange} checked={isChecked} />
        <div className="relative ml-1 w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        {
          isChecked ? (
            <span className="ml-3 ms-3 text-sm font-bold text-amber-100">Dark Mode</span>
          ) : (
            <span className="ml-3 ms-3 text-sm font-bold text-gray-600">Dark Mode</span>
          )
        }
      </label>
    </div>
  );
};