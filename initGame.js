import { AsteroidsRenderer } from "./AsteroidsRenderer";
import { ShotsRenderer } from "./ShotsRenderer";
import { StarsRenderer } from "./StarsRenderer";
import { StarshipRenderer } from "./StarshipRenderer";
import { ASTEROID_TEMPLATE_COLORS, ASTEROID_TEMPLATE_DEFAULT } from "./asteroidTemplates";
import { SCENE_HEIGHT, SCENE_WIDTH } from "./constants";
import { getSceneTimer } from "./sceneTimer";
import { STARSHIP_TEMPLATE_COLORS, STARSHIP_TEMPLATE_DEFAULT } from "./starshipTemplates";

const controller = document.getElementById('controller');
const canvasScene = document.getElementById('scene');
const sceneCtx = canvasScene.getContext('2d');

canvasScene.addEventListener('click', () => controller.focus());

const controllerState = {
    pressedHorizontalKey: '',
    pressedVerticalKey: '',
}

const state = {
    posX: 100,
    posY: 100,
};

const STARSHIP_COEF = 3;

function getState() {
    switch(controllerState.pressedHorizontalKey) {
        case 'ArrowRight':
            state.posX += 3;
            break;
        case 'ArrowLeft':
            state.posX -= 3;
            break;
    }

    switch(controllerState.pressedVerticalKey) {
        case 'ArrowUp':
            state.posY -= 5;
            break;
        case 'ArrowDown':
            state.posY += 5;
            break;
    }

    return state;
}

function clearScene(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT);
}

export function initGame() {
    controller.focus();

    const starsRenderer = new StarsRenderer(
        sceneCtx,
        SCENE_WIDTH,
        SCENE_HEIGHT,
    );
    
    const starshipRenderer = new StarshipRenderer(
        sceneCtx,
        STARSHIP_TEMPLATE_DEFAULT,
        STARSHIP_TEMPLATE_COLORS
    );

    const asteroidsRenderer = new AsteroidsRenderer(
        sceneCtx,
        ASTEROID_TEMPLATE_DEFAULT,
        ASTEROID_TEMPLATE_COLORS,
        SCENE_WIDTH,
        SCENE_HEIGHT,
    );
    
    const shotRenderer = new ShotsRenderer(
        sceneCtx,
        SCENE_WIDTH,
    )

    const keydownActionsMap = {
        ArrowUp: () => {
            controllerState.pressedVerticalKey = 'ArrowUp';
        },
        ArrowDown: () => {
            controllerState.pressedVerticalKey = 'ArrowDown';
        },
        ArrowRight: () => {
            controllerState.pressedHorizontalKey = 'ArrowRight';
        },
        ArrowLeft: () => {
            controllerState.pressedHorizontalKey = 'ArrowLeft';
        },
        Space: () => {
            shotRenderer.addShot(
                state.posX + 20, 
                state.posY
            );
            shotRenderer.addShot(
                state.posX + 20, 
                state.posY + 
                    STARSHIP_TEMPLATE_DEFAULT.length * STARSHIP_COEF
                );
        }
    };

    const keyupActionsMap = {
        ArrowUp: () => {
            controllerState.pressedVerticalKey = '';
        },
        ArrowDown: () => {
            controllerState.pressedVerticalKey = '';
        },
        ArrowRight: () => {
            controllerState.pressedHorizontalKey = '';
        },
        ArrowLeft: () => {
            controllerState.pressedHorizontalKey = '';
        },
    };

    function handleKeyDown(event) {
        keydownActionsMap[event.code]?.();
    }

    function handleKeyUp(event) {
        keyupActionsMap[event.code]?.();
    }

    controller.addEventListener('keydown', handleKeyDown);
    controller.addEventListener('keyup', handleKeyUp);

    const renderFns = [
        clearScene,
        starsRenderer.moveStars,
        (_, currentState) => starshipRenderer.renderStarship(currentState.posX, currentState.posY, 3),
        asteroidsRenderer.moveAsteroids,
        () => {
            shotRenderer.moveShots(() => {
                shotRenderer.shots.forEach((shot) => {
                    const foundAsteroidIndex = 
                        asteroidsRenderer.asteroids.findIndex((asteroid) => {
                            return (shot.x >= asteroid.x && shot.x <= asteroid.x + 10) 
                                && (shot.y >= asteroid.y && shot.y <= asteroid.y + 80); 
                        });
                    
                    if (foundAsteroidIndex > -1) {
                        const asteroid =  asteroidsRenderer.asteroids[foundAsteroidIndex];
                        asteroid.x = asteroid.initX;
                        shot.y = SCENE_HEIGHT + 10;
                    }
                });
            });
        },
    ];

    const sceneTimer = getSceneTimer(
        renderFns,
        sceneCtx,
        getState,
        10,
    );

    sceneTimer();
}
