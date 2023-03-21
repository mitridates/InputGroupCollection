import showArrows from './showArrows.js';
import addInputNames from './addInputNames.js';
import updateHiddenInput from "./updateHiddenInput.js";
/**
 * Add events to icons in control bar
 * @param {HTMLElement} elm 
 * @param {Object} config FormCollection config
 */
export default function addButtonEvents(elm, config)
{
    let 
        remover= function(ev)
        {
            let container= config.container;
            container.removeChild(this.elm);
            showArrows(container);
            if(['json', 'jform'].indexOf(config.mode)!==-1){
                updateHiddenInput(config)
            }else{
                addInputNames(config);
            }

        },
        toggler= elm.querySelector('.fic-navbar_toggle'),
        trash= elm.querySelector('.fic-navbar_trash'),
        up= elm.querySelector('.fic-navbar_up'),
        down= elm.querySelector('.fic-navbar_down'),
        txt= elm.querySelector('.fic-navbar_txt'),
        form= elm.querySelector('.fic-group'),
        rotate= 'fa-rotate-180';
        ;

    trash.addEventListener('click', remover.bind({elm: elm}));

    toggler.addEventListener('click', (ev)=>{
        
        let angle= ev.currentTarget.querySelector('.fa-angle-down');
            
        if(angle.classList.contains(rotate)){
            angle.classList.remove(rotate)
            form.style.display='inline'
        }else{
            angle.classList.add(rotate)
            form.style.display='none'
        }
    });

    txt.addEventListener('click', (ev)=>{
        toggler.click();
    });
    up.addEventListener('click', (ev)=>{
        moveElment(elm, false, config);
    });
    down.addEventListener('click', (ev)=>{
        moveElment(elm, true, config);
    });
}

function moveElment(elm, to, config)
{
    var arr = [].slice.call(elm.parentNode.children);
    var i= arr.indexOf(elm);
    var ii= to ? i+1 : i-1;
    if(ii>i){
        elm.parentNode.insertBefore(arr[ii], elm);
    }else{
        elm.parentNode.insertBefore(elm,arr[ii]);
    }
    showArrows(elm.parentNode);
    
    if(['json', 'jform'].indexOf(config.mode)!==-1){
        updateHiddenInput(config)
    }else{
        addInputNames(config);
    }
}
