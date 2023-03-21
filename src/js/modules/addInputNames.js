/**
 * Rename all input/select to create an input array with different index for each node in container.
 * @param {Object} config
 */
export default function addInputNames(config)
{
        Array.from(config.container.children).forEach((child , i)=>{
            child.querySelectorAll('input, select').forEach(elm => {
                elm.name = `${config.prefix}[${i}][${elm.dataset.name}]`;
            })
        })
}