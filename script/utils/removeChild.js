/**
 * 
 * @param {parent HTML} parent 
 */
export function supAllChild(parent){
    while (parent.firstChild){
        parent.removeChild(parent.lastChild);
    }
}