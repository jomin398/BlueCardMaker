import draggableDiv from './draggableDiv/index.js';
import Rubify from './rubify/js/index.js';
function genHex() {
    var array = new Uint32Array(2);
    let n = parseInt(window.crypto.getRandomValues(array), 16);
    return parseInt(n.toString().slice(0, 11)).toString(16).toUpperCase();
}
function apply(j) {
    if (!j.id) j.id = genHex();
    console.log(j)
}
/**
 * 
 * @param {String} s 
 * @returns {HTMLElement} 
 */
const elmSelter = (s) => document.querySelector(s);
class card1 {
    constructor() {
        elmSelter('form#edit .loc select').onchange = v => {
            document.querySelector('form#edit .loc img').src = `./logos/${v.target.value == "Extra" ? "Schale" : v.target.value}.png`;
        }
        elmSelter('form#edit input[type="text"][name="name"]').onchange = v => {
            document.querySelector('form#edit ruby.name.pre').innerHTML = new Rubify().complexConv(v.target.value);
        }
        elmSelter('.editForm a.modal-close').onclick = () => {
            let d = new FormData(document.querySelector('form#edit'));
            const value = Object.fromEntries(d.entries());
            apply(value)
        }
    }
};
class card2 {
    constructor() {
        this.d = null;
        this.i();
        let rsBtn = document.createElement('button');
        rsBtn.innerText = 'Reset';
        rsBtn.onclick = () => this.r();
        elmSelter(this.#selfElq).insertAdjacentElement('beforebegin', rsBtn);
    }
    #selfElq = 'section#modal-options_sig #edit .card';
    #rseTmp = `<div class="sigCon">
    <img class="sigtopIcon show" src="./icons/topbox.svg" alt="">
    <img class="shicon show" src="./icons/shaleIcon.png" alt="">
    <div class="sigc show ready">
        <span>Signature</span>
        <img class="sigbk" src="./icons/sigBk.svg" alt="">
        <canvas id="signature-pad"></canvas>
    </div>
</div>`;
    //init
    i() {
        let coverInit = document.createElement('div');
        coverInit.className = 'edit cover';
        coverInit.innerText = 'Click to begin Edit.';

        elmSelter(`${this.#selfElq} .sigCon`).insertAdjacentElement('beforeend', coverInit);
        elmSelter(this.#selfElq).onclick = (e) => {
            coverInit.remove();
            e.preventDefault();
            this.d = Array.from(elmSelter(`${this.#selfElq} .sigCon`).children).map(e => {
                e.onclick = (ev) => {
                    ev.preventDefault();
                    console.log('clicked.', ev.target);
                }; //,ev.target
                return new draggableDiv(e);
            });
            elmSelter(this.#selfElq).onclick = '';
        }
    };
    //reset
    r() {
        this.d = null;
        elmSelter(this.#selfElq).innerHTML = this.#rseTmp;
        this.i();
    };
}
window.onload = () => {
    elmSelter('.card.hori.right .mid ruby').innerHTML = new Rubify().complexConv(elmSelter('.card.hori.right .mid ruby').innerHTML);
    new card1();
    new card2();
}


/*
class Blue extends BlueCard {
    constructor(trasScrc, editEnable, elmQstr) {
        super();
        this.init(trasScrc, editEnable, elmQstr)
            .then(() => this.reflash()).then(()=>this.apply())
    }
    change(data){
        this.apply(data);
    }
};
*/