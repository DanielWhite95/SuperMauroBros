import { Object3D } from "./Object3D";

export class DestroyableObject3D extends Object3D
{
    damagedMaterial: any;
    standardMaterial: any;
    damagedTime: number;
    constructor(mesh, material, damagedMaterial)
    {
        super(mesh, material);

        this.damagedMaterial = damagedMaterial;
        this.standardMaterial = material;
        this.damagedTime = 0;
    }

  public preUpdate()
    {
        this.damagedTime++;

        if(this.damagedTime > 15)
        {
            this.setMaterial(this.standardMaterial);
        }
    }

    public damage(val)
    {
        this.setMaterial(this.damagedMaterial);
        this.damagedTime = 0;

        this.health -= val;
        if(this.health <= 0)
        {
            this.removeFromScene();
        }
    }
}
