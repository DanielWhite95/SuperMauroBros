import { Scene } from "../Scene";
import { Object3D } from "./Object3D";


export class Key3D extends Object3D
{
    constructor(mesh, material)
    {
        super(mesh, material);
        this.setRotation(90, 0, 0);
        this.boundingBoxes[0].setScaleCorrection(20, 5, 3);
    }

    collisionHandler(object)
    {
        if(object == Scene.player)
        {
            object.hasKey = true;
            this.removeFromScene();
        }
    }

    preUpdate()
    {
        this.rotate(0, 1, 0);
    }
}
