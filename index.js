const SCENE_WIDTH = 1000;
const SCENE_HEIGHT = 900;
const POINT_SIZE = 30;
const POINT_BORDER = 10;
const POINT_COLOR = "black";
const POINT_BORDER_COLOR = "red";
const BACKGROUND_COLOR = "#F0F0F0";

const scene = document.getElementById("scene");
scene.width = SCENE_WIDTH;
scene.height = SCENE_HEIGHT;
const ctx = scene.getContext("2d");

function Clear()
{
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT);
}

function DrawPoint(x, y)
{
    ctx.fillStyle = POINT_BORDER_COLOR;
    ctx.fillRect(x - (POINT_SIZE+POINT_BORDER)*0.5, y-(POINT_SIZE+POINT_BORDER)*0.5, (POINT_SIZE+POINT_BORDER), (POINT_SIZE+POINT_BORDER));
    ctx.fillStyle = POINT_COLOR;
    ctx.fillRect(x - POINT_SIZE*0.5, y-POINT_SIZE*0.5, POINT_SIZE, POINT_SIZE);
}

function DrawLine(x1, y1, x2, y2, w)
{
    ctx.lineWidth = w;
    ctx.strokeStyle = POINT_COLOR;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

//////////////////////////////////////////////////////////////////////

const els = [];

Clear();

scene.onclick = (e) => {
    let x = e.offsetX;
    let y = e.offsetY;
    let f = true;
    for(let i = 0; i < els.length; i++)
    {
        if(x > (els[i].x-(POINT_SIZE+POINT_BORDER)*0.5) && x < (els[i].x+(POINT_SIZE+POINT_BORDER)*0.5) && y > (els[i].y-(POINT_SIZE+POINT_BORDER)*0.5) && y < (els[i].y+(POINT_SIZE+POINT_BORDER)*0.5))
        {
            els.splice(i, 1);
            f = false;
        }
    }
    if(f) els.push({x, y});
    Clear();
    for(let i = 0; i < els.length; i++)
        for(let j = 0; j < i; j++)
            DrawLine(els[i].x, els[i].y, els[j].x, els[j].y, 2);
    for(let i = 0; i < els.length; i++)
        DrawPoint(els[i].x, els[i].y);
};


let test = AddSlider("123456789", 0, 20, 10, 1, e => {});
let btn = AddButton("123456789", e => btn.innerHTML = test.value);
AddText("123456789");