/** 
 * @author jomin398
 * @desc Make the DIV element draggagle
 * @example
    window.onload = () => {
        //set element to move
        let d = new draggableDiv(document.getElementById('done'));
        //remove move ablity
        document.querySelector('#done button#pos_ok').onclick = () => {
            d.removeMoveEv();
        }
    }
 */
export default class draggableDiv {
    /**
     * @param {HTMLElement} elmnt
     */
    constructor(elmnt) {
        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;
        this.ele = elmnt;
        this.isNotMob = this.#ckNotMob();
        this.removeMoveEv = null;
        this.#addEL();
    }
    #addEL() {
        if (!this.isNotMob) {
            this.removeMoveEv = () => {
                this.ele.ontouchmove = null;
                this.ele.ontouchend = null;
            }
            this.ele.ontouchmove = e => {
                // grab the location of touch
                var tloc = e.targetTouches[0];

                // assign box new coordinates based on the touch.
                this.ele.style.left = (tloc.pageX - 10) + 'px';
                this.ele.style.top = (tloc.pageY - 10) + 'px';
            };
            this.ele.ontouchend = e => {
                // current box position.
                // var x = parseInt(this.ele.style.left);
                // var y = parseInt(this.ele.style.top);
                console.log(this.ele.classList, this.ele.id)
            }
        } else {
            this.ele.onmousedown = evt => this.#dragMouseDown(evt);
            this.removeMoveEv = () => {
                this.ele.onmousedown = null;
            }
        }
    }
    #dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        //window.getComputedStyle(document.getElementById('draggable-element').parentElement).width
        //console.log(e.clientX)
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        this.ele.onmouseup = () => this.#closeDragElement();
        // call a function whenever the cursor moves:
        this.ele.onmousemove = evt => this.#elementDrag(evt);
    }
    #elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        // set the element's new position:
        this.ele.style.top = (this.ele.offsetTop - this.pos2) + "px";
        this.ele.style.left = (this.ele.offsetLeft - this.pos1) + "px";
    }
    #closeDragElement() {
        /* stop moving when mouse button is released:*/
        this.ele.onmouseup = null;
        this.ele.onmousemove = null;
    }
    #ckNotMob() {
        const s = window.screen;
        return s.width > 481 && s.height > 768
    }
}