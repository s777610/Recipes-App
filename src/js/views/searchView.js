import { elements } from './base';

export const getInput = () => elements.searchInput.value; // pizza 

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
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

export const renderResults = recipes => { // recipes is array 
    recipes.forEach(renderRecipe); // loop through each recipe and call renderRecipe on each of them
};