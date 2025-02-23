import mir from '../img/mir.png';
import visa from '../img/visa.png';
import mastercard from '../img/mastercard.png';
import americanexpress from '../img/americanexpress.png';
import discover from '../img/discover.png';
import jcb from '../img/jcb.png';
import dinersclub from '../img/dinersclub.png';

import isValidLuhn from "./validators";
import creditCardIssuer from "./creditcardissuer";

export default class CardFormWidget {
    constructor(parentEl) {
        this.parentEl = parentEl;

        this.onSubmit = this.onSubmit.bind(this);
    }

    static get markup() {
        return `
		<h1> Check your credit card number </h1>
        <div class="cards">    
			<img src="${mir}" alt="Mir" class="card mir">       
			<img src="${visa}" alt="Visa" class="card visa">
			<img src="${mastercard}" alt="Mastercard" class="card mastercard">
			<img src="${americanexpress}" alt="American Express" class="card americanexpress">
			<img src="${discover}" alt="Discover" class="card discover">
			<img src="${jcb}" alt="JCB" class="card jcb">
			<img src="${dinersclub}" alt="Diners Club" class="card dinersclub">
		</div>		
        <form class="card-form-widget">
            <div class="control">
                
                <input type="text" id="card-input" class="input" placeholder="Credit card number">
            </div>
            <button class="submit">Click to Validate</button>
        </form>
        `;
    }

    static get submitSelector() {
        return '.submit';
    }

    static get inputSelector() {
        return '.input';
    }

    static get selector() {
        return '.card-form-widget';
    }

    bindToDOM() {
        this.parentEl.innerHTML = CardFormWidget.markup;

        this.element = this.parentEl.querySelector(CardFormWidget.selector);
        this.submit = this.element.querySelector(CardFormWidget.submitSelector);
        this.input = this.element.querySelector(CardFormWidget.inputSelector);

        this.element.addEventListener('submit', this.onSubmit);
    }

    onSubmit(e) {
        e.preventDefault();

        const value = this.input.value;
		
		const issuer = creditCardIssuer(value);
		
		const cards = document.querySelectorAll('.card');
		cards.forEach((card) => card.classList.remove('active-card'));
		if (issuer != '') {
			const activeCard = document.querySelector(`.${issuer}`);
			activeCard.classList.add('active-card');
		}

        if(isValidLuhn(value)) {
            this.input.classList.add('valid');
            this.input.classList.remove('invalid');
        } else {
            this.input.classList.add('invalid');
            this.input.classList.remove('valid');
        }
    }
}