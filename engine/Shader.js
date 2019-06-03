class Shader
{
	//creates a shader from .vs and .fs files
	constructor(vsFile, fsFile)
	{
		var locProgram;
		var vertexShader;
		var fragmentShader;

		utils.loadFiles([shaderDir + vsFile, shaderDir + fsFile], 
							function (shaderText) 
							{
      							locProgram = gl.createProgram();

								vertexShader = gl.createShader(gl.VERTEX_SHADER);
							        console.log("Vertex shader source for "+ vsFile + ":\n" + shaderText[0] );
								gl.shaderSource(vertexShader, shaderText[0]);
								gl.compileShader(vertexShader);
								if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) 
								{
									alert("ERROR IN VS SHADER : " + gl.getShaderInfoLog(vertexShader));
								}

								var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
								gl.shaderSource(fragmentShader, shaderText[1])
							        console.log("Fragment shader source for "+ fsFile + ":\n" + shaderText[1] );
								gl.compileShader(fragmentShader);		
								if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) 
								{
									alert("ERROR IN FS SHADER : " + gl.getShaderInfoLog(fragmentShader));
								}	

								gl.attachShader(locProgram, vertexShader);
								gl.attachShader(locProgram, fragmentShader);
							    gl.linkProgram(locProgram);
							    
							    if ( !gl.getProgramParameter( locProgram, gl.LINK_STATUS) ) {
								var info = gl.getProgramInfoLog(locProgram);
								alert("ERROR LINKING GL PROGRAM : " + info);
								throw new Error('Could not compile WebGL program. \n\n' + info);
							    }

      						});

		this.program = locProgram;

		//enable and link shader attributes
		this.positionsLoc = gl.getAttribLocation(this.program, "inPosition");
		gl.enableVertexAttribArray(this.positionsLoc);

		this.normalsLoc = gl.getAttribLocation(this.program, "inNormal");
		gl.enableVertexAttribArray(this.normalsLoc);

		this.uvsLoc = gl.getAttribLocation(this.program, "inUV");
		gl.enableVertexAttribArray(this.uvsLoc);

		this.matrixLoc = gl.getUniformLocation(this.program, "worldProjectionMatrix");
	    this.wvMatrixLoc = gl.getUniformLocation(this.program, "worldViewMatrix");
		this.nMatrixLoc = gl.getUniformLocation(this.program, "nMatrix");
		this.colorLoc = gl.getUniformLocation(this.program, "color");

		//gl.enableVertexAttribArray(getAttributeLocation("inTextCoord");

	}

	//activates this shader
	use()
	{
		gl.useProgram(this.program);
	}

	//getters for attributes locations
	getPositionsLocation()		{ return this.positionLoc; }
	getNormalsLocation()		{ return this.normalsLoc; }
	getUVsLocation()			{ return this.uvsLoc; }
	getMatrixLocation()			{ return this.matrixLoc; }
	getWorldViewMatrixLocation()			{ return this.wvMatrixLoc; }
	getNormalMatrixLocation()	{ return this.nMatrixLoc; }

	getColorLocation()			{ return this.colorLoc; }
	getUniformLocation(locationName) {
		return gl.getUniformLocation(this.program, locationName);}

}
