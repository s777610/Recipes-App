import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* 
Global state of the app 
Search object, including 30 result
Current recipe object
Shopping list object
Liked recipts
*/ 
const state = {};

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

        //4 Search for recipes
        await state.search.getResults(); // return promise

        //5 render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
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

