import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
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

    if (id) {
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

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
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        } catch (err) {
            alert('Error processing recipe!');
        }

        

    }

};


// window.addEventListener('hashchange', controlRecipe); // whenever hash of URL is changed, controlRecipe will be called
// wondow.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// List Control
const controlList = () => {
    // create new list if there is no list
    if (!state.list) state.list = new List();

    // add each ingredient to list and UI
    state.recipe.ingredients.forEach(el => { // el is objIng object
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
    
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete from state
        state.list.deleteItem(id);

        // delete from UI
        listView.deleteItem(id);
    // update count
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});



// Like controller
const controlLike = () => {
    if (!state.likes) state.likes = new Likes(); // if no likes object, create one
    const currentID = state.recipe.id; // id of recipe

    if (!state.likes.isLiked(currentID)) { // not like
        // add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img,
        );
        // toggle the like button
        likesView.toggleLikeBtn(true)
        //add like to UI list
        likesView.renderLike(newLike);

    } else { // is like
        // remove like from the state
        state.likes.deleteLike(currentID);
        // toggle the like button
        likesView.toggleLikeBtn(false)
        //remove like from UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

//Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    // restore likes from localStorage
    state.likes.readStorage();

    // toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});


// handing recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, btn-decrease *')) { // just match .btn-decrease or .btn-decrease's child
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec'); // update the state.recipe object
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.updateServings('inc');  // update the state.recipe object
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // List controller 
        controlLike();
    }
});



