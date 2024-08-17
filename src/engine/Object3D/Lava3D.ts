import { Scene } from "../Scene";
import {Object3D } from "./Object3D"

export class Lava3D extends Object3D
{
  animTime;
    constructor(mesh, material)
    {
        super(mesh, material);
        this.animTime = 0.0;

        this.material.setWaveHeight(10);
        this.material.setWavePeriod(6);
    }

    collisionHandler(object)
    {
        object.colliding = true;
        object.collisionY = true;
        object.collisionYUp = true;

        if(object == Scene.player)
            object.damage(0.01);
    }

    preUpdate()
    {
        this.animTime-=1.7;
        this.material.setUvTime(this.animTime);
    }
}
