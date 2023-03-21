import updateHiddenInput from './updateHiddenInput.js';
import serializeCollection from "./serializeCollection.js";
import createInputGroup from "./createInputGroup.js";
import getConfig from "./getConfig.js";

/**
 * @param {string} w Wrapper selector ID|class
 * @param {Object|undefined} params
 */
export default function InputGroupCollection(w, params) {


    /**
     * Set config from dataset 
     */
    let config = this.config= getConfig(w, params);
    config.buttons.forEach((b)=>{
        b.node.addEventListener('click', (ev) => {
            let newForm= createInputGroup(b, config)
            Array.from(config.container.children).forEach((elm , i)=>{
                if(elm!==newForm){
                    if(elm.querySelector('.fic-group').style.display!=='none') elm.querySelector('.fic-navbar_toggle').click();
                }
            });
        });
    });

}

/**
 * Serialize form to json
 * @returns {Object}
 */
InputGroupCollection.prototype.serialize= function (){
    return serializeCollection(this.config.container);
}

/**
 * Populate container with some data
 * @param {Object[]} arr
 */
InputGroupCollection.prototype.populate= function (arr){

    arr.forEach((data , i)=>{
        if(!data || Array.isArray(data)) return;

        let button=((buttons)=>{
            let ret= buttons[0];
            if(buttons.length>1)
            {
                for(let i in buttons)
                {
                    //different templates (forms) por each button with specific data for each form
                    if(buttons[i].hasOwnProperty('__type') && data.hasOwnProperty('__type'))
                    {
                        if(buttons[i]['__type']===data['__type']){
                            return buttons[i];
                        }
                    }
                }
            }
            return ret;
        })(this.config.buttons);

        if(!button){
            console.error(`No config button for ${this.config.prefix}`)
            return;
        }

        let newForm= createInputGroup(button, this.config);//create HTMLElement from template

        newForm.querySelector('.fic-navbar_toggle').click();//Toggle (close)

        newForm.querySelectorAll('input, select').forEach(/**@param {HTMLElement} el*/el => {//set form values
            let name= el.dataset.name
            if(name in data) el.value= data[name];
        });
        button.jsonToNavbar(data, newForm);//Values to string in buttons bar
    });

    if(['json', 'jform'].indexOf(this.config.mode)!==-1) updateHiddenInput(this.config)

}

/**
 * Used to copy/paste in edit/new pages
 */
InputGroupCollection.prototype.copyToLocalStorage= function ()
{
    localStorage.setItem(`${this.config.prefix}Storage`, this.serialize());
}

/**
 * Used to copy/paste in edit/new pages
 */
InputGroupCollection.prototype.pasteFromLocalStorage= function ()
{
    this.populate(JSON.parse(localStorage.getItem(`${this.config.prefix}Storage`)||[]));
}