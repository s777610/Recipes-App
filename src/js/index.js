import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

/* 
Global state of the app 
Search object
Current recipe object
Shopping list object
Liked recipts
*/ 
const state = {};

const controlSearch = async() => {
    //1 get the query from view
    const query = searchView.getInput();

    if (query) {
        //2 new search object and add to state
        state.search = new Search(query);

        //3 prepare UI for results
        searchView.clearInput();
        searchView.clearResults();

        //4 Search for recipes
        await state.search.getResults(); // return promise

        //5 render results on UI
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); // prevent reload the page
    controlSearch();
});


