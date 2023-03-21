import serializeCollection from "./serializeCollection.js";
/**
 * Serialize inputs to json
 * @param {Object} config
 */
export default function updateHiddenInput(config)
{
        let
            input =config.wrapper.querySelector('input[name="'+config.prefix+'"]'),
            container= config.container
        ;
        if(container.children.length===0){
                input.parentNode.removeChild(input)
        }else{
                input.value= (config.container.children.length)? serializeCollection(config.container) : '';
        }
}