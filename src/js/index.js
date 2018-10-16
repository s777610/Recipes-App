import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/* 
Global state of the app 
Search object, including 30 result
Current recipe object
Shopping list object
Liked recipts
*/ 
const state = {};




// Search Control
const controlSearch = async() => {
    //1 get the query from view
    const query = searchView.getInput(); //pizza

    if (query) {
        //2 new search object and add to state
        state.search = new Search(query);

        //3 prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //4 Search for recipes
            await state.search.getResults(); // return promise

            //5 render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch {
            alert('Something wrong with the search...');
            clearLoader();
        }
        
    }
}

// submit
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); // prevent reload the page
    controlSearch();
});




// click pagination button
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline'); // element where click happen
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10); // 10 is Decimal
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);// goToPage is a number you wanna go to 
    }
});



// Recipe Control
const controlRecipe = async () => {
    // get ID from URL
    const id = window.location.hash.replace('#', ''); // window.location is entire URL
    console.log(id);

    if (id) {
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // create new recipe object
        state.recipe = new Recipe(id);

        try {
            // get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            alert('Error processing recipe!');
        }

        

    }

};


// window.addEventListener('hashchange', controlRecipe); // whenever hash of URL is changed, controlRecipe will be called
// wondow.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));