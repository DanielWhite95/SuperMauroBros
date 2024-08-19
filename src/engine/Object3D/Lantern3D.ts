import { Animator } from "../Animator";
import { SimpleMaterial } from "../Materials";
import { GroupObject3D } from "./GroupObject3D";
import { Object3D } from "./Object3D";

export class Lantern3D extends GroupObject3D
{
  animator
  animateColor
  animateColorState
    linkedLight: any;
    constructor(mesh, interiorMesh, material, light = null)
    {
      super();

        var mainObj = new Object3D(mesh, material);
        mainObj.setScale(2, 2, 2);
        this.addObject3D(mainObj);
        this.linkLight(light);

        this.addObject3D(new Object3D(interiorMesh, new SimpleMaterial(0, 0, 0, 255)));

        this.animator = new Animator(mainObj);
        this.animator.enablePositionAnimation(true);
        this.animator.enableRotationAnimation(false);
        this.animator.enableScaleAnimation(false);

        this.animateColor = false;
        this.animateColorState = 0;

    }

    linkLight(light)
    {
        this.linkedLight = light;
    }

    collisionHandler(object)
    {

    }


    preUpdate()
    {
        this.objects[1].setParent(this.objects[0]);

        var worldPos = this.objects[0].getWorldPosition();
        if(this.linkedLight)
        {
            this.linkedLight.setPosition(worldPos[0], worldPos[1], worldPos[2]);

            if(this.animateColor)
            {
                switch(this.animateColorState)
                {
                    case 0:
                        if(this.linkedLight.Rcolor >= 1.0)
                            this.animateColorState = 1;
                        else
                        {
                            this.linkedLight.Rcolor+=0.01;
                            this.linkedLight.Gcolor-=0.01;
                            this.linkedLight.Bcolor-=0.01;

                            if(this.linkedLight.Gcolor <= 0.0)
                                this.linkedLight.Gcolor = 0.0;
                            if(this.linkedLight.Bcolor <= 0.0)
                                this.linkedLight.Bcolor = 0.0;
                        }
                    break;

                    case 1:
                        if(this.linkedLight.Gcolor >= 1.0)
                            this.animateColorState = 2;
                        else
                        {
                            this.linkedLight.Rcolor-=0.01;
                            this.linkedLight.Gcolor+=0.01;
                            this.linkedLight.Bcolor-=0.01;

                            if(this.linkedLight.Rcolor <= 0.0)
                                this.linkedLight.Rcolor = 0.0;
                            if(this.linkedLight.Bcolor <= 0.0)
                                this.linkedLight.Bcolor = 0.0;
                        }
                    break;

                    case 2:
                        if(this.linkedLight.Bcolor >= 1.0)
                            this.animateColorState = 0;
                        else
                        {
                            this.linkedLight.Rcolor-=0.01;
                            this.linkedLight.Gcolor-=0.01;
                            this.linkedLight.Bcolor+=0.01;

                            if(this.linkedLight.Rcolor <= 0.0)
                                this.linkedLight.Rcolor = 0.0;
                            if(this.linkedLight.Gcolor <= 0.0)
                                this.linkedLight.Gcolor = 0.0;
                        }
                    break;
                }
            }

            this.objects[1].material.setDiffuseColor(this.linkedLight.Rcolor*255, this.linkedLight.Gcolor*255, this.linkedLight.Bcolor*255, 255);
        }
        if(this.animator.duration > 0)
            this.animator.update();
    }
}
