class Object3D
{
	constructor(mesh, shader)
	{
		//position
		this.x = 0;
		this.y = 0;
		this.z = 0;

		//rotation
		this.rotx = 0;
		this.roty = 0;
		this.rotz = 0;

		//scale
		this.scaleX = 1.0;
		this.scaleY = 1.0;
		this.scaleZ = 1.0;

		//speed
		this.speedX = 0;
		this.speedY = 0;
		this.speedZ = 0;
		
		//reference to a loaded shader
		this.mesh = mesh || null;
		this.shader = shader || null;

		//bounding box coordinates
		var minX = 1000000;
		var maxX = -100000;
		var minY = 1000000;
		var maxY = -100000;
		var minZ = 1000000;
		var maxZ = -100000;
		//computes bounding box coords
		for(var i=0; i<mesh.positions.length; i+=3)
		{
			if(mesh.positions[i]<minX)
				minX = mesh.positions[i];
			if(mesh.positions[i]>maxX)
				maxX = mesh.positions[i];

			if(mesh.positions[i+1]<minY)
				minY = mesh.positions[i+1];
			if(mesh.positions[i+1]>maxY)
				maxY = mesh.positions[i+1];

			if(mesh.positions[i+2]<minZ)
				minZ = mesh.positions[i+2];
			if(mesh.positions[i+2]>maxZ)
				maxZ = mesh.positions[i+2];
		}
		//computes center of the mesh (in case it's not the origin)
		var cX = (maxX-minX)/2.0 + minX;
		var cY = (maxY-minY)/2.0 + minY;
		var cZ = (maxZ-minZ)/2.0 + minZ;

		this.boundingBox = new BoundingBox(cX, cY, cZ, 
											minX, maxX, minY, maxY, minZ, maxZ);
		this.boundingBox.update(this.x, this.y, this.z, 
								this.scaleX, this.scaleY, this.scaleZ);
	}

	setPosition(x, y, z)
	{
		this.x = x;		this.y = y;		this.z = z;
		this.boundingBox.update(this.x, this.y, this.z, 
								this.scaleX, this.scaleY, this.scaleZ);
	}

	move(x, y, z)
	{
		this.x += x;	this.y += y;	this.z += z;
		this.boundingBox.update(this.x, this.y, this.z, 
								this.scaleX, this.scaleY, this.scaleZ);
	}

	setRotation(x, y, z)
	{
		this.rotx = x;	this.roty = y;	this.rotz = z;
	}

	rotate(x, y, z)
	{
		this.rotx += x;	this.roty += y;	this.rotz += z;
	}

	setScale(x, y, z)
	{
		this.scaleX = x; this.scaleY = y; this.scaleZ = z;
		this.boundingBox.update(this.x, this.y, this.z, 
								this.scaleX, this.scaleY, this.scaleZ);
	}

	setSpeed(x, y, z)
	{
		this.speedX = x;	this.speedY = y;	this.speedZ = z;
	}

	render()
	{
		//renders bounding box
		if(showBoundingBoxes)
			this.boundingBox.render();

		//renders object
		var worldMatrix = utils.MakeWorld_(this.x, this.y, this.z, 
										this.rotx, this.roty, this.rotz, 
										this.scaleX, this.scaleY, this.scaleZ);

		this.mesh.render(this.shader, worldMatrix);
	}

	checkCollision(object)
	{
		return this.boundingBox.checkCollision(object.boundingBox);
	}

	solveCollision(object)
	{
		//collision from x++
		if(this.boundingBox.maxX >= object.boundingBox.maxX	&& 	this.boundingBox.minX <= object.boundingBox.maxX	&&	this.speedX<0) 
			this.speedX = 0;

		//collision from x--
		if(this.boundingBox.maxX >= object.boundingBox.minX	&& 	this.boundingBox.minX <= object.boundingBox.minX	&&	this.speedX>0)
			this.speedX = 0;

		//collision from z++
		if(this.boundingBox.maxZ >= object.boundingBox.maxZ	&& 	this.boundingBox.minZ <= object.boundingBox.maxZ	&&	this.speedZ<0)
			this.speedZ = 0;

		//collision from z--
		if(this.boundingBox.maxZ >= object.boundingBox.minZ	&& 	this.boundingBox.minZ <= object.boundingBox.minZ	&&	this.speedZ>0) 
			this.speedZ = 0;

	}

	//update physics
	updatePhysics()
	{
		this.x += this.speedX;
		this.y += this.speedY;
		this.z += this.speedZ;

		this.boundingBox.update(this.x, this.y, this.z, 
								this.scaleX, this.scaleY, this.scaleZ);
	}

}