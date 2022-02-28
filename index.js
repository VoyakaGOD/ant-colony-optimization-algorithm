const SCENE_WIDTH = 1500;
const SCENE_HEIGHT = 900;
const POINT_SIZE = 30;
const POINT_BORDER = 10;
const POINT_COLOR = "black";
const POINT_BORDER_COLOR = "red";
const BACKGROUND_COLOR = "#F0F0F0";
const LINE_COLOR = "black";
const THE_SHORTEST_PATH_COLOR = "#00DD00";

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

function DrawLine(x1, y1, x2, y2, w, color)
{
    ctx.lineWidth = w;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

//////////////////////////////////////////////////////////////////////

const EDIT_MODE = 0;
const CALCULATION_MODE = 1;

var mode = EDIT_MODE;
var algorithmLoop = null;
var iterationCount = 0;

function IterateAlgorithm()
{
    iterationCount++;
    iterationText.innerHTML = "iteration: " + iterationCount;
    Iterate();
    theShortestPathText.innerHTML = "the shortest path: " + theShortestPath.len;
    Clear();
    for(let i = 1; i < els.length; i++)
        DrawLine(els[theShortestPath.points[i]].x, els[theShortestPath.points[i]].y, els[theShortestPath.points[i-1]].x, els[theShortestPath.points[i-1]].y, 18, THE_SHORTEST_PATH_COLOR);
    DrawLine(els[theShortestPath.points[0]].x, els[theShortestPath.points[0]].y, els[theShortestPath.points[els.length-1]].x, els[theShortestPath.points[els.length-1]].y, 18, THE_SHORTEST_PATH_COLOR);
    for(let i = 0; i < els.length; i++)
        for(let j = 0; j < i; j++)
            DrawLine(els[i].x, els[i].y, els[j].x, els[j].y, pheromones[i][j]*3, LINE_COLOR);
    for(let i = 0; i < els.length; i++)
        DrawPoint(els[i].x, els[i].y);
    algorithmLoop = setTimeout(IterateAlgorithm, 250);
}

function ChangeMode()
{
    if(mode == EDIT_MODE && els.length >= 3)
    {
        mode = CALCULATION_MODE;
        ResetAlgorithmData(els);
        iterationCount = 0;
        IterateAlgorithm();
    }
    else
    {
        mode = EDIT_MODE;
        clearTimeout(algorithmLoop);
    }
}

//////////////////////////////////////////////////////////////////////

const pointsCountText = AddText("points count: 0");
const theShortestPathText = AddText("the shortest path: 0");
const iterationText = AddText("iteration: 0");
const startButton = AddButton("start", e => {
    ChangeMode();
    startButton.innerHTML = (mode == EDIT_MODE)? "start" : "stop";
});
const alphaSlider = AddSlider("alpha", 0, 5, alpha, 0.1, e => alpha = alphaSlider.value);
const betaSlider = AddSlider("beta", 0, 5, beta, 0.1, e => beta = betaSlider.value);
const qSlider = AddSlider("q", 10, 100, q, 5, e => q = qSlider.value);
const pSlider = AddSlider("p", 0.1, 0.5, p, 0.05, e => p = pSlider.value);
const antsCountSlider = AddSlider("ants count", 10, 20, antsCount, 1, e => antsCount = antsCountSlider.value);

//////////////////////////////////////////////////////////////////////

const els = [];

Clear();

scene.onclick = (e) => {
    if(mode != EDIT_MODE)
        return;
    
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
            DrawLine(els[i].x, els[i].y, els[j].x, els[j].y, 2, LINE_COLOR);
    for(let i = 0; i < els.length; i++)
        DrawPoint(els[i].x, els[i].y);
    pointsCountText.innerHTML = "points count: " + els.length;
};