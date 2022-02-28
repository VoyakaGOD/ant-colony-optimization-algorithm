const SCENE_WIDTH = window.innerWidth;
const SCENE_HEIGHT = window.innerHeight;
const POINT_SIZE = 30;
const POINT_BORDER = 10;
const POINT_COLOR = "black";
const POINT_BORDER_COLOR = "#F10000";
const BACKGROUND_COLOR = "#F0F0F0";
const LINE_COLOR = "black";
const THE_SHORTEST_PATH_COLOR = "#00BB00";
const MAX_LINE_WIDTH = 20;

const FULL_POINT_SIZE = POINT_SIZE+POINT_BORDER;

const scene = document.getElementById("scene");
scene.width = SCENE_WIDTH;
scene.height = SCENE_HEIGHT;
const ctx = scene.getContext("2d");

function Clear()
{
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT);
}

Clear();

function DrawPointByXY(x, y)
{
    ctx.fillStyle = POINT_BORDER_COLOR;
    ctx.fillRect(x - FULL_POINT_SIZE*0.5, y - FULL_POINT_SIZE*0.5, FULL_POINT_SIZE, FULL_POINT_SIZE);
    ctx.fillStyle = POINT_COLOR;
    ctx.fillRect(x - POINT_SIZE*0.5, y - POINT_SIZE*0.5, POINT_SIZE, POINT_SIZE);
}

function DrawPoint(point)
{
    DrawPointByXY(point.x, point.y);
}

function DrawLineByXY(x1, y1, x2, y2, w, color)
{
    ctx.lineWidth = w;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function DrawLine(p1, p2, w, color)
{
    if(w > MAX_LINE_WIDTH) w = MAX_LINE_WIDTH;
    DrawLineByXY(p1.x, p1.y, p2.x, p2.y, w, color);
}

//////////////////////////////////////////////////////////////////////

const EDIT_MODE = 0;
const CALCULATION_MODE = 1;

const points = [];

var mode = EDIT_MODE;
var algorithmLoop = null;
var iterationCount = 0;

function IterateAlgorithm()
{
    iterationCount++;
    iterationText.innerHTML = "iteration: " + iterationCount;
    Iterate();
    theShortestPathText.innerHTML = "the shortest path: " + theShortestPath.len.toFixed(0);
    Clear();
    for(let i = 1; i < theShortestPath.points.length; i++)
        DrawLine(points[theShortestPath.points[i]], points[theShortestPath.points[i-1]], 20, THE_SHORTEST_PATH_COLOR);
    for(let i = 0; i < points.length; i++)
        for(let j = 0; j < i; j++)
            DrawLine(points[i], points[j], pheromones[i][j]*3, LINE_COLOR);
    for(let i = 0; i < points.length; i++)
        DrawPoint(points[i]);
    algorithmLoop = setTimeout(IterateAlgorithm, 250);
}

function ChangeMode()
{
    if(mode == EDIT_MODE && points.length >= 3)
    {
        mode = CALCULATION_MODE;
        ResetAlgorithmData(points);
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

scene.onclick = (e) => {
    if(mode != EDIT_MODE)
        return;
    
    let x = e.offsetX;
    let y = e.offsetY;
    let isFree = true;
    for(let i = 0; i < points.length; i++)
    {
        if(x > (points[i].x-FULL_POINT_SIZE*0.5) && x < (points[i].x+FULL_POINT_SIZE*0.5) && y > (points[i].y-FULL_POINT_SIZE*0.5) && y < (points[i].y+FULL_POINT_SIZE*0.5))
        {
            points.splice(i, 1);
            isFree = false;
            break;
        }
    }
    if(isFree) points.push({x, y});
    Clear();
    for(let i = 0; i < points.length; i++)
        for(let j = 0; j < i; j++)
            DrawLine(points[i], points[j], 2, LINE_COLOR);
    for(let i = 0; i < points.length; i++)
        DrawPoint(points[i]);
    pointsCountText.innerHTML = "points count: " + points.length;
};