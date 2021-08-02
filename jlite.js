
/**
 * Creates a jQuery-wrapped DOM element based on a template element.
 * @param {string} template - The Id of a <template> element that the new element will be based on.
 * @param {(object|string|number)} [parameters] - The data to apply to the new element.
 */
 function instantiate(template, parameters) {
    if (typeof (template) === "string") template = $('#' + template);
    var newElement = $(template.html());
    if (typeof (parameters) !== "undefined")
        dataRefresh(newElement, parameters);
    return newElement;
}

/**
 * Updates an existing DOM element with the supplied data.
 * @param {object} element - A jQuery wrapped DOM element.
 * @param {(object|string|number)} parameters - The data to apply to the element.
 */
function dataRefresh(element, parameters) {
    if (!parameters) return;
    if (typeof (parameters) === "object") {
        if (Array.isArray(parameters)) {
            var dataTemplate = element.attr("data-template");
            var container = element;
            if (!dataTemplate) {
                container = element.find("[data-template]");
                dataTemplate = container.attr('data-template');
            }
            if (!dataTemplate) return;
            container.html("");
            for (var value in parameters) {
                var itemElement = instantiate(dataTemplate, parameters[value]);
                container.append(itemElement);
            }
            return;
        } else for (var key in parameters) {
            if (!parameters.hasOwnProperty(key)) continue;
            var dataValue = parameters[key];
            var target = element.find("[data-from='" + key + "']")
                .addBack("[data-from='" + key + "']");
            if (target.length) {
                if (typeof (dataValue) === "string" || typeof (dataValue) === "number")
                    target.html(dataValue);
                else if (dataValue !== null && typeof (dataValue) === "object") {
                    dataRefresh(target, dataValue);
                }
                else if (dataValue === null) target.remove();
                continue;
            }
            var styleTarget = element.find("[data-css='" + key + "']");
            if (styleTarget.length) {
                for (var cssKey in dataValue) {
                    styleTarget.css(cssKey, dataValue[cssKey]);
                }
                continue;
            }
            var attributeTarget = element.attr('data-attr') === key
                ? element : element.find("[data-attr='" + key + "']");
            if (attributeTarget.length) {
                for (var attrKey in dataValue) {
                    if (!dataValue.hasOwnProperty(attrKey)) continue;
                    if (attrKey === 'class') attributeTarget.addClass(dataValue[attrKey]);
                    else attributeTarget.attr(attrKey, dataValue[attrKey]);
                }
                continue;
            }
        }
    }
    else if (typeof (parameters) === "string" || typeof (parameters) === "number") {
        var targetElement = element.find('[data-from]').addBack('[data-from]');
        if (!targetElement.length) return;
        var textFrom = targetElement.attr('data-from');
        if (textFrom === "") targetElement.html(parameters);
    }
}