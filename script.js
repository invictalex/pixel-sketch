var grid = document.querySelector(".grid");
var gridStyle = getComputedStyle(grid);
var gridPx = parseInt(gridStyle.width);
var slider = document.querySelector("#gridSlider");
var resetBtn = document.querySelector(".reset");
var eraser = document.querySelector("#eraserCheckbox");
var lightModeToggle = document.querySelector("#colorModeChbx");
var darkColors = ["white", "lightgray", "crimson", "darkorange", "gold", "mediumseagreen", "dodgerblue", "darkorchid"];
var lightColors = ["black", "gainsboro", "indianred", "lightsalmon", "khaki", "darkolivegreen", "lightblue", "peachpuff"];
var body = document.querySelector("body");
var tools = document.querySelector(".tools");
var grid = document.querySelector(".grid");
var button = document.querySelector("button");
var slider = document.querySelector(".slider");
var elArr = [body, tools, grid, button, slider];

var swatch = document.querySelectorAll(".swatchBox");
var titles = document.querySelectorAll(".title");
var toggles = document.querySelectorAll(".switch");
var elGroupArr = [swatch, titles, toggles];


//INITIAL SETTINGS

var defaultColor = "white";
var colorMode = "dark";
var mouseDown = false;
var colorInput;


//FUNCTION DECLARATIONS

window.onload = mobileWarning();

trackMouseStatus();

generateGrid(slider.value);

resetBtn.onclick = () => 
{
    generateGrid();
}

draw();

lightModeToggle.onclick = () => toggleColorMode();



//FUNCTION DEFINITIONS

function mobileWarning()
{
    var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    
    if (mobile) 
    {
        alert("This game has not been optimised for smart devices yet. Please return on a computer!");              
    } else 
    {
        return;
    }
}

function trackMouseStatus()
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

function generateGrid(num)
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

function getColorInput(index)
{
    if (colorMode == "dark")
        return darkColors[index];
     
    else if (colorMode == "light")
        return lightColors[index];
}

function markerColor()
{
    if (eraser.checked == true)
        return "transparent";
    
    else if (eraser.checked == false && colorInput !== undefined)
        return colorInput;

    else if (eraser.checked == false && colorInput === undefined)
        return defaultColor;
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

function toggleColorMode()
{
    toggleArtboardColors();

    if (lightModeToggle.checked == true)
    {
        colorMode = "light";
        defaultColor = "black";
        
        toggleInterfaceColors(elArr, elGroupArr);
        toggleMarkerColor();
    }

    if (lightModeToggle.checked == false)
    {
        colorMode = "dark";
        defaultColor = "white";

        toggleInterfaceColors(elArr, elGroupArr);
        toggleMarkerColor();
    }
}

function toggleInterfaceColors(elArr, elGroupArr)
{
    elArr.forEach(el =>
        {
            el.classList.toggle("light");
        })

    elGroupArr.forEach(elGroup =>
        {
            elGroup.forEach(el =>
                {
                    el.classList.toggle("light");
                })
        })

}

function toggleMarkerColor()
{
    for (let i = 0; i < 8; i++)
    {
        if (colorInput == darkColors[i])
        {
            colorInput = lightColors[i];
        } else if (colorInput == lightColors[i])
        {
            colorInput = darkColors[i];
        }

    }
}

function toggleArtboardColors()
{
    prevMode = lightColors;
    currentMode = darkColors;

    if (lightModeToggle.checked == true)
    {
        prevMode = darkColors;
        currentMode = lightColors;
    }

    var squares = document.querySelectorAll(".square");

    squares.forEach(square =>
    {
        for (let i = 0; i < 8; i++)
        {
            if (square.style.backgroundColor === prevMode[i])
            {
                square.style.backgroundColor = currentMode[i];
            } 
        }
    });
}

function activateButton()
{
    if (lightModeToggle.checked == true)
    {
        resetBtn.classList.add("autoLight");
        setTimeout(function()
        {
            resetBtn.classList.remove("autoLight");
        }, 250);
    } else
    {
        resetBtn.classList.add("auto");
        setTimeout(function()
        {
            resetBtn.classList.remove("auto");
        }, 250);
    }
   
    generateGrid(slider.value);

}