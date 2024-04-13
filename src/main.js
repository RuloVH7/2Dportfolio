// Import Kaboom instance from the file we created
import { scaleFactor } from "./constants";
import { k } from "./kaboomCtx"

// Load an image as a sprite with the method loadSprite
k.loadSprite("spritesheet", "./spritesheet.png", {
    // Set the length of the tiles
    sliceX: 39,
    sliceY: 31,
    // Specific names to the animations we have 
    anims: {
       "idle-down": 936,
       "walk-down":{from: 936, to:939, loop: true, speed: 8},
       "idle-side": 975,
       "walk-side":{from: 975, to:978, loop: true, speed: 8},
       "idle-up": 1014,
       "walk-up":{from: 1014, to:1017, loop: true, speed: 8},
    },
});

k.loadSprite("map", "./map.png");

//Create a background
k.setBackground(k.Color.fromHex("#311047"))

//Create a scene
k.scene("main", async () => {
    const mapData = await (await fetch("./map.json")).json()
    const layers = mapData.layers;

    const map = k.make([
        k.sprite("map"),
        k.pos(0),
        k.scale(scaleFactor)
    ])
});

k.go("main");