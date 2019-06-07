class Door3D extends GroupObject3D
{
	constructor(mesh, material, openFromRight)
	{ 
		super();

		var doorPar = new GroupObject3D(null, material);
		
		//door object
		var door = new Object3D(mesh, material);
		door.setParent(doorPar);

		if(!openFromRight)
			door.setPosition(-door.boundingBoxes[0].dx/2, 0, 0);
		else
			door.setPosition(door.boundingBoxes[0].dx/2, 0, 0);

		doorPar.addObject3D(door);
		this.addObject3D(doorPar);

		//triggers
		this.frontTrigger = new TriggerBox3D(door.boundingBoxes[0].dx*3, door.boundingBoxes[0].dy, door.boundingBoxes[0].dx*2, this);
		this.frontTrigger.setPosition(-door.boundingBoxes[0].dx/2, door.boundingBoxes[0].dy/2, door.boundingBoxes[0].dx);
		this.frontTrigger.boundingBoxes[0].setScaleCorrection(1.1, 1.1, 1.1);
		this.addObject3D(this.frontTrigger);

		this.backTrigger = new TriggerBox3D(door.boundingBoxes[0].dx*3, door.boundingBoxes[0].dy, door.boundingBoxes[0].dx*2, this);
		this.backTrigger.setPosition(-door.boundingBoxes[0].dx/2, door.boundingBoxes[0].dy/2, -door.boundingBoxes[0].dx);
		this.backTrigger.boundingBoxes[0].setScaleCorrection(1.1, 1.1, 1.1);
		this.addObject3D(this.backTrigger);

		this.animator = new LinearAnimator(doorPar);
		this.animator.enablePositionAnimation(false);
		this.animator.enableScaleAnimation(false);


		this.animator.addKeyFrame(0, 0, 0, 0, 0, 0, 1, 1, 1);

		if(!openFromRight)
			this.animator.addKeyFrame(0, 0, 0, -90, 0, 0, 1, 1, 1);
		else
			this.animator.addKeyFrame(0, 0, 0, 90, 0, 0, 1, 1, 1);

		this.frontTrigger.onTrigger = function(inst){inst.animator.playAnimation(30);}
		this.frontTrigger.onUntrigger = function(inst)
						{
								inst.animator.playReverseAnimation(30, false);
						}

		this.backTrigger.onTrigger = function(inst){inst.animator.playAnimation(30);}
		this.backTrigger.onUntrigger = function(inst)
						{
						
								inst.animator.playReverseAnimation(30, false);
						}
	}

	preUpdate()
	{
		this.animator.update();
	}
}