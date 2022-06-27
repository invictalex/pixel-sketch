var grid = document.querySelector(".grid");
var gridStyle = getComputedStyle(grid);
var gridPx = parseInt(gridStyle.width);
var slider = document.querySelector("#gridSlider");
var resetBtn = document.querySelector(".reset");

var mouseDown = false;

window.onmousedown = () => 
{  
    mouseDown = true;
}  

window.onmouseup = () => 
{  
    mouseDown = false;
}


resetBtn.onclick = () => genGrid(slider.value);

function draw() 
{
    grid.onmousemove = (e) =>
    {
        if (mouseDown)
        {
            var square = e.path[0];
            square.style.backgroundColor = "white";
        }
    }
    
    grid.onmousedown = (e) =>
    {
        var square = e.path[0];
        square.style.backgroundColor = "white";
    }
}







function genGrid(num)
{
    grid.textContent = "";
    var totalSquares = num * num;
    var squarePx = (gridPx / num) - 2;

    for (let i = 0; i < totalSquares; i++)
    {
        var square = document.createElement("div");
        square.classList.add("square");
        /*square.setAttribute("id", `${i}`);*/
        square.setAttribute(`style`, `border: solid 1px white; width:${squarePx}px; height:${squarePx}px;`);
        grid.appendChild(square);
    }
}
