import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;

    }
    async getResults() {
        const proxy = 'http://cors-anywhere.herokuapp.com/'
        const key = '';
        try {
            // axios automatically return json
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes; // array with 30 result
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
        
    }
}


