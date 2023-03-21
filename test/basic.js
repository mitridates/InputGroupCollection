import FormCollection from "../src/js/modules/InputGroupCollection.mod.1.0.0.js";

let todolistjform= new FormCollection('.todolist-wrapper-jform');
let todolistjson= new FormCollection('.todolist-wrapper-json');
let todolistprefix= new FormCollection('.todolist-wrapper-prefix');

function collectionJsonToDiv(instance, list)
{
    while (list.firstChild) {
        list.removeChild(list.lastChild);
    }

    let
    divElm= document.createElement('div'),
    el= instance.config.wrapper.querySelector('input[name="'+instance.config.prefix+'"]')
    ;
    if(!el) return;
    divElm.innerHTML= `${el.name}= ${el.value}`;
    list.appendChild(divElm);
}

function collectionPrefixToDiv(instance, list)
{
    while (list.firstChild) {
        list.removeChild(list.lastChild);
    }

        Array.from(instance.config.container.children).forEach((elm)=>{

            let
                divElm= document.createElement('div');
                ;

            elm.querySelectorAll('input, select').forEach(/**@param HTMLElement el*/el =>
            {
                let pElm= document.createElement('p'),
                    name= el.name,
                    value;
                ;
                value= (el.tagName.toLowerCase()==='select' ? (el.options[el.selectedIndex].value||null) : el.value||null)
                pElm.innerHTML= `${name}= ${value}`;
                divElm.appendChild(pElm);
            });

            list.appendChild(divElm)

        });




}


document.querySelector('#formInputCollection').addEventListener('submit', (ev)=>{
    ev.preventDefault();
    collectionJsonToDiv(todolistjform, document.querySelector('.js-listjform'));
    collectionJsonToDiv(todolistjson, document.querySelector('.js-listjson'));
    collectionPrefixToDiv(todolistprefix, document.querySelector('.js-listprefix'));

});





    