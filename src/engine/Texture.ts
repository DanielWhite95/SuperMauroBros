import * as utils from "../lib/utils";
import { Globals } from "./globals";
import { SimpleMaterial } from "./Materials";
import { Shader } from "./Shader";

var textureShader;
var textureDiffuseShader;
var texturePhongShader;
var textureNormalsShader;
var liquidTextureShader;

var texturesCount = 0;
var loadedText = [];


function isPowerOf2(value ) {
  return (value & (value - 1)) == 0;
}

 function textureLoaderCallback () {
     this.txId = Globals.gl.createTexture();
     Globals.gl.activeTexture(Globals.gl.TEXTURE0 + this.txNum);
     Globals.gl.bindTexture(Globals.gl.TEXTURE_2D, this.txId);
     Globals.gl.texImage2D(Globals.gl.TEXTURE_2D, 0, Globals.gl.RGBA, Globals.gl.RGBA, Globals.gl.UNSIGNED_BYTE, this);
     Globals.gl.generateMipmap(Globals.gl.TEXTURE_2D);
     Globals.gl.texParameteri(Globals.gl.TEXTURE_2D, Globals.gl.TEXTURE_MIN_FILTER, Globals.gl.LINEAR_MIPMAP_LINEAR);
     Globals.gl.texParameteri(Globals.gl.TEXTURE_2D, Globals.gl.TEXTURE_MAG_FILTER, Globals.gl.LINEAR_MIPMAP_LINEAR);
     Globals.gl.texParameteri(Globals.gl.TEXTURE_2D, Globals.gl.TEXTURE_WRAP_S, Globals.gl.REPEAT);
     Globals.gl.texParameteri(Globals.gl.TEXTURE_2D, Globals.gl.TEXTURE_WRAP_T, Globals.gl.REPEAT);

     loadedText[this.txNum] = true;
}

function normalMapLoaderCallback () {
     this.txId = Globals.gl.createTexture();
     Globals.gl.activeTexture(Globals.gl.TEXTURE0 + this.txNum);
     Globals.gl.bindTexture(Globals.gl.TEXTURE_2D, this.txId);
     Globals.gl.texImage2D(Globals.gl.TEXTURE_2D, 0, Globals.gl.RGBA, Globals.gl.RGBA, Globals.gl.UNSIGNED_BYTE, this);
     Globals.gl.generateMipmap(Globals.gl.TEXTURE_2D);
     Globals.gl.texParameteri(Globals.gl.TEXTURE_2D, Globals.gl.TEXTURE_MIN_FILTER, Globals.gl.LINEAR_MIPMAP_LINEAR);
     Globals.gl.texParameteri(Globals.gl.TEXTURE_2D, Globals.gl.TEXTURE_MAG_FILTER, Globals.gl.LINEAR_MIPMAP_LINEAR);
     Globals.gl.texParameteri(Globals.gl.TEXTURE_2D, Globals.gl.TEXTURE_WRAP_S, Globals.gl.REPEAT);
     Globals.gl.texParameteri(Globals.gl.TEXTURE_2D, Globals.gl.TEXTURE_WRAP_T, Globals.gl.REPEAT);

     loadedText[this.txNum] = true;
}

export class TextureMaterial extends SimpleMaterial {
specR
specG
specB
specA
gamma
uvTime
  image
  powerOf2
  wrap

    constructor(txFile) {
    super(255, 255, 255, 255);
    // default white specular
    this.specR = 0.0;
    this.specG = 0.0;
    this.specB = 0.0;
    this.specA = 1.0;
    this.gamma = 100;

    this.uvTime = 0.0;

        if(!textureShader)
        {
            textureShader = new Shader("vs_tex.glsl", "fs_tex.glsl", true);
        }
        this.shader  = textureShader;

        this.image = new Image();
        this.image.txNum = texturesCount;
        loadedText[texturesCount] = false;
        texturesCount++;
      this.powerOf2 = false;
      var textureDir = Globals.textureDir()
        Globals.requestCORSIfNotSameOrigin(this.image, textureDir + txFile);
        this.image.src = textureDir + txFile;
        this.image.onload = textureLoaderCallback;
    }

    isLoaded()
    {
        return loadedText[this.image.txNum];
    }

    setRepeat(boolean) {
        if(boolean) {
            this.wrap = Globals.gl.REPEAT;
        }
        else {
            this.wrap = Globals.gl.CLAMP_TO_EDGE;
        }
    }

    setUvTime(time)
    {
        this.uvTime = time;
    }


    bindShader() {

        super.bindShader();
        // setup texture

        Globals.gl.uniform1i(this.shader.getUniformLocation("uTexture"), this.image.txNum);
        var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
        var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
        var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
        Globals.gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
        Globals.gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
        Globals.gl.uniform1f(specularShineLoc, this.gamma);
        Globals.gl.uniform1f(this.shader.getUniformLocation("uvTime"), this.uvTime);
    }

}

