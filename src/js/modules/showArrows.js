/**
 * Parse container to show/hide arrows used to reorder the forms
 * @param {HTMLElement} container 
 */
export default function showArrows(container)
{
    let length = container.children.length;

    Array.from(container.children).forEach((child , i)=>{
        let show= (function (l, i) {
            if(l===1){
                return null;
            }else{
                if(i===0){
                    return 'down';
                }else if(i>0 && (i+1)<l){
                    return 'both';
                }else{
                    return 'up';
                }
            }
        })(length, i);

        child.querySelectorAll('[data-arrow]').forEach(el => {
            
            if(show==='both'){
                el.style.display='inline';
                return;
            }
            
            if(el.dataset.arrow!==show){
                el.style.display='none';
            }else{
                el.style.display='inline';
            }
        });
    });
}