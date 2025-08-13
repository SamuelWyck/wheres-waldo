class ApiManager {
    #apiDomain = "http://localhost:3000";


    async #makeApiCall(url, options) {
        const res = await fetch(url, options);
        const jsonRes = await res.json();
        return jsonRes;
    };


    async getIcons() {
        const url = `${this.#apiDomain}/assets/icons`;
        const options = {
            method: "GET",
            mode: "cors"
        };

        const response = await this.#makeApiCall(url, options);
        return response;
    };
};



export default new ApiManager();