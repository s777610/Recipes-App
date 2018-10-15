import { elements } from './base';

export const getInput = () => elements.searchInput.value; // pizza 

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
};

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => { // reduce has acc method build in
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length // update acc
        }, 0); // acc is 0 first
        // return the result
        return `${newTitle.join(' ')} ...`;
    } 
    return title;
};

const renderRecipe = receipe => {  // private funcation
    const markup = `
        <li>
            <a class="results__link" href="#${receipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${receipe.image_url}" alt="${receipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(receipe.title)}</h4>
                    <p class="results__author">${receipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup) // insert 30 recipes
};

// data attribute data-goto
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span> 
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>            
                
`;

const renderButtons = (page, numResults, resPerPage) => {// 1, 30, 10
    const pages = Math.ceil(numResults / resPerPage); // 3

    let button;
    if (page === 1 && pages >1) {
        //only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // only button to go to prew page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => { // recipes is array, page is a page you wanna go to 
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe); // loop through each recipe and call renderRecipe on each of them

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};