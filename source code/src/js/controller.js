import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import mobileView from './views/mobileView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //0 update results view to mark selected result
    resultsView.update(model.getSearchResultsPage());
    //3) updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    //1)loading recipe or adding recipe to state object (model.js)
    await model.loadRecipe(id);

    //2)rendering the recipe (view.js)
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results or adding query result to state object (model.js)
    await model.loadSearchResults(query);

    //3) Render results (view.js)
    resultsView.render(model.getSearchResultsPage(1));

    //4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1) Render NEW results (view.js)
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2) Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in state)
  model.updateServings(newServings);

  //updating recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1) add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //2) update recipe view
  recipeView.update(model.state.recipe);
  //3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Rendering recipe in recipe view
    recipeView.render(model.state.recipe);

    //Success mesage
    addRecipeView.renderMessage();

    //Render Bookmark view
    bookmarksView.render(model.state.bookmarks);

    //Chnage id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      console.log('executing');
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  if (window.innerWidth < 768) {
    resultsView.addHandlerCloseMenu();
    mobileView.adjust();
  }
};
init();
