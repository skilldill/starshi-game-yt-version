export function getSceneTimer(fns, ctx, getState, interval = 100) {
    let startTime = 0;

    function sceneTimer(timeStamp = 0) {
        const deltaTime = timeStamp - startTime;
        
        if (deltaTime >= interval) {
            const currentState = getState();
            startTime = timeStamp;
            fns.forEach((fn) => fn(ctx, currentState));
        }
        requestAnimationFrame(sceneTimer);
    }

    return sceneTimer;
}