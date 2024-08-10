export default class FPS {
    static ToMs(fps, setFps = 60) {
        return (fps/setFps) * 1000;
    }
}