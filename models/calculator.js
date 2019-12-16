module.exports = class PriceCalculator {
    constructor(pizzaSize, toppings, quantity){
        this.pizzaSize = parseInt(pizzaSize);
        this.toppings = toppings;
        this.quantity = quantity;
    }

    subtotal(){
        return (this.pizzaSize+ this.toppings*2)*this.quantity;
    }

    tax(){
        return ((this.pizzaSize+ this.toppings*2)*this.quantity)*0.05;
    }

    total(){
        return ((this.pizzaSize+ this.toppings*2)*this.quantity)*1.05;
    }
}