var grid = document.querySelector(".grid");
var gridStyle = getComputedStyle(grid);
var gridPx = parseInt(gridStyle.width);
var slider = document.querySelector("#gridSlider");
var resetBtn = document.querySelector(".reset");
var eraser = document.querySelector("#eraserCheckbox");
var colorModeLight = document.querySelector("#colorModeChbx");
var darkColors = ["white", "lightgray", "crimson", "darkorange", "gold", "mediumseagreen", "dodgerblue", "darkorchid"];
var lightColors = ["black", "gainsboro", "indianred", "lightsalmon", "khaki", "darkolivegreen", "lightblue", "peachpuff"];


//                                      INITIAL SETTINGS

var eraserColor = "black";
var defaultColor = "white";
var colorMode = "dark";
var mouseDown = false;
var selectedColor;


//                                      LIVE FUNCTIONS

trackMousePress();

genGrid(slider.value);

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
        return darkColors[num];
     
    else if (colorMode == "light")
        return lightColors[num];
}


function markerColor()
{
    if (eraser.checked == true)
        
        return "transparent";
    
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
    var toggles = document.querySelectorAll(".switch");

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

        toggles.forEach(toggle =>
            {
                toggle.classList.add("light");
            })

        for (let i = 0; i < 8; i++)
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
        toggles.forEach(toggle =>
            {
                toggle.classList.remove("light");
            })

        for (let i = 0; i < 8; i++)
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
    altMode = lightColors;
    currentMode = darkColors;

    if (colorModeLight.checked == true)
    {
        altMode = darkColors;
        currentMode = lightColors;
    }

    var squares = document.querySelectorAll(".square");

    squares.forEach(square =>
    {
        for (let i = 0; i < 8; i++)
        {
            if (square.style.backgroundColor === altMode[i])
            {
                console.log("yes");
                square.style.backgroundColor = currentMode[i];
            } 
        }
    });
}