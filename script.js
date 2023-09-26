var grid = document.querySelector(".grid");

var newArtboard = document.querySelector(".new-artboard");
var eraser = document.querySelector("#eraserCheckbox");
var colorModeSwitch = document.querySelector("#colorModeChbx");
var markerSize = document.querySelector(".marker-size--slider");
var swatch = document.querySelectorAll(".swatch input");
var colorInput = "var(--default)"

var colorMode  = {
    light: {
        background: "#fff",
        outline: "#000",
        default: "#000",
        grey: "#dcdcdc",
        red: "#cd5c5c",
        orange: "#ffa07a",
        yellow: "#f0e68c",
        green: "#556b2f",
        blue: "#add8e6",
        purple: "#ffdab9",
    },
    dark: {
        background: "#000",
        outline: "#6495ed",
        default: "#fff",
        grey: "#d3d3d3",
        red: "#dc143c",
        orange: "#ff8c00",
        yellow: "#ffd700",
        green: "#3cb371",
        blue: "#1e90ff",
        purple: "#9932cc",
    }
}

generateArtboard(markerSize.value);

newArtboard.onclick = () => generateArtboard(markerSize.value);

swatch.forEach(option => {
    option.style.background = `var(--${option.id})`
    option.onclick = (e) => colorInput = `var(--${e.target.id})`
})

const markerColor = () => (
    eraser.checked ? "transparent"
    : colorInput ? colorInput
    : defaultColor
)

useMarker();

colorModeSwitch.onclick = () => toggleColorMode();

const trackMouseStatus = () => {
    window.onmousedown = () => mouseDown = true;  
    window.onmouseup = () => mouseDown = false;
}
trackMouseStatus();

function generateArtboard(num){
    grid.innerHTML = ""; 
    var totalSquares = num * num;
    var squareWidth = (grid.clientWidth / num);

    for (let i = 0; i < totalSquares; i++){
        var square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute(`style`, `width:${squareWidth}px; height:${squareWidth}px;`);
        grid.appendChild(square);
    }
}

function useMarker(){
    grid.onmousemove = (e) =>
    {
        if (mouseDown){
            var square = e.toElement;

            if (square.classList.contains("square")){
                square.style.backgroundColor = markerColor();
            }
        }
    }
    
    grid.onmousedown = (e) =>{
        var square = e.toElement;
        square.style.backgroundColor = markerColor();
    }
}

function toggleColorMode(){
    var root = document.querySelector(':root').style;

    if (colorModeSwitch.checked) {
        Object.keys(colorMode.light).forEach(color => {
            root.setProperty(`--${color}`, colorMode.light[color])
        })
    } else {
        Object.keys(colorMode.dark).forEach(color => {
            root.setProperty(`--${color}`, colorMode.dark[color])
        })
    }
}