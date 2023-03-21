import inputGroupToJson from "./inputGroupToJson.js";

/**
 * Serialize inputs to json
 * @param {HTMLElement} w container
 */
export default function serializeCollection(container)
{
    let out= [];
    Array.from(container.children).forEach((elm , i)=>{
        out.push(inputGroupToJson(elm))
    });
    return JSON.stringify(out);
}