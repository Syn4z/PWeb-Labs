export const ToggleDark = ({ isChecked }) => {
  const handleChange = (event) => {
    if (event.target.checked) {
      document.documentElement.style.setProperty('--navbar-bg-color', 'var(--dark-navbar-bg-color)');
      document.documentElement.style.setProperty('--navbar-element-bg', 'var(--dark-navbar-element-bg)');
      document.documentElement.style.setProperty('--navbar-element-border', 'var(--dark-navbar-element-border)');
      document.documentElement.style.setProperty('--navbar-text-color', 'var(--dark-navbar-text-color)');
      document.documentElement.style.setProperty('--background-color', 'var(--dark-background-color)');
      document.documentElement.style.setProperty('--genre-bg-color', 'var(--dark-genre-bg-color)');
      document.documentElement.style.setProperty('--genre-bg-select-color', 'var(--dark-genre-bg-select-color)');
      document.documentElement.style.setProperty('--page-text-color', 'var(--dark-page-text-color)');
      document.documentElement.style.setProperty('--cast-name-color', 'var(--dark-cast-name-color)');
      document.documentElement.style.setProperty('--release-text-color', 'var(--dark-release-text-color)');
      document.documentElement.style.setProperty('--release-bg-color', 'var(--dark-release-bg-color)');
      document.documentElement.style.setProperty('--search-bar-bg1', 'var(--dark-search-bar-bg1)');
      document.documentElement.style.setProperty('--search-bar-bg2', 'var(--dark-search-bar-bg2)');
    } else {
      document.documentElement.style.setProperty('--navbar-bg-color', 'var(--light-navbar-bg-color)');
      document.documentElement.style.setProperty('--navbar-bg-color', 'var(--navbar-bg-color)');
      document.documentElement.style.setProperty('--navbar-element-bg', 'var(--navbar-element-bg)');
      document.documentElement.style.setProperty('--navbar-element-border', 'var(--navbar-element-border)');
      document.documentElement.style.setProperty('--navbar-text-color', 'var(--navbar-text-color)');
      document.documentElement.style.setProperty('--background-color', 'var(--background-color)');
      document.documentElement.style.setProperty('--genre-bg-color', 'var(--genre-bg-color)');
      document.documentElement.style.setProperty('--genre-bg-select-color', 'var(--genre-bg-select-color)');
      document.documentElement.style.setProperty('--page-text-color', 'var(--page-text-color)');
      document.documentElement.style.setProperty('--cast-name-color', 'var(--cast-name-color)');
      document.documentElement.style.setProperty('--release-text-color', 'var(--release-text-color)');
      document.documentElement.style.setProperty('--release-bg-color', 'var(--release-bg-color)');
      document.documentElement.style.setProperty('--search-bar-bg1', 'var(--search-bar-bg1)');
      document.documentElement.style.setProperty('--search-bar-bg2', 'var(--search-bar-bg2)');
    }
  };

  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor="check">Dark Mode</label>
    </div>
  );
};