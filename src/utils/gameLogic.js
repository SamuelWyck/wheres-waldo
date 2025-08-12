function positionTargetBox(event) {
    if (!event.target.matches(".game-image")) {
        return;
    }
    showTargetBox(event.offsetX, event.offsetY);
};


function showTargetBox(xCoord, yCoord) {
    const targetBox = document.querySelector(
        ".target-box"
    );

    const borderWidth = 4;
    const targetBoxWidth = targetBox.clientWidth + 
    (borderWidth * 2);
    const targetBoxHeight = targetBox.clientHeight + 
    (borderWidth * 2);

    let topCoord = yCoord - (targetBoxHeight / 2);
    let leftCoord = xCoord - (targetBoxWidth / 2);
    [leftCoord, topCoord] = clampCoords(
        targetBox,
        targetBoxWidth,
        targetBoxHeight,
        leftCoord,
        topCoord
    );
    
    targetBox.style.top = `${topCoord}px`;
    targetBox.style.left = `${leftCoord}px`;

    positionTargetBtns(targetBox, xCoord, yCoord);

    const btns = targetBox.firstChild;
    btns.dataset.x = leftCoord;
    btns.dataset.y = topCoord;

    targetBox.classList.remove("hidden");
};


function clampCoords(targetBox, width, height, xCoord, yCoord) {
    const parent = targetBox.parentElement;
    
    const parentWidth = parent.clientWidth;
    const parentHeight = parent.clientHeight;

    if (xCoord < 0) {
        xCoord = 0;
    } else if (xCoord + width > parentWidth) {
        xCoord = parentWidth - width;
    }
    if (yCoord < 0) {
        yCoord = 0;
    } else if (yCoord + height >parentHeight) {
        yCoord = parentHeight - height;
    }
    
    return [xCoord, yCoord];
};


function positionTargetBtns(targetBox, xCoord, yCoord) {
    const btns = targetBox.firstChild;
    const screenMidX = window.innerWidth / 2;
    const screenMidY = window.innerHeight / 2;

    if (xCoord > screenMidX) {
        btns.style.right = "130%";
        btns.style.left = "";
    } else {
        btns.style.left = "130%";
        btns.style.right = "";
    }
    if (yCoord > screenMidY) {
        btns.style.bottom = "130%";
        btns.style.top = "";
    } else {
        btns.style.top = "130%";
        btns.style.bottom = "";
    }
};


function hideTargetBox() {
    const targetBox = document.querySelector(
        ".target-box"
    );

    targetBox.classList.add("hidden");
};


async function makeGuess(event) {
    const parentEle = event.target.parentElement;
    const targetBox = parentEle.parentElement;

    targetBox.classList.add("hidden");

    const xCoord = parentEle.dataset.x;
    const yCoord = parentEle.dataset.y;
    let character = event.target.textContent;
    character = character.toLowerCase();

    console.log(xCoord);
    console.log(yCoord);
    console.log(character);
    // use this data to make call to backend
};



export default {
    positionTargetBox,
    hideTargetBox,
    makeGuess
};