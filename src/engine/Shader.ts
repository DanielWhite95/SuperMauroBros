import { Globals } from "./globals"
import * as utils from "../lib/utils"

export class Shader {
  program;
  textureLoc;
    //creates a shader from .vs and .fs files
    constructor(vsFile, fsFile, use_texture = false)
    {
        var locProgram;
        var vertexShader;
        var fragmentShader;

      const shaderDir = Globals.shaderDir()
      utils.loadFiles([shaderDir + vsFile, shaderDir + fsFile],
                            function (shaderText)
                            {
                                locProgram = Globals.gl.createProgram();

                                vertexShader = Globals.gl.createShader(Globals.gl.VERTEX_SHADER);
                                Globals.gl.shaderSource(vertexShader, shaderText[0]);
                                Globals.gl.compileShader(vertexShader);
                                if (!Globals.gl.getShaderParameter(vertexShader, Globals.gl.COMPILE_STATUS))
                                {
                                    alert("ERROR IN VS SHADER : " + Globals.gl.getShaderInfoLog(vertexShader));
                                }

                                var fragmentShader = Globals.gl.createShader(Globals.gl.FRAGMENT_SHADER);
                                Globals.gl.shaderSource(fragmentShader, shaderText[1])
                                Globals.gl.compileShader(fragmentShader);
                                if (!Globals.gl.getShaderParameter(fragmentShader, Globals.gl.COMPILE_STATUS))
                                {
                                    alert("ERROR IN FS SHADER : " + Globals.gl.getShaderInfoLog(fragmentShader));
                                }

                                Globals.gl.attachShader(locProgram, vertexShader);
                                Globals.gl.attachShader(locProgram, fragmentShader);
                                Globals.gl.linkProgram(locProgram);

                                if ( !Globals.gl.getProgramParameter( locProgram, Globals.gl.LINK_STATUS) ) {
                                var info = Globals.gl.getProgramInfoLog(locProgram);
                                alert("ERROR LINKING GL PROGRAM : " + info);
                                throw new Error('Could not compile WebGL program. \n\n' + info);
                                }

                            });

        this.program = locProgram;

        //enable and link shader attributes
            Globals.gl.enableVertexAttribArray(Globals.gl.getAttribLocation(this.program, "inPosition"));

        Globals.gl.enableVertexAttribArray(Globals.gl.getAttribLocation(this.program, "inNormal"));

        var uvsLoc = Globals.gl.getAttribLocation(this.program, "inUV");
        if (uvsLoc != -1) {
            Globals.gl.enableVertexAttribArray(uvsLoc);
                this.textureLoc = Globals.gl.getUniformLocation(this.program, "uTexture");
        }

    }

    //activates this shader
  public use()
    {
        Globals.gl.useProgram(this.program);
    }

    //getters for attributes locations
    public getPositionsLocation()		{ return Globals.gl.getAttribLocation(this.program, "inPosition"); }
    public getNormalsLocation()		{ return Globals.gl.getAttribLocation(this.program, "inNormal"); }
    public getUVsLocation()			{ return Globals.gl.getAttribLocation(this.program, "inUV"); }
    public getMatrixLocation()			{ return Globals.gl.getUniformLocation(this.program, "worldProjectionMatrix"); }
    public getWorldViewMatrixLocation()			{ return Globals.gl.getUniformLocation(this.program, "worldViewMatrix"); }
    public getNormalMatrixLocation()	{ return Globals.gl.getUniformLocation(this.program, "nMatrix"); }
    public getTextureLocation()		{return Globals.gl.getUniformLocation(this.program, "uTexture");}
    public getUniformLocation(locationName) {
    return Globals.gl.getUniformLocation(this.program, locationName);}

}
