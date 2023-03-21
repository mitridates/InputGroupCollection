/**
 * Default function to add a text string to the control bar.
 * @param {Object} json Serialized form
 * @param {HTMLElement} wrapper
 */
export default function jsonToNavbar(json, wrapper)
{
    let     
        out=[],
        navTxt= wrapper.querySelector('.fic-navbar_txt')
        ;

    for(let i in json)
    {
        if(json[i] && i!=='__type'){
            out.push(json[i]);
        }      
    }
     navTxt.title= navTxt.innerHTML= out.length? out.join('. ') : '';
}