const GUI_LINE_HEIGHT = 35;

const GUIContainer = document.createElement("table");
GUIContainer.id = "GUIContainer";
document.body.appendChild(GUIContainer);

function AddLine()
{
    let line = document.createElement("tr");
    line.style.height = GUI_LINE_HEIGHT + "px";
    GUIContainer.appendChild(line);
    return line;
}

function AddSolidLine()
{
    let cell = document.createElement("td");
    cell.colSpan = 2;
    AddLine().appendChild(cell);
    return cell;
}

function AddPartedLine()
{
    let line = AddLine();
    let left = document.createElement("td");
    let right = document.createElement("td");
    line.appendChild(left);
    line.appendChild(right);
    return {left, right};
}

function AddTextedGUIElement(text, cell, extraClass)
{
    let element = document.createElement("div");
    element.className = "GUIElement " + extraClass;
    element.innerHTML = text;
    element.style.lineHeight = GUI_LINE_HEIGHT + "px";
    cell.appendChild(element);
    return element;
}

function AddText(text)
{
    return AddTextedGUIElement(text, AddSolidLine(), "GUIText");
}

function AddButton(text, onclick)
{
    let element = AddTextedGUIElement(text, AddSolidLine(), "GUIButton");
    element.onclick = onclick;
    return element;
}

function AddSlider(text, min, max, val, step, onchange)
{
    let line = AddPartedLine();
    AddTextedGUIElement(text, line.left, "GUISliderText");
    let element = document.createElement("input");
    element.className = "GUIElement";
    element.type = 'range';
    element.min = min;
    element.max = max;
    element.value = val;
    element.step = step;
    element.onchange = onchange;
    line.right.appendChild(element);
    return element;
}