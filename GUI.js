const GUI_ITEM_HEIGHT = 35;

const GUIContainer = document.createElement("div");
GUIContainer.id = "GUIContainer";
document.body.appendChild(GUIContainer);

function AddBlock()
{
    let element = document.createElement("div");
    element.className = "GUIBlock";
    GUIContainer.appendChild(element);
    return element;
}

function AddButton(img, onclick, block)
{
    let element = document.createElement("img");
    element.className = "GUIButton";
    element.src = img;
    element.style.height = GUI_ITEM_HEIGHT + "px";
    element.onclick = onclick;
    if(block) block.appendChild(element);
    else GUIContainer.appendChild(element);
    return element;
}

function AddText(width, text, block)
{
    let element = document.createElement("div");
    element.className = "GUIText";
    element.innerHTML = text;
    element.style.width = width + "px";
    element.style.height = GUI_ITEM_HEIGHT + "px";
    element.style.lineHeight = GUI_ITEM_HEIGHT + "px";
    if(block) block.appendChild(element);
    else GUIContainer.appendChild(element);
    return element;
}

function AddSlider(width, min, max, val, step, onchange, block)
{
    let element = document.createElement("input");
    element.className = "GUISlider";
    element.type = 'range';
    element.min = min;
    element.max = max;
    element.value = val;
    element.step = step;
    element.style.width = width + "px";
    element.style.height = GUI_ITEM_HEIGHT + "px";
    element.addEventListener('change', onchange);
    if(block) block.appendChild(element);
    else GUIContainer.appendChild(element);
    return element;
}