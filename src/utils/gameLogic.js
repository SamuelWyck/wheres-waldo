import apiManager from "./apiManager.js";



function positionTargetBox(event) {
    if (!event.target.matches(".game-image")) {
        return;
    }
    const infoModal = document.querySelector(".info-modal");
    infoModal.classList.add("hidden");
    
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
    const gameImg = document.querySelector(".game-image");
    gameImg.classList.toggle("zoom-out");
    const newWidth = gameImg.clientWidth;
    const newHeight = gameImg.clientHeight;
    
    positionMarkers(newWidth, newHeight);
    hideTargetBox();
    resizeTargetBox(newWidth);
};


function parsePixelNumber(pxNumber) {
    const numberIndex = 0;
    const numberParts = pxNumber.split("p");
    return Number(numberParts[numberIndex]);
};


function resizeTargetBox(imageWidth) {
    const targetBox = document.querySelector(".target-box");
    const targetBoxWidthRatio = .0085;
    const newTargetBoxWidth = imageWidth * targetBoxWidthRatio;
    targetBox.style.width = `${newTargetBoxWidth}px`;
    targetBox.style.height = `${newTargetBoxWidth}px`;
};


function positionMarkers(newWidth, newHeight) {
    const charMarkers = document.querySelectorAll(
        ".character-marker"
    );

    for (let marker of charMarkers) {
        const oldWidth = Number(marker.dataset.imgwidth);
        const oldHeight = Number(marker.dataset.imgheight);
        const oldX = parsePixelNumber(marker.style.left);
        const oldY = parsePixelNumber(marker.style.top);
        const newX = newWidth * (oldX / oldWidth);
        const newY = newHeight * (oldY / oldHeight);
        marker.style.top = `${newY}px`;
        marker.style.left = `${newX}px`;
        marker.dataset.imgwidth = newWidth;
        marker.dataset.imgheight = newHeight;
    };
};


function handleHelp() {
    const infoModal = document.querySelector(".info-modal");
    infoModal.classList.toggle("hidden");
};


function handleResize() {
    const gameImg = document.querySelector(".game-image");
    if (!gameImg.matches(".zoom-out")) {
        return;
    }

    const newWidth = gameImg.clientWidth;
    const newHeight = gameImg.clientHeight;
    resizeTargetBox(newWidth);
    positionMarkers(newWidth, newHeight);
};


function getGameImgSize() {
    const gameImg = document.querySelector(".game-image");
    return [gameImg.clientWidth, gameImg.clientHeight];
};



export default {
    positionTargetBox,
    hideTargetBox,
    makeGuess,
    showLeaderboardForm,
    handleZoom,
    handleHelp,
    handleResize,
    getGameImgSize
};