import apiManager from "./apiManager.js";



function positionTargetBox(event) {
    if (!event.target.matches(".game-image")) {
        return;
    }
    const infoModal = document.querySelector(".info-modal");
    infoModal.classList.add("hidden");
    if (event.target.matches(".zoom-out")) {
        return;
    }
    
    showTargetBox(event);
};


function showTargetBox(event) {
    const xCoord = event.offsetX;
    const yCoord = event.offsetY;

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
        targetBoxWidth,
        targetBoxHeight,
        leftCoord,
        topCoord
    );
    
    targetBox.style.top = `${topCoord}px`;
    targetBox.style.left = `${leftCoord}px`;

    positionTargetBtns(targetBox, event.clientX, event.clientY);

    const btns = targetBox.firstChild;
    btns.dataset.x = leftCoord;
    btns.dataset.y = topCoord;

    targetBox.classList.remove("hidden");
};


function clampCoords(width, height, xCoord, yCoord) {
    const image = document.querySelector(".game-image");
    
    const imageWidth = image.clientWidth;
    const imageHeight = image.clientHeight;

    if (xCoord < 0) {
        xCoord = 0;
    } else if (xCoord + width > imageWidth) {
        xCoord = imageWidth - width;
    }
    if (yCoord < 0) {
        yCoord = 0;
    } else if (yCoord + height > imageHeight) {
        yCoord = imageHeight - height;
    }
    
    return [xCoord, yCoord];
};


function positionTargetBtns(targetBox, xCoord, yCoord) {
    const btns = targetBox.firstChild;
    const screenMidX = window.outerWidth / 2;
    const screenMidY = window.outerHeight / 2;

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
    
    const xCoord = parentEle.dataset.x;
    const yCoord = parentEle.dataset.y;
    const character = event.target.textContent.toLowerCase();

    const image = document.querySelector(".game-image");
    const imageWidth = image.clientWidth;
    const imageHeight = image.clientHeight;

    targetBox.classList.add("hidden");

    let reqBody = {
        xCoord,
        yCoord,
        imageWidth,
        imageHeight,
        character
    };
    reqBody = JSON.stringify(reqBody);

    const res = await apiManager.makeGuess(reqBody);   
    return [res, {x: xCoord, y: yCoord}];
};


function showLeaderboardForm() {
    const leaderBoardModal = document.querySelector(
        ".form-modal"
    );

    leaderBoardModal.classList.remove("hidden");
};


function handleZoom() {
    const charMarkers = document.querySelectorAll(
        ".character-marker"
    );
    const gameImg = document.querySelector(".game-image");

    const oldWidth = gameImg.clientWidth;
    const oldHeight = gameImg.clientHeight;
    gameImg.classList.toggle("zoom-out");
    const newWidth = gameImg.clientWidth;
    const newHeight = gameImg.clientHeight;

    for (let marker of charMarkers) {
        const oldX = parsePixelNumber(marker.style.left);
        const oldY = parsePixelNumber(marker.style.top);
        const newX = newWidth * (oldX / oldWidth);
        const newY = newHeight * (oldY / oldHeight);
        marker.style.top = `${newY}px`;
        marker.style.left = `${newX}px`;
    };

    hideTargetBox();
};


function parsePixelNumber(pxNumber) {
    const numberIndex = 0;
    const numberParts = pxNumber.split("p");
    return Number(numberParts[numberIndex]);
};


function handleHelp() {
    const infoModal = document.querySelector(".info-modal");
    infoModal.classList.toggle("hidden");
};



export default {
    positionTargetBox,
    hideTargetBox,
    makeGuess,
    showLeaderboardForm,
    handleZoom,
    handleHelp
};