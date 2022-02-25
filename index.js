var els = [];
var scene = document.getElementById("scene");

scene.onclick = (me) => {
	var el = document.createElement("div");
    els.push(el);
    el.className = "point";
    el.innerHTML = els.length;
    el.style.left = me.offsetX+"px";
    el.style.top = me.offsetY+"px";
    let index = els.length - 1;
    el.onclick = (me) => {
        els[index] = els[els.length-1];
        els[index].innerHTML = index+1;
        document.body.removeChild(el);
        els.pop();
    }
    document.body.appendChild(el);
};