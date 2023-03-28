# Input Group Collection

InputGroupCollection is a simple javascript plugin to generate dynamically input groups from template.
The generated inputs can be sent as input array or a single input with a json array as value.

Examples in [Online test in GitHub pages](https://mitridates.github.io/InputGroupCollection/test/index.html)

![Example image](https://github.com/mitridates/InputGroupCollection/blob/master/test/example.png?raw=true)

## Installation

javascript module or iife function

```javascript
import InputGroupCollection from "../src/js/modules/InputGroupCollection.mod.1.0.0.js";
```
```html
<script src="../src/js/iife/InputGroupCollection.iife.1.0.0.js"></script>
```


##  Elements

- A wrapper to include container and button/s.
  - Container: Store generated collection input groups.
  - Buttons: create new collection input groups.
- A template for the input group to clone
  - with or without navbar
  - with input group container inside some element with .fic-group class
- The navbar (Inside template or as standalone template) to show text and icons to
  - Delete collection.
  - Reorder collections
  - Show/hide input group

## Usage

#### Dataset in wrapper:
- data-mode: 'prefix'|'json'|'jform'.
  - "prefix" mode generate fields like "prefix[index][inputName]=value".
  - "json" & "jform" mode generate a hidden field to send all data in one input as json array.
- data-prefix: the input prefix.
- data-template: the input group template to clone
- data-navbar: selector for navbar template (if not included in input group template).
- data-container: container for new nodes (if not exists, generated dynamically)
- data-buttons: selector for button/s (or use .fic-button class in button)

```html
        <!--wrapper-->
        <div class="py-2 todolist-wrapper-jform border border-dark" data-mode="json" data-prefix="myPrefix" data-template="#template-list">
            <!-- .fic-container to append new collection HTMLElement-->
            <div class="fic-container border rounded  border-grey"></div>
            <div class="p-2">
                <!--Buttons to add new collection to container -->
                <!--.fic-button is the default fallback, else, define data-buttons selector in wrapper -->
                <button type="button"  class="fic-button btn btn-light border-dark">
                    <i class="fa fa-list" ></i>&nbsp;Add something to do</button>
            </div>
        </div>
        <!--End wrapper-->
```

#### The template input group.

Include navbar for a basic input group. The input froup must be inside an element with .fic-group class.

```html
    <!--Template data-template is defined in wrapper or button.-->
    <template id="template-list">
      <div class="border border-grey">
        <!--Navbar inside template -->
        <div class="fic-navbar  d-flex flex-row bg-light">
          <div class="p-1"><button type="button" class="btn m-0 p-0 fic-navbar_trash" style="line-height: 0;"><i class="fa fa-trash"></i></button></div>
          <div class="py-2 flex-grow-1 fic-navbar_txt" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis; cursor:pointer"></div>
          <div class="p-1" data-arrow="down"><button type="button" class="btn m-0 p-0 fic-navbar_down" style="line-height: 0;"><i class="fa fa-arrow-down" aria-hidden="true"></i></button></div>
          <div class="p-1" data-arrow="up"><button type="button" class="btn m-0 p-0 fic-navbar_up" style="line-height: 0;"><i class="fa fa-arrow-up" aria-hidden="true"></i></button></div>
          <div class="p-1"><button type="button" class="btn m-0 p-0 fic-navbar_toggle" style="line-height: 0;"><i class="fa fa-angle-down"></i></button></div>
        </div>
        <!--End Navbar inside template-->
        <!--Input group wrapper .fic-group-->
        <div class="fic-group">
          <div  class="row m-2">
            <div class="col-md-3">
              List of something
            </div>
            <div class="col-md">
              <input data-name="list" class="form-control" value="">
            </div>
          </div>
          <div  class="row m-2">
            <div class="col-md-3">
              Action type
            </div>
            <div class="col-md">
              <select data-name="action" tabindex="-1" class="form-control">
                <option value="todo">Todo</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
        </div>
        <!--End input group wrapper -->
      </div>
    </template>
    <!--End template-->
```

#### Javascript:

The javascript part is simple. Create an instance with the wrapper selector as argument. Add a second argument with json properties to define options or overwrite
dataset values.

```javascript

let comment= InputGroupCollection('.comment-wrapper', {
  prefix:'otherPrefix',
  /**
   * @return string. If defined, modify default function and return custom string for navbar
   */
  //jsonToNavbar:(json, wrapper)=>{
  // return string 
  //}
})
//Add previous data to the container
comment.populate(JSON.parse('[{"list":"Buy some milk","action":"todo"},{"list":"Something to do","action":"todo"}]'));
```
## License

[MIT](https://choosealicense.com/licenses/mit/)
