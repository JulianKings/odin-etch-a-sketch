// declarations
let size = 16;
const toyBox = document.querySelector('.toy');
const clearButton = document.querySelector('#clearButton');
const eraserButton = document.querySelector('#eraserButton');
const sizeSelector = document.querySelector('#sizeSelector');
const sizeStatus = document.querySelector('#sizeStatus');
const colorSelector = document.querySelector('#colorSelector');
const colorMockup = document.querySelector('#colorMockup');
const colorButton = document.querySelector('#colorButton');
const rainbowButton = document.querySelector('#rainbowButton');
const darkenButton = document.querySelector('#darkenButton');
const lightenButton = document.querySelector('#lightenButton');
let mouseDown = false;
let colorToApply = "#000000";
let eraserMode = false;
let rainbowMode = false;
let darkenMode = false;
let darkenStatus = 0;
let lightenMode = false;
let lightenStatus = 0;

populateGrid(size);

// add window events
window.addEventListener('mousedown', (event) => {
    mouseDown = true;
});

window.addEventListener('mouseup', (event) => {
    mouseDown = false;
    darkenStatus = 0;
    lightenStatus = 0;
});

// add click events
clearButton.addEventListener('click', (event) => {
    clearChildren();
});

eraserButton.addEventListener('click', (event) => {
    clearButtons();
    clearModes();
    clearChildrenFilter();
    eraserMode = true;
    eraserButton.classList.add("active");
});

rainbowButton.addEventListener('click', (event) => {
    clearButtons();
    clearModes();
    clearChildrenFilter();
    rainbowMode = true;
    rainbowButton.classList.add("active");
});

darkenButton.addEventListener('click', (event) => {
    clearButtons();
    clearModes();
    clearChildrenFilter();
    darkenMode = true;
    darkenButton.classList.add("active");
});

lightenButton.addEventListener('click', (event) => {
    clearButtons();
    clearModes();
    clearChildrenFilter();
    lightenMode = true;
    lightenButton.classList.add("active");
});

colorButton.addEventListener('click', (event) => {
    clearButtons();
    clearModes();
    clearChildrenFilter();
    colorButton.classList.add("active");
});

// our small fix to the span we use as a selector
colorMockup.addEventListener('click', (event) => {
    colorSelector.click(event);
});

// add input events
sizeSelector.addEventListener('input', (event) => {
    size = parseInt(sizeSelector.value);
    sizeStatus.textContent = size + "x" + size;
    toyBox.style['grid-template-columns'] = `repeat(${size}, auto)`;

    populateGrid(size);
});

colorSelector.addEventListener('input', (event) => {
    colorToApply = colorSelector.value;
    colorMockup.style.backgroundColor = colorSelector.value;

    clearButtons();
    clearModes();
    clearChildrenFilter();
    colorButton.classList.add("active");
});

// helper functions
function clearButtons()
{
    if (eraserButton.classList.contains("active"))
    {
        eraserButton.classList.remove("active");
    }
    if (colorButton.classList.contains("active"))
    {
        colorButton.classList.remove("active");
    }
    if (rainbowButton.classList.contains("active"))
    {
        rainbowButton.classList.remove("active");
    }
    if (darkenButton.classList.contains("active"))
    {
        darkenButton.classList.remove("active");
    }
    if (lightenButton.classList.contains("active"))
    {
        lightenButton.classList.remove("active");
    }
}

function clearModes()
{
    eraserMode = false;
    lightenMode = false;
    lightenStatus = 0;
    darkenMode = false;
    darkenStatus = 0;
    rainbowMode = false;
}

function populateGrid(gridSize)
{
    // cleanup all childs
    cleanupChildren(toyBox);
    toyBox.style.gridAutoColumns = gridSize;
    toyBox.style.gridAutoRows = gridSize;
    // craft new grid
    let i = 0;
    for(let x = 0; x < gridSize; x++)
    {
        for(let y = 0; y < gridSize; y++)
        {
            // create each grid
            let gridBox = document.createElement('div');
            gridBox.classList.add("toy-item");

            // add hover and click event
            gridBox.addEventListener('mouseover', (event) => {
                if(mouseDown)
                {
                    paintGrid(gridBox);
                }
            });

            gridBox.addEventListener('click', (event) => {                    
                paintGrid(gridBox);
            });

            toyBox.appendChild(gridBox);
        }
    }
}

function paintGrid(gridElement)
{
    if(eraserMode)
    {
        gridElement.style.backgroundColor = "#ffffff";

    } else if(rainbowMode) {
        // generate 3 random numbers between 0 and 255
        gridElement.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)})`;
    } else if(darkenMode) {
        let brightness = (100 - (10*darkenStatus)) / 100;
        if(darkenStatus < 10)
        {
            darkenStatus++;
        }
        console.log(`brightness(${brightness})`);
        gridElement.style.backgroundColor = colorToApply;
        gridElement.style.filter = `brightness(${brightness})`;
    }else if(lightenMode) {
        let brightness = (100 + (100*lightenStatus));
        if(lightenStatus < 25)
        {
            lightenStatus++;
        }
        console.log(`brightness(${brightness}%)`);
        gridElement.style.backgroundColor = colorToApply;
        gridElement.style.filter = `brightness(${brightness}%)`;
    } else {
        gridElement.style.backgroundColor = colorToApply;
    }
}

function clearChildren()
{
    let child = toyBox.lastElementChild; 
    while (child) {
        child.style.backgroundColor = "#ffffff";
        child.style.filter = "";
        child = child.previousSibling;
    }
}

function clearChildrenFilter()
{
    let child = toyBox.lastElementChild; 
    while (child) {
        child.style.filter = "";
        child = child.previousSibling;
    }
}

function cleanupChildren(parent)
{
    let child = parent.lastElementChild; 
    while (child) {        
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}