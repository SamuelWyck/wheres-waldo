import storageManager from "./storageManager.js";



class ApiManager {
    #apiDomain = "http://localhost:3000";
    #storage = storageManager;



    async #makeApiCall(url, options) {
        const res = await fetch(url, options);
        const jsonRes = await res.json();
        return jsonRes;
    };


    async getIcons() {
        const url = `${this.#apiDomain}/icons`;
        const options = {
            method: "GET",
            mode: "cors"
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    };


    async startGame(imageId) {
        const url = `${this.#apiDomain}/play/start/${imageId}`;
        const options = {
            method: "GET",
            mode: "cors"
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    };


    async makeGuess(reqBody) {
        const url = `${this.#apiDomain}/play/guess`;
        const gameId = this.#storage.getGameId();
        const options = {
            method: "POST",
            mode: "cors",
            headers: {
                gameid: gameId,
                "content-type": "application/json"
            },
            body: reqBody
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    };


    async leaderboardPost(reqBody) {
        const url = `${this.#apiDomain}/leaderboard/new`;
        const gameId = this.#storage.getGameId();
        const options = {
            mode: "cors",
            method: "POST",
            headers: {
                gameid: gameId,
                "content-type": "application/json"
            },
            body: reqBody
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    };
};



export default new ApiManager();