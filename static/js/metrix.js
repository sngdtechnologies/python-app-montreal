window.onload = (function(){ 
    let modalElement = null;

    var METRIX = {
        elems:[],
        val: function () {
            return this.elems;
        },
        
        /*-------------------------------------------- */
        /*-----------------Constructor---------------- */
        /*-------------------------------------------- */
        _: function(name){
            var tempElems = null; // tableau temporaire pour sauvegarder les éléments trouvés
            this.elems = [];
            if(typeof name === 'string'){ 
                tempElems = document.querySelectorAll(name);
            } else if (name.nodeType === Node.ELEMENT_NODE) {
                this.elems = name;
                return this;
            }
            if (tempElems.length > 1) {
                this.elems = tempElems;
            } else if (tempElems.length = 1) {
                this.elems = document.querySelector(name);
            }
            return this; // Renvoie this dans l'ordre d'appel
        }, 

        /*-------------------------------------------- */
        /*-------------------AddClass----------------- */
        /*-------------------------------------------- */
        addClass:function(name){
            this.elems.classList.add(name); // C'est ici qu'on ajoute la nouvelle classe
            return this; // Renvoie this dans l'ordre d'appel
        },

        /*-------------------------------------------- */
        /*--------------------parent------------------ */
        /*-------------------------------------------- */
        parent:function(){
            this.elems = this.elems.parentNode;
            return this;
        },

        /*-------------------------------------------- */
        /*-----------------textContent---------------- */
        /*-------------------------------------------- */
        textContent:function(){
            this.elems = this.elems.textContent;
            return this;
        },

        /*-------------------------------------------- */
        /*-----------------toggle---------------- */
        /*-------------------------------------------- */
        toggle:function(name){
            return this.elems.classList.toggle(name);
        },

        /*-------------------------------------------- */
        /*-------------------removeClass----------------- */
        /*-------------------------------------------- */
        removeClass:function(name){
            this.elems.classList.remove(name); // C'est ici qu'on ajoute la nouvelle classe
            return this; // Renvoie this dans l'ordre d'appel
        },

        /*-------------------------------------------- */
        /*-------------------children----------------- */
        /*-------------------------------------------- */
        //n = '.class' ? 'div' ? null
        children:function(n = null) {
            if (n == null) {
                this.elems = this.elems.children;
            } else if (n.match(/^\..+/)) {
                this.elems = this.findChildByClass(n);
            } else if (n.match(/^#.+/)) {
                this.elems = this.findChildById(n);
            } else {
                this.elems = this.findChild(n);
            }
            return this;
        },

        /*-------------------------------------------- */
        /*-----------------findElement---------------- */
        /*-------------------------------------------- */
        //n = '.class' ? 'div' ? null
        findElement:function(...arr) {
            let final = null;
            for (const e of arr) {
                this.children(e);
            }
            return this;
        },

        /*-------------------------------------------- */
        /*------------------findChild----------------- */
        /*-------------------------------------------- */
        findChild:function(name) {
            for (const child of this.elems.children) {
                if (child.localName === name) return child;
            }
            return null;
        },

        /*-------------------------------------------- */
        /*--------------findChildByClass-------------- */
        /*-------------------------------------------- */
        findChildByClass:function(name) {
            for (const child of this.elems.children) {
                for (const c of child.classList) {
                    if (c === name.replace('.', '')) return child;
                }
            }
            return null;
        },

        /*-------------------------------------------- */
        /*--------------findChildByClass-------------- */
        /*-------------------------------------------- */
        findChildById:function(name) {
            for (const child of this.elems.children) {
                if (child.id === name.replace('#', '')) return child;
            }
            return null;
        },

        /*-------------------------------------------- */
        /*--------------findClass-------------- */
        /*-------------------------------------------- */
        findClass:function(name) {
            for (const c of this.elems.classList) {
                if (c === name) return true;
            }
            return false;
        },
                  
        /*-------------------------------------------- */
        /*----------------------on-------------------- */
        /*-------------------------------------------- */
        on: function(action, callback){
            this.elems.addEventListener(action, callback);
        },
                     
        /*-------------------------------------------- */
        /*-----------------appendText----------------- */
        /*-------------------------------------------- */
        appendText:function(text){
            text = document.createTextNode(text); // Crée un nouveau noeud texte avec la chaine fournie
            this.elems.appendChild(text); // Ajoute le texte à l'élément
            return this; // Renvoie this dans l'ordre d'appel
        },

        /*-------------------------------------------- */
        /*------------------appendNode---------------- */
        /*-------------------------------------------- */
        appendNode:function(node, parent, ...attr){
            node = document.createElement(node);
            attr.forEach((e) => {
                (e.class) ? node.setAttribute('class', e.class) : null;
                (e.id) ? node.setAttribute('id', e.id) : null;
                (e.href) ? href.setAttribute('href', e.href) : null;
                (e.name) ? name.setAttribute('name', e.name) : null;
                (e.value) ? value.setAttribute('value', e.value) : null;
            });
            parent.appendChild(node); // Ajoute le texte à l'élément
            return this; // Renvoie this dans l'ordre d'appel
        },

        /*-------------------------------------------- */
        /*--------------appendNodeBefore-------------- */
        /*-------------------------------------------- */
        appendNodeBefore:function(node, parent, before, ...attr){
            node = document.createElement(node);
            attr.forEach((e) => {
                (e.class) ? node.setAttribute('class', e.class) : null;
                (e.id) ? node.setAttribute('id', e.id) : null;
                (e.href) ? href.setAttribute('href', e.href) : null;
                (e.name) ? name.setAttribute('name', e.name) : null;
                (e.value) ? value.setAttribute('value', e.value) : null;
               
            });
            parent.insertBefore(node, before);
            return this; // Renvoie this dans l'ordre d'appel
        },
                
        /*-------------------------------------------- */
        /*-----------------toggleHide----------------- */
        /*-------------------------------------------- */
        toggleHide:function(){
            for(var i = 0; i < this.elems.length; i++){
                this.elems[i].style['display'] = (this.elems[i].style['display']==='none' || '') ?'block':'none'; 
                // Vérifie le statut de l'élément pour savoir s’il peut être affiché ou masqué
            }
            return this; // Renvoie this dans l'ordre d'appel
        },   

        /*-------------------------------------------- */
        /*---------------------each------------------- */
        /*-------------------------------------------- */
        each: function(call){
            this.elems.forEach(call);
            return this;
        },

        /*-------------------------------------------- */
        /*--------------------modal------------------- */
        /*-------------------------------------------- */
        modal: function(){
            let modalTarged = document.querySelectorAll(".modal__targed");
            modalTarged.forEach((mt) => {
                mt.addEventListener("click", (e) => {
                    modalElement = mt;
                    showModal();
                    cover(true);
                });
            });
        },
        
        /*-------------------------------------------- */
        /*--------------------then-------------------- */
        /*-------------------------------------------- */
        then: function(then){
            return then.call;
        },

        /*-------------------------------------------- */
        /*-----------------compareText---------------- */
        /*-------------------------------------------- */
        compareText: function(text){
            if (this.elems.textContent === text) return true;
            return false;
        },

        /*-------------------------------------------- */
        /*-----------------compareText---------------- */
        /*-------------------------------------------- */
        changeText: function(text){
            this.elems.textContent = text;
            return this;
        },
    }
    
    function f_closeModal () {
        hideModal();
        cover(false);
    }

    // function closeModal() {
    //     let closeModal = document.querySelector('.modal__close');
    //     closeModal.addEventListener('click', (e) => {
    //         f_closeModal();
    //     });
    // };

    function getModal(obj) {
        let result = null;
        if (obj != null) {
            let modalKey = obj.classList[1];
            result = document.querySelector(".modal." + modalKey);    
        }
        return result;
    }

    function hideModal() {
        let r = getModal(modalElement);
        if (r != null) {
            r.classList.remove("show");
        }
    }

    function showModal() {
        let r = getModal(modalElement);
        if (r != null) {
            r.classList.add("show");
        }
    }

    function cover(v) {
        let c = document.querySelector('.nav-cover');
        if (v == true) {
            c.classList.remove("d-none");
        } else {
            c.classList.add("d-none");
        }
    }

    document.addEventListener("click", function(event) {
        if (event.target.closest("modal") === null && event.target !== modalElement) {
            f_closeModal();
        }
    });
    
    if(!window.MX){window.MX=METRIX;} //Nous créons un raccourci pour notre framework, nous pouvons appeler les méthodes par $$.method ();    

    MX.modal();
    MX.appendNodeBefore('div', document.body, document.body.firstChild, {'class': 'nav-cover d-none'});
})();