var alpha = 1.0;
var beta = 1.0
var q = 100;
var p = 0.1;
var startPheramones = 0.5;
var antsCount = 10;

var pointsCount = 0;
var distances = [];
var invDistances = [];
var pheromones = [];
var theShortestPath = null;

function CreatePath(points, len)
{
    return {points, len};
}

function AddPointToPath(path, pointIndex)
{
    path.len += distances[pointIndex][path.points[path.points.length-1]];
    path.points.push(pointIndex);
}

function ResetAlgorithmData(points)
{
    pointsCount = points.length;
    distances = [];
    invDistances = [];
    pheromones = [];
    for(let i = 0; i < pointsCount; i++)
    {
        let distRow = [];
        let invRow = [];
        let phRow = [];
        for(let j = 0; j < pointsCount; j++)
        {
            let distance = Math.sqrt((points[i].x-points[j].x)*(points[i].x-points[j].x)+(points[i].y-points[j].y)*(points[i].y-points[j].y));
            distRow.push(distance);
            invRow.push(1/distance);
            phRow.push(startPheramones);
        }
        distances.push(distRow);
        invDistances.push(invRow);
        pheromones.push(phRow);
    }

    theShortestPath = CreatePath([], 999999);
}

function CalculateChances(currentPoint, avaiblePoints)
{
    let chances = [];
    let sum = 0;
    for(let i = 0; i < avaiblePoints.length; i++)
    {
        let chance = Math.pow(pheromones[currentPoint][avaiblePoints[i]], alpha)*Math.pow(invDistances[currentPoint][avaiblePoints[i]], beta);
        sum += chance;
        chances.push(chance);
    }
    for(let i = 0; i < avaiblePoints.length; i++)
        chances[i] /= sum;
    
    return chances;
}

function SelectNext(chances)
{
    let rnd = Math.random();
    let cur = 0;
    let index = 0;
    while(index < chances.length)
    {
        cur += chances[index];
        if(cur >= rnd)
            return index;
        index++;
    }
    return chances.length-1;
}

function ReleaseAnAnt(startPoint)
{
    let avaiblePoints = [];
    for(let i = 0; i < pointsCount; i++)
        avaiblePoints.push(i);
    avaiblePoints.splice(startPoint, 1);

    let path = CreatePath([startPoint], 0);
    
    while(avaiblePoints.length > 0)
    {
        let chances = CalculateChances(path.points[path.points.length-1], avaiblePoints);
        let next = SelectNext(chances);
        AddPointToPath(path, avaiblePoints[next]);
        avaiblePoints.splice(next, 1);
    }
    
    AddPointToPath(path, startPoint);
    return path;
}

function Iterate()
{
    let pathes = [];
    for(let i = 0; i < antsCount; i++)
        pathes.push(ReleaseAnAnt(Math.floor(Math.random()*pointsCount)));

    for(let i = 0; i < pointsCount; i++)
        for(let j = 0; j < pointsCount; j++)
            pheromones[i][j] *= (1-p);

    for(let i = 0; i < antsCount; i++)
    {
        let path = pathes[i];
        let delta = q/path.len;
        if(path.len < theShortestPath.len)
            theShortestPath = path;
        for(let j = 1; j < path.points.length; j++)
        {
            pheromones[path.points[j-1]][path.points[j]] += delta;
            pheromones[path.points[j]][path.points[j-1]] += delta;
        }
    }
}