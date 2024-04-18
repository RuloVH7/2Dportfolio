// Run the following files after you start
// npm create vite@latest .
// npm instLL kaboom
// npm -D install terser

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
// Create the map. Using a scale factor from the constanst.js
    const map = k.make([
        // Name of the sprite we are going to create
        k.sprite("map"),
        // Initial position
        k.pos(0),
        k.scale(scaleFactor)
    ])
    const player = k.make([
        k.sprite("spritesheet", {anim: "idle_down"}), 
        k.area({
            shape:  new k.Rect(k.vec2(0,3), 10, 10),
        }),
        k.body(),
        k.anchor("center"),
        k.pos(),
        k.scale(scaleFactor),
        // Bring attributes that are present in method player such as speed, direction, is in dialog
        {
            speed: 250,
            directon: "down",
            isInDialogue: false,
        },
        "player", 
    ]);

    for (const layer of layers){
        if(layer.name == "boundaries"){
            for (const boundary of layer.objects){
                map.add([
                    k.area([
                        shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
                    ]),
                    k.body({ isStatic: true}),
                    k.pos(boundary.x, boundary.y),
                    boundary.name,
                ]);

                if(boundary.name){
                    player.onCollide(boundary.name, () => {
                        player.isInDialogue = true;
                        // TO DO
                    });
                }
            }
        }
    }
});

k.go("main");