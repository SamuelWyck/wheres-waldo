class StorageManager {
    #storageKey = "gameId";
    #storage = localStorage;


    storeGameId(gameId) {
        this.#storage.setItem(
            this.#storageKey, gameId
        );
    };


    getGameId() {
        const gameId = this.#storage.getItem(
            this.#storageKey
        );
        return gameId;
    };
};



export default new StorageManager()