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
        this.onmoveFin = null;
        this.spos = {
            x: 0,
            y: 0
        }
    }
    #savPos(x, y) { }
    #addEL() {
        if (!this.isNotMob) {
            this.removeMoveEv = () => {
                this.ele.ontouchmove = null;
                this.ele.ontouchend = null;
            }
            this.ele.ontouchmove = e => {
                // grab the location of touch
                var tloc = e.targetTouches[0];
                var bb = e.target.getBoundingClientRect();
                // assign box new coordinates based on the touch.
                let x = tloc.pageX - bb.x;
                let y = tloc.pageY - bb.y;
                this.ele.style.left = `${x}px`;
                this.ele.style.top = `${y}px`;
                this.spos.x = x;
                this.spos.y = y;
            };
            this.ele.ontouchend = e => {
                // current box position.
                // var x = parseInt(this.ele.style.left);
                // var y = parseInt(this.ele.style.top);
                if (this.onmoveFin) this.onmoveFin(e, this);
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
        this.ele.onmouseup = (e) => this.#closeDragElement(e);
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
        let x = this.ele.offsetTop - this.pos2;
        let y = this.ele.offsetLeft - this.pos1;
        this.ele.style.top = x + "px";
        this.ele.style.left = y + "px";
        this.spos.x = x;
        this.spos.y = y;
    }
    #closeDragElement(e) {
        if (this.onmoveFin) this.onmoveFin(e, this);
        /* stop moving when mouse button is released:*/
        this.ele.onmouseup = null;
        this.ele.onmousemove = null;
    }
    #ckNotMob() {
        const s = window.screen;
        return s.width > 481 && s.height > 768
    }
}