export default class FPS {
    static ToMs(fps, setFps) {
        return (fps/setFps) * 1000;
    }
}