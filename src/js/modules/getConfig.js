import jsonToNavbar from "./jsonToNavbar.js";

/**
 * Create the FormCollection.config object
 * @param {string} sel Wrapper selector
 * @param {Object} params Second argument in FormCollection. Used only to fill with text the control navbar is exists.
 * @return {Object}
 */
export default function getConfig(sel, params)
{
    let wrapper= document.querySelector(sel);

    if(!wrapper) throw new Error(`Wrapper not found: ${sel}`);

    let
        config= {
            wrapper: wrapper,
            buttons:[],
            navbar: null,
            template:null,//common template for buttons
            mode:'prefix',//<input name="prefix[0][name]" value="fieldValue">
            //mode:'json'// <input type="hidden" name="myPrefix" value="[JsonSerializedFields]">
            //mode:jform,//<input type="hidden" name="myFormName[myPrefix]" value="[JsonSerializedFields]">
        },
        data = Object.assign(Object.assign({}, wrapper.dataset), params||{}),
        buttons, container
        ;


        if(!data.prefix) throw new Error(`Prefix is null for ${sel}`);
        
        for (let key in data)
        {
            if(!['navbar', 'container', 'buttons', 'template'].includes(key)) config[key]= data[key];;
            
        }
               
        if(config.mode==='jform')
        {
            let form= wrapper.closest('form');
    
            if(!form) throw new Error(`Form not found for ${sel}`);
            config.prefix= `${form.name}[${config.prefix}]`        
        }


        //navbar in dataset, find navbar in document
        if(data.hasOwnProperty('navbar'))
        {
            config.navbar= document.querySelector(data.navbar);
        }else{
            //config.navbar= wrapper.querySelector('.fic-navbar');
            config.navbar= document.querySelector('template.fic-navbar');//fallback
        }

    config.container= ((sel, fallback)=>{
        let c = wrapper.querySelector(sel||fallback) ;
        if(c) return c;
        c= document.createElement('div')
        wrapper.insertBefore(c, wrapper.firstChild);//add container dynamically
        return c;
    })(data.container, ".fic-container");

    if(data.hasOwnProperty('buttons'))
        {
            buttons=  (typeof data.buttons==="string")? wrapper.querySelectorAll(data.buttons) : data.buttons;//array
        }else{
            buttons= wrapper.querySelectorAll('.fic-button');
        }



        //template in dataset, find template in document
        if(data.hasOwnProperty('template'))
        {
            config.template= document.querySelector(data.template);
        }        
        
       
        if(!buttons.length) throw new Error(`No buttons for ${sel}`);




        buttons.forEach((b)=>
        {
            let bttn= {
                node: (b.nodeType)? b : config.wrapper.querySelector(b.node),
                __type: (b.nodeType)? b.dataset.__type : b.__type,
                template: ((nt, str)=>
                {
                    let tpl;

                    if(nt && b.dataset.template)
                    {
                        tpl= document.querySelector(b.dataset.template)//template in button dataset
                    }else if(!nt && b.hasOwnProperty(str))
                    {
                        tpl= document.querySelector(b[str]);//template in json property
                    }else if(config.template)
                    {
                        tpl= config.template;//template in json/wrapper dataset 
                    }

                    if(!tpl)throw new Error(`No template for button in ${sel}`);

                     //navbar in template?
                    if(!config.navbar)
                    {
                            let cloned= tpl.content.firstElementChild.cloneNode(true);
                            if(!cloned.querySelector('.fic-navbar')){
                                throw new Error(`Navbar not found for button in ${sel}`);
                            }
                            cloned=null;
                    };
                    return tpl;
                })(b.nodeType, 'template'),
                
                jsonToNavbar: ((nt, str)=>{
                    if(!nt && b.hasOwnProperty(str)) return b[str];
                    if(data.hasOwnProperty(str)) return data[str];
                    return jsonToNavbar;
                })(b.nodeType, 'jsonToNavbar')
            };

            if(buttons.length>1 && !bttn.__type) console.warn(`More than one button without __type ${sel}. The serializer will search for this property!`);

            config.buttons.push(bttn);
        })
    if(!config.buttons.length) throw new Error(`No buttons for ${sel}`);


    return config;
}


