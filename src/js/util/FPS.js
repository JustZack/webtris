export default class FPS {
    baseFPS = 60;
    static setBaseFPS(newBaseFPS) {
        FPS.baseFPS = newBaseFPS;
    }
    static getBaseFPS() {
        return FPS.baseFPS;
    }
    static ToMs(fps, setFps = undefined) {
        if (setFps == undefined) setFps = FPS.getBaseFPS();
        return (fps/setFps) * 1000;
    }
}