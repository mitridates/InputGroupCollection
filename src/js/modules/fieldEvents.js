import jsonToNavbar from './jsonToNavbar.js'
import inputGroupToJson from './inputGroupToJson.js'
import updateHiddenInput from "./updateHiddenInput.js";

/**
 * Add events to input group fields
 * @param {HTMLElement} elm Current node in container
 * @param {Function|undefined} callback Create a navbar string
 * @param {Object} config
 */
export default function addFieldsEvents(elm, callback, config)
{
    elm.querySelectorAll('input, select').forEach(/**@param {HTMLInputElement|HTMLSelectElement} el*/el => {
        let evType= el.tagName.toLowerCase()==='select' ? 'change': 'input';

        el.addEventListener(evType, (ev)=>{

            if(callback){
                callback(inputGroupToJson(elm), elm);
            }else{
                jsonToNavbar(inputGroupToJson(elm), elm);
            }
            if(['json', 'jform'].indexOf(config.mode)!==-1) updateHiddenInput(config);
        });
    })
}