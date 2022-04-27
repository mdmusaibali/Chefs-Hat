class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      document.querySelector('.search-results').classList.remove('transform');
      document
        .querySelector('.bottom-wrapper--menu-left')
        .classList.remove('hidden');
      document
        .querySelector('.bottom-wrapper--menu-right')
        .classList.add('hidden');
      handler();
    });
  }
}

export default new SearchView();
