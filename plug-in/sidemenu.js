(() => {
  const container = document.getElementById('sideMenuPluginContainer');
  if (!container) return;

  const logoText = container.getAttribute('data-logo') || 'Logo';
  let menuItems = [];
  try {
    menuItems = JSON.parse(container.getAttribute('data-menu-items'));
  } catch {
    menuItems = [];
  }

  const topBar = document.createElement('div');
  topBar.className = 'top-bar';

  const menuButton = document.createElement('button');
  menuButton.className = 'menu-button';
  menuButton.setAttribute('aria-label', 'Toggle menu');
  menuButton.textContent = '☰';

  const logo = document.createElement('div');
  logo.className = 'logo';
  logo.textContent = logoText;

  const themeButton = document.createElement('button');
  themeButton.className = 'theme-toggle-button';
  themeButton.textContent = '🌗';
  themeButton.style.marginLeft = 'auto';
  themeButton.setAttribute('aria-label', 'Toggle theme');

  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('red-theme');
    const isRed = document.body.classList.contains('red-theme');
    localStorage.setItem('theme', isRed ? 'red' : 'blue');
  });

  topBar.appendChild(menuButton);
  topBar.appendChild(logo);
  topBar.appendChild(themeButton);

  const sideMenu = document.createElement('nav');
  sideMenu.className = 'side-menu';
  sideMenu.id = 'sideMenu';

  menuItems.forEach(item => {
    const a = document.createElement('a');
    a.href = item.href || '#';
    a.textContent = item.text || 'Menu Item';
    sideMenu.appendChild(a);
  });

  container.appendChild(topBar);
  container.appendChild(sideMenu);

  menuButton.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
  });

  document.addEventListener('click', (event) => {
    const clickedInsideMenu = sideMenu.contains(event.target);
    const clickedOnButton = menuButton.contains(event.target) || themeButton.contains(event.target);
    if (!clickedInsideMenu && !clickedOnButton) {
      sideMenu.classList.remove('open');
    }
  });

  window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'red') {
      document.body.classList.add('red-theme');
    }
  });
})();
