import InputGroupCollection from "../src/js/modules/InputGroupCollection.mod.1.0.0.js";

let contributor= new InputGroupCollection('.contributor-wrapper-json',  {
    /**
     * Fill with a string the current Control bar on 'input' events.
     * The fallback join all fields with spaces
     * @param {Object} json Form to json
     * @param {HTMLElement} elm Current wrapper for this form
     */
    jsonToNavbar: function(json, elm){
        let
            fields= {
                person: 'title firstname initials infix lastname suffix screenname role'.split(' '),
                org: 'name screenname role'.split(' ')
            },
            out=[],
            navTxt= elm.querySelector('.fic-navbar_txt');

        fields[json['__type']].forEach(el=>{
            if (json[el])
            {
                if(['initials', 'screenname'].includes(el)){
                    out.push(` (${json[el]}) `);
                }
                else if(['role'].includes(el)){
                    out.push(` [${json[el]}]`);
                }
                else{
                    out.push(` ${json[el]} `);
                }
            }
        });

        if(out.length) navTxt.title= navTxt.innerHTML=out.join('');
    }
});

contributor.populate(JSON.parse('[{"role":"editor","__type":"person","initials":"J","lastname":"Doe","firstname":"John","screenname":"mitridates"},{"name":"Some Local Library ","role":"editor","__type":"org","screenname":"SLL"}]'));
