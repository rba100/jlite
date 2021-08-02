# jlite
A very simple way to make dynamic HTML UI elements from Javascript.

Requires jQuery.

## Basic Usage

1. Create `<template>` elements in your main view. Each template element must have an Id attribute and exactly one child element.

2. Call `instantiate` with the Id of the template element and an object containing any data to parameterise the new element with.

3. Append the new element to an existing element in the DOM.

```html
<html>
    <head>
        <script type="text/javascript" src="/js/jlite.js"></script>
    </head>
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

var newElement = instantiate('templateId', parameters);
$('#myContainer').append(newElement);
```

You can call `dataRefresh` instead of `instantiate` if the element already exists, e.g.

```javascript
var parameters = { name: 'Dave' };
var newElement = instantiate('templateId', parameters);
$('#myContainer').append(newElement);
parameters.name = 'Steve';
dataRefresh(newElement, parameters);
```
## Parameterising template elements

The second argument to `instantiate` and `dataRefresh` supplies the parameters for the templated element. It can be an object, string or number.

The following attributes are supported for use in template elements.

| Attribute | Purpose |
| --------- | ------- |
| `data-from` | The key on the parameters object for the data to apply to the element. |
| `data-template` | The ID of another template element to use for child elements if the `data-from` parameter is an array. |
| `data-attr` | The key on the parameters object containing that defines what the element's attribute values should be. See example. |

Here's a comprehensive example:

```html
<template Id="profile-template">
    <div>
        <h1 data-from="name"></h1>
        <ul data-from="awards" data-template="award-template" />
    </div>
</template>
<template Id="award-template">
    <li data-attributes="awardAttr">
        <p><span data-from="medal"></span> — <span data-from="sport"></span></p>
    </li>
</template>
```

```javascript
var parameters = { 
    name: 'Captain Obvious',
    awards: [
        { medal: 'Gold', sport: 'Hindsight', awardAttr: { 'class', 'style--gold'} },
        { medal: 'Bronze', sport: 'Foresight', awardAttr: { 'class', ''} }]
};
```

```css
.style--gold { background-color: ##FFD700 }
```
The parameters object is not two-way bound. Later changes to the parameters object will have no effect on elements made from previous invocations.

For very simple templates, the parameters value can be a string or number instead of an object. In this case, `data-from` must have no value, e.g. `<div><p>Favourite number: <span data-from></span>.</p></div>` with `instantiate('template', 7);`.

## Programming patterns

This scheme doesn't scale well but for very simple web pages is vastly quicker to work with that a comprehensive framework. No `node_modules` to weigh you down. jQuery is the only dependency.