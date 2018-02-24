declare function createLoading(opts?: { [x: string]: any; }): {
    // [x: string]: any;
    extraReducers: { [x: string]: any; };
    onEffect: () => void;
};

export default createLoading;

export interface LoadingState {
    global: boolean,
    effects: { [x: string]: boolean },
    models: { [x: string]: boolean },
}
