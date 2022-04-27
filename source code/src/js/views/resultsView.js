import View from './View';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again';
  _message = '';

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
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultsView();
