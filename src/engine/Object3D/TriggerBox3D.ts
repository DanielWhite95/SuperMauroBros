import { Scene } from "../Scene";
import { GroupObject3D } from "./GroupObject3D";

export class Box3D extends GroupObject3D
{
    //construct a box by given dimensions
    constructor(dimX, dimY, dimZ, material = null)
    {
        super(Scene.unitCubeTexMesh, material);
        this.setScale(dimX, dimY, dimZ);
    }
}

export class TriggerBox3D extends Box3D
{
  avoidProjectiles
  oneShot
  triggered
  instance
  collided
    //creates an invisible box objects that uses collisions to trigger actions
    constructor(dimX, dimY, dimZ, instance = null)
    {
        super(dimX, dimY, dimZ);
        this.boundingBoxes[0].nonCollidedColor = [0, 255, 0, 240];
        this.setVisible(false);
        this.avoidProjectiles = true;
        this.oneShot = false;

        this.triggered = false;
        this.instance = instance;
    }

    enableOneShot(bool)
    {
        this.oneShot = bool;
    }

    preUpdate()
    {
        if(!this.collided && this.triggered)
        {
            this.triggered = false;
            this.onUntrigger(this.instance);
        }

        this.collided = false;
    }

    //override default collision handler
    collisionHandler(object)
    {
        if(object != Scene.player)
            return;

        this.collided = true;
        object.colliding = true;

        if(!this.triggered)
        {
            this.triggered = true;
            this.onTrigger(this.instance);
            if(this.oneShot)
                this.removeFromScene();
        }

        this.onCollide(this.instance);
    }

    onTrigger(instance)
    {}

    onUntrigger(instance)
    {}

    onCollide(instance)
    {}

    isTriggered()
    {
        return this.triggered;
    }

    isColliding()
    {
        return this.colliding;
    }
}
