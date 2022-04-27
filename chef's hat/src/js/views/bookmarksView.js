import View from './View';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerCloseMenu() {
    this._parentElement.addEventListener('click', function (e) {
      const target = e.target.closest('.preview');
      if (!target) return;
      document.querySelector('.search-results').classList.add('transform');
      document
        .querySelectorAll('.bottom-wrapper--menu')
        .forEach(el => el.classList.toggle('hidden'));
    });
  }

  _generateMarkup() {
    return this._data
      .map(bookmarks => previewView.render(bookmarks, false))
      .join('');
  }
}
export default new BookmarksView();
