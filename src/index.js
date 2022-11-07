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

const elmSelter = (s) => document.querySelector(s);
window.onload = () => {
    elmSelter('.card.hori.right .mid ruby').innerHTML = new Rubify().complexConv(elmSelter('.card.hori.right .mid ruby').innerHTML);
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