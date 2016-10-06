var maze;
var blockAmt = 20;
var scribble;


function setup() {

    // Create object
    maze = new Maze;
    createCanvas(510, 510);
    scribble = new Scribble();
    drawMaze(maze);

}

function draw() {



  
}

function drawMaze(m) {
    fill(0);
    stroke(0);
    for (var i = 0; i < blockAmt; i++) {
        for (var j = 0; j < blockAmt; j++) {
            var temp = m.grid[i][j];
            if (temp.isWall[0]) { scribble.scribbleLine(temp.x - temp.width / 2, temp.y - temp.height / 2, temp.x + temp.width / 2, temp.y - temp.height / 2); }
            if (temp.isWall[1]) { scribble.scribbleLine(temp.x - temp.width / 2, temp.y + temp.height / 2, temp.x + temp.width / 2, temp.y + temp.height / 2); }
            if (temp.isWall[2]) { scribble.scribbleLine(temp.x - temp.width / 2, temp.y - temp.height / 2, temp.x - temp.width / 2, temp.y + temp.height / 2); }
            if (temp.isWall[3]) { scribble.scribbleLine(temp.x + temp.width / 2, temp.y - temp.height / 2, temp.x + temp.width / 2, temp.y + temp.height / 2); }
        }
    }
}

// Maze class
function Maze() {
    this.startPos = [2, 2];
    this.wid = 500;
    this.hei = 500;
    this.grid = [];
    for (var i = 0; i < this.wid; i = i + this.wid / blockAmt) {
        var row = [];
        for (var j = 0; j < this.hei; j += this.hei / blockAmt) {
            row.push(new Cell(i + this.wid / (blockAmt * 2), j + this.hei / (blockAmt * 2), this.wid / blockAmt, this.hei / blockAmt));
        }
        this.grid.push(row);
    }

    carveMaze(this);

}

function carveMaze(m) {
    var lastGoodPos = [];
    var currentPos = [];
    currentPos = m.startPos.slice();
    var finished = false;
    var i = 0;
    m.grid[currentPos[0]][currentPos[1]].visted = true;

    while (!finished && i < 2000) {
        var success = false;

        var randomNum = [0, 1, 2, 3];
        randomNum = shuffle(randomNum);

        var cell1 = m.grid[currentPos[0]][currentPos[1]];

        for (var h = 0; h < 4; h++) {
            if ((currentPos[1] - 1 >= 0) && randomNum[h] == 0 && !(m.grid[currentPos[0]][currentPos[1] - 1].visited)) {
                carve(cell1, "UP", m.grid[currentPos[0]][currentPos[1] - 1]);
                success = true;
                var temp = currentPos.slice();
                lastGoodPos.push(temp);
                currentPos[1]--;
                break;
            }
            if ((currentPos[1] + 1 < blockAmt) && randomNum[h] == 1 && !(m.grid[currentPos[0]][currentPos[1] + 1].visited)) {
                carve(cell1, "DOWN", m.grid[currentPos[0]][currentPos[1] + 1]);
                success = true;
                var temp = currentPos.slice();
                lastGoodPos.push(temp);
                currentPos[1]++;
                break;
            }
            if ((currentPos[0] - 1 >= 0) && randomNum[h] == 2 && !(m.grid[currentPos[0] - 1][currentPos[1]].visited)) {
                carve(cell1, "LEFT", m.grid[currentPos[0] - 1][currentPos[1]]);
                success = true;
                var temp = currentPos.slice();
                lastGoodPos.push(temp);
                currentPos[0]--;
                break;
            }
            if ((currentPos[0] + 1 < blockAmt) && randomNum[h] == 3 && !(m.grid[currentPos[0] + 1][currentPos[1]].visited)) {
                carve(cell1, "RIGHT", m.grid[currentPos[0] + 1][currentPos[1]]);
                success = true;
                var temp = currentPos.slice();
                lastGoodPos.push(temp);
                currentPos[0]++;
                break;
            }
        }

        if (!success) {
            currentPos[0] = lastGoodPos[lastGoodPos.length - 1][0];
            currentPos[1] = lastGoodPos[lastGoodPos.length - 1][1];
            lastGoodPos.splice(lastGoodPos.length - 1, 1);
        }
        if (currentPos[0] == m.startPos[0] && currentPos[1] == m.startPos[1]) { finished = true; }


        console.log("i:  " + i + "  Current position: " + currentPos + " Last pos: " + lastGoodPos);
        i++;
    }
}

function carve(cell1, direction1, cell2) {
    cell1.visited = true;
    cell2.visited = true;

    if (direction1 === "UP") {
        cell1.isWall[0] = false;
        cell2.isWall[1] = false;
    }
    if (direction1 === "DOWN") {
        cell1.isWall[1] = false;
        cell2.isWall[0] = false;
    }
    if (direction1 === "LEFT") {
        cell1.isWall[2] = false;
        cell2.isWall[3] = false;
    }
    if (direction1 === "RIGHT") {
        cell1.isWall[3] = false;
        cell2.isWall[2] = false;
    }
}

//Cell class
function Cell(xcoor, ycoor, wid, hei) {
    //up down left right
    this.isWall = [true, true, true, true];
    this.visited = false;
    this.width = wid;
    this.height = hei;
    this.x = xcoor;
    this.y = ycoor;
}
