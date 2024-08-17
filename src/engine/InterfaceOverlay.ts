import { Globals } from "./globals";
import { SimpleMaterial } from "./Materials";
import { Box3D } from "./Object3D/TriggerBox3D";
import { TextureMaterial } from "./Texture";
import * as utils from "../lib/utils"
import { Scene } from "./Scene";

export class InterfaceOverlay
{
    public static bar: any;
    public static healthBar: Box3D;
    public static energyBar: Box3D;
    public static gameOverScreen: Box3D;
    public static key: Box3D;
    public static credits1: Box3D;
    public static damage: Box3D;
    public static credits2: any;
    public static init()
    {
        InterfaceOverlay.bar = new Box3D(0.25, 0.5, 0, new TextureMaterial("health_energy_bar.png"));
        InterfaceOverlay.bar.setPosition(-0.7, -0.7, -0.1);
        InterfaceOverlay.bar.setRotation(0, 0, 90);

        //health bar
        InterfaceOverlay.healthBar = new Box3D(0.32, 0.8, 0, new SimpleMaterial(255, 0, 0, 150));
        InterfaceOverlay.healthBar.setPosition(-0.20, 0.07, 0);
        InterfaceOverlay.healthBar.setParent(InterfaceOverlay.bar);

        //energy bar
        InterfaceOverlay.energyBar = new Box3D(0.32, 0.8, 0, new SimpleMaterial(10, 100, 255, 150));
        InterfaceOverlay.energyBar.setPosition(0.21, 0.07, 0);
        InterfaceOverlay.energyBar.setParent(InterfaceOverlay.bar);

        InterfaceOverlay.gameOverScreen = new Box3D(2, 2, 0, new TextureMaterial("gameover.jpg"));
        InterfaceOverlay.gameOverScreen.setRotation(0, 0, 90);

        InterfaceOverlay.key = new Box3D(0.3, 0.5, 0, new TextureMaterial("key.png"));
        InterfaceOverlay.key.setPosition(-0.7, -0.4, 0);
        InterfaceOverlay.key.setRotation(0, 0, 90);

        //credists screens
        InterfaceOverlay.credits1  = new Box3D(0.4, 0.8, 0, new TextureMaterial("credits1.png"));
        InterfaceOverlay.credits1.setRotation(0, 0, 90);
        InterfaceOverlay.credits1.setPosition(0.5, 0.5, 0);

        InterfaceOverlay.credits2  = new Box3D(0.4, 0.8, 0, new TextureMaterial("credits2.png"));
        InterfaceOverlay.credits2.setRotation(0, 0, 90);
        InterfaceOverlay.credits2.setPosition(-0.5, -0.5, 0);

        //damage screen
        InterfaceOverlay.damage  = new Box3D(2, 2, 0, new TextureMaterial("damage.png"));
        InterfaceOverlay.damage.setRotation(0, 0, 90);
        InterfaceOverlay.damage.setPosition(0, 0, 0.1);
    }

    public static render()
    {
        //parallel projection
        Globals.viewMatrix = utils.identityMatrix() as unknown as number[][];
        Globals.projectionMatrix = utils.identityMatrix() as unknown as number[][];

        //update health and energy from player
        InterfaceOverlay.healthBar.setScale(0.32, 0.8*Scene.player.health, 0);
      InterfaceOverlay.energyBar.setScale(0.32, 0.8*Scene.player.energy, 0);

        if(Scene.player.damagedTime >= 0)
            InterfaceOverlay.damage.render();

        if(Scene.player.hasKey)
            InterfaceOverlay.key.render();



        InterfaceOverlay.healthBar.render();
        InterfaceOverlay.energyBar.render();
        InterfaceOverlay.bar.render();
    }

    public static renderGameOver()
    {
        //parallel projection
      Globals.viewMatrix = utils.identityMatrix() as unknown as number[][];
        Globals.projectionMatrix = utils.identityMatrix() as unknown as number[][];

        InterfaceOverlay.gameOverScreen.render();
    }

    public static renderCredits()
    {
        //parallel projection
        Globals.viewMatrix = utils.identityMatrix() as unknown as number[][];
        Globals.projectionMatrix = utils.identityMatrix() as unknown as number[][];

        InterfaceOverlay.credits1.render();
        InterfaceOverlay.credits2.render();
    }
}
