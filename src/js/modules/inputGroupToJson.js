/**
 * Serialize This collection to json
 * @param {HTMLElement} elm
 * @returns {object}
 */
export default function inputGroupToJson(elm)
{
    let json={};

        elm.querySelectorAll('input, select').forEach(/**@param HTMLElement el*/el => 
        {
            if(el.tagName.toLowerCase()==='select')
            {
                json[el.dataset.name]= el.options[el.selectedIndex].value||null;
            }else{
                json[el.dataset.name]= el.value||null;
            }
        });
        return json;
}