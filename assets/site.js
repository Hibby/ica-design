const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width:720px)');

function setMenu(open) {
  nav.hidden = !open;
  menu.setAttribute('aria-expanded', String(open));
}
function updateMenu() {
  setMenu(!mobile.matches);
}
updateMenu();
mobile.addEventListener('change', updateMenu);
menu.addEventListener('click', () => setMenu(nav.hidden));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && !nav.hidden) {
    setMenu(false);
    menu.focus();
  }
});
const search = document.querySelector('.search-page');
if (search) {
  const query = new URLSearchParams(location.search).get('q')?.trim() || '';
  search.elements.q.value = query;
  const terms = query.toLocaleLowerCase().split(/\s+/);
  const results = [...document.querySelectorAll('.results li')];
  for (const result of results) {
    result.hidden = !terms.every(term => result.textContent.toLocaleLowerCase().includes(term));
  }
  const count = results.filter(result => !result.hidden).length;
  document.querySelector('#search-status').textContent = query
    ? count + (count === 1 ? ' result for “' : ' results for “') + query + '”.'
    : 'Browse the pages below or enter a search term.';
}
