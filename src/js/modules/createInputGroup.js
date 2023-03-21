import addButtonEvents from "./buttonsEvents.js";
import addFieldsEvents from "./fieldEvents.js";
import showArrows from "./showArrows.js";
import addInputNames from "./addInputNames.js";
import createNodeFromTemplate from "./cloneTemplate.js";
/**
 * Create a new input group from template
 * @param {Object} btn Current button config
 * @param {Object} config
 */
export default function createInputGroup(btn, config)
{
    let newGroup= createNodeFromTemplate(config, btn);
    config.container.appendChild(newGroup)
    addButtonEvents(newGroup, config);
    showArrows(config.container);
    if(['json', 'jform'].indexOf(config.mode)!==-1) {
        let input =config.wrapper.querySelector('input[name="'+config.prefix+'"]');
        if(!input){
            input = document.createElement('input');
            input.name = config.prefix;
            input.style.width= '100%';
            input.style.display= config.debug? 'inline' : 'none';
            config.wrapper.appendChild(input);
        }
    }else{
        addInputNames(config);
    }

    addFieldsEvents(newGroup, btn.jsonToNavbar, config);

    return newGroup;
}
