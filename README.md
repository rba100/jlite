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
var newElement = instantiate('templateId', { name: 'Dave' });
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

The following attributes are supported.

| Attribute | Purpose |
| --------- | ------- |
| `data-from` | Sets the element content. |
| `data-template` | The ID of another template to use for child content if the `data-from` value is an array. |
| `data-attr` | Sets attributes on the element. |
| `data-css` | Sets CSS overrides on the element. Bit pointless, might depreciate later. |


For `data-attr` and `data-css` the value must contain key-value mappings. This is clear with an example, such making the class of a button dynamic:

```html
<button data-attr="buttonattrs" data-from="content"></button>
```    

with parameters object

```javascript
{
    content: 'Click me!',
    buttonattrs: { class: 'btn-primary', id: 'submitbutton' }
}
```

would render

```html
<button id="submitbutton" class="btn--primary">Click me</button>
``` 

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
        { medal: 'Bronze', sport: 'Foresight' }]
};
```

```css
.style--gold { background-color: ##FFD700 }
```
The parameters object is not two-way bound. Later changes to the parameters object will have no effect on elements made from previous invocations. It's up to you to refresh elements as needed.

For very simple templates the parameters value can be a string or number instead of an object. In this case, `data-from` must have no value, e.g. `<div><p>Favourite number: <span data-from></span>.</p></div>` with `instantiate('template', 7);`.

Mis-matched parameters to templates fails silently. I.e. if you omit a property that a `data-` asks for, or if you provide a property for which there is no correspondig `data-` element then the framework will just move on and do what it can.

## Programming patterns

This scheme is only suited for simple web pages where a full fat framework would be a waste of time. jQuery is the only dependency.
