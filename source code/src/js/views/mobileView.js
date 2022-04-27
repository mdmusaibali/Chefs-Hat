class mobileView {
  adjust() {
    document.querySelectorAll('.toRemove').forEach(el => (el.textContent = ''));

    const btn = document.querySelector('.bottom-wrapper');

    btn.addEventListener('click', function (e) {
      const target = e.target.closest('.bottom-wrapper--menu');
      if (!target) return;
      document
        .querySelectorAll('.bottom-wrapper--menu')
        .forEach(el => el.classList.toggle('hidden'));
      document.querySelector('.search-results').classList.toggle('transform');
    });

    document
      .querySelectorAll('.header__logo')
      .forEach(el => el.classList.toggle('hide'));

    document.querySelector('.search-results').classList.add('transform');
  }
}
export default new mobileView();
