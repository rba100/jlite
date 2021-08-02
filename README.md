# jlite
A very simple way to HTML UI elements from Javascript.

Requires jQuery.

## Usage

1. Create `<template>` elements in your main view. Each template element must have an Id attribute and exactly one child element.

2. Call `instantiate` with the Id of the template element and an object containing any data to parameterise the new element with.

3. Append the new element to an existing element in the DOM.

```html
<html>
    <body>
        <div Id="myContainer"></div>

        <template Id="templateId">
            <div>
                <p>I'm sorry <span data-from="name" />, I can't do that.<p>
            </div>
        </template>
    </body>
</html>
```


```javascript
var parameters = { name: 'Dave' };

var newElement = instantiate('#templateId', parameters);
$('#myContainer').append(newElement);
```

The following attributes are supported for use in template elements.

| Attribute | Purpose |
| --------- | ------- |
| data-from | The key on the parameters object for the data to apply to the element. |
| data-template | The ID of another template element to use for child elements if the `data-from` parameter is an array. |
| data-attr | The key on the parameters object containing another object that defines what the element's attribute values should be |

## Programming patterns

This scheme doesn't scale well but for very simple web pages is vastly quicker to work with that a comprehensive framework. No `node_modules` to weigh you down. jQuery is the only dependency.