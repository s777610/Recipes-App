import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = []; // empty array, the object which has count, unit, ingredient, will be added
    }

    addItem (count, unit, ingredient) {
        const item = { // item object
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        
        // delete 1 item
        this.items.splice(index, 1) // in place, affect original one
    }

    updateCount(id, newCount) {
        // find the item inside items
        this.items.find(el => el.id === id).count = newCount;
    }
}