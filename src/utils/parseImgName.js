function parseImgName(imagePath) {
    const pathParts = imagePath.split(/(?:\/|\\)/);
    const imageName = pathParts[pathParts.length - 1];

    const imageNameParts = imageName.split(".");
    const nameWithoutExt = imageNameParts[0];
    return nameWithoutExt;
};



export default parseImgName;