export class TextureDiffuse extends TextureMaterial {

    constructor(txFile) {
    super(txFile);
    if(!textureDiffuseShader)
    {
        textureDiffuseShader = new Shader("vs_tex.glsl", "fs_tex_diffuse.glsl", true);
    }
    this.shader  = textureDiffuseShader;

    }


    setRepeat(boolean) {
        if(boolean) {
            this.wrap = Globals.gl.REPEAT;
        }
        else {
            this.wrap = Globals.gl.CLAMP_TO_EDGE;
        }
    }


    bindShader() {
        super.bindShader();
        // setup texture
        Globals.gl.uniform1i(this.shader.getUniformLocation("uTexture"), this.image.txNum);
        var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
        Globals.gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
    }

}


export class TextureSpecular extends TextureMaterial {

    constructor(txFile) {
    super(txFile);
    if(!texturePhongShader)
    {
        texturePhongShader = new Shader("vs_tex.glsl", "fs_tex_phong.glsl", true);
    }
    this.specR = 1.0;
    this.specG = 1.0;
    this.specB = 1.0;
    this.specA = 1.0;
    this.gamma = 100;
    this.shader  = texturePhongShader;

    }


    setRepeat(boolean) {
        if(boolean) {
            this.wrap = Globals.gl.REPEAT;
        }
        else {
            this.wrap = Globals.gl.CLAMP_TO_EDGE;
        }
    }

    setSpecularColor( specRed, specGreen, specBlue, specAlpha) {
    this.specR = specRed / 255.0;
    this.specG = specGreen / 255.0;
    this.specB = specBlue / 255.0;
    this.specA = specAlpha / 255.0;
    return this; //useful for chaining setters
    }

    setSpecularShine(gamma) {
    this.gamma = gamma;
    return this; // useful for chaining setters
    }



    bindShader() {
        super.bindShader();
        // setup texture
        Globals.gl.uniform1i(this.shader.getUniformLocation("uTexture"), this.image.txNum);
        var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
        var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
        var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
        Globals.gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
        Globals.gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
        Globals.gl.uniform1f(specularShineLoc, this.gamma);
    }

}

export class TextureWithNormals extends TextureSpecular {
  normalMap;
     constructor(txFile, nmapFile) {
        super(txFile);
        if(!textureNormalsShader)
        {
            textureNormalsShader = new Shader("vs_tex_normals.glsl", "fs_tex_phong.glsl", true);
        }
        this.specR = 1.0;
        this.specG = 1.0;
        this.specB = 1.0;
        this.specA = 1.0;
        this.gamma = 100;
        this.shader  = textureNormalsShader;

        this.normalMap = new Image();
        this.normalMap.txNum = texturesCount;
        loadedText[texturesCount] = false;
       texturesCount++;
       const textureDir = Globals.textureDir();
        Globals.requestCORSIfNotSameOrigin(this.normalMap, textureDir + nmapFile);
        this.normalMap.src = textureDir + nmapFile;
        this.normalMap.onload = normalMapLoaderCallback;
    }


    disableSpecular() {
        this.specR = 0.0;
        this.specG = 0.0;
        this.specB = 0.0;
        this.specA = 1.0;
    }

    bindShader() {
        super.bindShader();
        // setup normal map texture
        Globals.gl.uniform1i(this.shader.getUniformLocation("uNormalMap"), this.normalMap.txNum);
    }
}


export class LiquidTexture extends TextureMaterial {
    waveP;
  waveH;
  time;

    constructor(txFile) {
    super(txFile);
    if(!liquidTextureShader)
    {
        liquidTextureShader = new Shader("vs_tex_liquid.glsl", "fs_tex.glsl", true);
    }
    this.shader  = liquidTextureShader;
    this.time = 0;
    this.waveP = 10.0;

    }


    setRepeat(boolean) {
        if(boolean) {
            this.wrap = Globals.gl.REPEAT;
        }
        else {
            this.wrap = Globals.gl.CLAMP_TO_EDGE;
        }
    }

    setWavePeriod(period) {
        this.waveP = period;
    }

    setWaveHeight(height) {
        this.waveH = height;
    }

    bindShader() {
        super.bindShader();
        // setup texture
        Globals.gl.uniform1i(this.shader.getUniformLocation("uTexture"), this.image.txNum);
        Globals.gl.uniform1f(this.shader.getUniformLocation("wavePeriod"), this.waveP);
        Globals.gl.uniform1f(this.shader.getUniformLocation("waveHeight"), this.waveH);
    }

}
