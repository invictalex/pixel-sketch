var grid = document.querySelector(".grid");
var gridStyle = getComputedStyle(grid);
var gridPx = parseInt(gridStyle.width);
var slider = document.querySelector("#gridSlider");
var resetBtn = document.querySelector(".reset");
var eraser = document.querySelector("#eraserCheckbox");
var colorModeLight = document.querySelector("#colorModeChbx");
var darkColors = ["white", "grey", "red", "orange", "yellow", "green", "blue", "purple"];
var lightColors = ["black", "grey", "rosybrown", "teal", "tan", "goldenrod", "bueviolet", "brown"];


//                                      INITIAL SETTINGS

var eraserColor = "black";
var defaultColor = "white";
var colorMode = "dark";
var mouseDown = false;
var selectedColor;


//                                      LIVE FUNCTIONS

trackMousePress();

genGrid(slider.value);

changeColorMode();

resetBtn.onclick = () => genGrid(slider.value);

draw();

colorModeLight.onclick = () => changeColorMode();



//                                      FUNCTION DEFINITIONS



function trackMousePress()
{
    window.onmousedown = () => 
    {  
        mouseDown = true;
    }  
    
    window.onmouseup = () => 
    {  
        mouseDown = false;
    }
}

function draw() 
{
    grid.onmousemove = (e) =>
    {
        if (mouseDown)
        {
            var square = e.path[0];
            if (square.classList.contains("square"))
            {
                square.style.backgroundColor = markerColor();
            }
            
        }
    }
    
    grid.onmousedown = (e) =>
    {
        var square = e.path[0];
        square.style.backgroundColor = markerColor();
    }
}

function pickColor(num)
{
    if (colorMode == "dark")
    {
        
        return darkColors[num];
    } 
    else if (colorMode == "light")
    {
        
        return lightColors[num];
    }
}


function markerColor()
{
    if (eraser.checked == true)
        
        return eraserColor;
    
    else if (eraser.checked == false && selectedColor !== undefined)

        return selectedColor;

    else if (eraser.checked == false && selectedColor === undefined)

        return defaultColor;
}

function genGrid(num)
{
    grid.textContent = "";
    var totalSquares = num * num;
    var squarePx = (gridPx / num);

    for (let i = 0; i < totalSquares; i++)
    {
        var square = document.createElement("div");
        square.classList.add("square");
        /*square.setAttribute("id", `${i}`);*/
        square.setAttribute(`style`, `width:${squarePx}px; height:${squarePx}px;`);
        grid.appendChild(square);
    }
}

function changeColorMode()
{
    changeArtboardColors();
    
    var body = document.querySelector("body");
    var tools = document.querySelector(".tools");
    var grid = document.querySelector(".grid");
    var swatch = document.querySelectorAll(".swatchBox");
    var slider = document.querySelector(".slider");
    var titles = document.querySelectorAll(".title");
    var button = document.querySelector("button");

    if (colorModeLight.checked == true)
    {
        colorMode = "light";
        defaultColor = "black";
        eraserColor = "white";
        

        tools.classList.add("light");
        grid.classList.add("light");
        body.classList.add("light");
        slider.classList.add("light");
        button.classList.add("light");

        swatch.forEach(color  =>
        {
            color.classList.add("light");
        })

        titles.forEach(title  =>
            {
                title.classList.add("light");
            })

        for (let i = 0; i < 7; i++)
        {
            if (selectedColor == darkColors[i])
            {
                selectedColor = lightColors[i];
            }
        }
    }

    if (colorModeLight.checked == false)
    {

        colorMode = "dark";
        defaultColor = "white";
        eraserColor = "black";

        tools.classList.remove("light");
        grid.classList.remove("light");
        body.classList.remove("light");
        body.classList.remove("light");
        slider.classList.remove("light");
        button.classList.remove("light");

        titles.forEach(title  =>
            {
                title.classList.remove("light");
            })

        swatch.forEach(color  =>
        {
            color.classList.remove("light");
        })

        for (let i = 0; i < 7; i++)
        {
            if (selectedColor == lightColors[i])
            {
                selectedColor = darkColors[i];
            }
        }
    }
}

function changeArtboardColors()
{
    oldMode = lightColors;
    newMode = darkColors;

    if (colorModeLight.checked == true)
    {
        oldMode = darkColors;
        newMode = lightColors;
    }
    var squares = document.querySelectorAll(".square");
    console.log(squares);

    squares.forEach(square =>
        {
            for (let i = 0; i < 7; i++)
            {
                if (square.style.backgroundColor == oldMode[i])
                {
                    square.style.backgroundColor = newMode[i];
                }
            }
        })
}