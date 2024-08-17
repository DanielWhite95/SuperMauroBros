import { Globals } from "./globals";
import { Shader } from "./Shader";
import { Light } from "./Lights";

var lambertShader;
var phongShader;
var toonShader;
var simpleShader;

export class SimpleMaterial {
  diffR: number;
  diffG: number;
  diffB: number;
  diffA: number;
  ambR: number;
  ambG = 0.0;
  ambB = 0.0;
  ambA = 0.0;
  // low light ambient
  ambLR = 0.0;
  ambLG = 0.0;
  ambLB = 0.0;
  // upper light ambient
  ambLA = 0.0;
  ambHR = 0.0;
  ambHG = 0.0;
  ambHB = 0.0;
  ambHA = 0.0;
  //  light ambient direction
  ambX = 0;
  ambY = 0;
  ambZ = 1;
  emitR = 0.0;
  emitG = 0.0;
  emitB = 0.0;
  emitA = 1.0;
  shader: Shader;

  constructor(
    diffRed: number,
    diffGreen: number,
    diffBlue: number,
    diffAlpha: number,
  ) {
    this.diffR = diffRed / 255.0;
    this.diffG = diffGreen / 255.0;
    this.diffB = diffBlue / 255.0;
    this.diffA = diffAlpha / 255.0;
    if (!simpleShader) {
      simpleShader = new Shader("vs_3.glsl", "fs_simple.glsl");
    }
    this.shader = simpleShader;
  }

  setDiffuseColor(
    diffRed: number,
    diffGreen: number,
    diffBlue: number,
    diffAlpha: number,
  ) {
    this.diffR = diffRed / 255.0;
    this.diffG = diffGreen / 255.0;
    this.diffB = diffBlue / 255.0;
    this.diffA = diffAlpha / 255.0;
  }

  setAmbientLowColor(
    ambRed: number,
    ambGreen: number,
    ambBlue: number,
    ambAlpha: number,
  ) {
    this.ambLR = ambRed / 255.0;
    this.ambLG = ambGreen / 255.0;
    this.ambLB = ambBlue / 255.0;
    this.ambLA = ambAlpha / 255.0;
  }

  setAmbientHighColor(
    ambRed: number,
    ambGreen: number,
    ambBlue: number,
    ambAlpha: number,
  ) {
    this.ambHR = ambRed / 255.0;
    this.ambHG = ambGreen / 255.0;
    this.ambHB = ambBlue / 255.0;
    this.ambHA = ambAlpha / 255.0;
  }

  setAmbientDirection(ambX, ambY, ambZ) {
    this.ambX = ambX;
    this.ambY = ambY;
    this.ambZ = ambZ;
  }

  setMaterialAmbient(mambR, mambG, mambB, mambA) {
    this.ambR = mambR / 255.0;
    this.ambG = mambG / 255.0;
    this.ambB = mambB / 255.0;
    this.ambA = mambA / 255.0;
  }

  setEmissionColor(emitRed, emitGreen, emitBlue, emitAlpha) {
    this.emitR = emitRed / 255.0;
    this.emitG = emitGreen / 255.0;
    this.emitB = emitBlue / 255.0;
    this.emitA = emitAlpha / 255.0;
  }

  isLoaded() {
    return true;
  }

  bindShader() {
    this.shader.use();
    Light.bindAllLights(this.shader);
    var materialDiffLoc = this.shader.getUniformLocation("mColor");
    var materialAmbientLoc = this.shader.getUniformLocation("mAmbientColor");
    var materialEmitLoc = this.shader.getUniformLocation("mEmitColor");
    var ambHLoc = this.shader.getUniformLocation("ambientHighColor");
    var ambLLoc = this.shader.getUniformLocation("ambientLowColor");
    var ambDLoc = this.shader.getUniformLocation("ambientDir");

    Globals.gl.uniform4f(
      materialDiffLoc,
      this.diffR,
      this.diffG,
      this.diffB,
      this.diffA,
    );
    Globals.gl.uniform4f(
      materialAmbientLoc,
      this.ambR,
      this.ambG,
      this.ambB,
      this.ambA,
    );
    Globals.gl.uniform4f(
      materialEmitLoc,
      this.emitR,
      this.emitG,
      this.emitB,
      this.emitA,
    );
    if (ambDLoc) {
      Globals.gl.uniform4f(
        ambLLoc,
        this.ambLR,
        this.ambLG,
        this.ambLB,
        this.ambLA,
      );
      Globals.gl.uniform4f(
        ambHLoc,
        this.ambHR,
        this.ambHG,
        this.ambHB,
        this.ambHA,
      );
      Globals.gl.uniform3f(ambDLoc, this.ambX, this.ambY, this.ambZ);
    }
  }
}

export class DiffuseMaterial extends SimpleMaterial {
  specR;
  specG;
  specB;
  specA;
  gamma;

  constructor(diffRed, diffGreen, diffBlue, diffAlpha) {
    super(diffRed, diffGreen, diffBlue, diffAlpha);
    // default white specular
    this.specR = 1.0;
    this.specG = 1.0;
    this.specB = 1.0;
    this.specA = 1.0;
    this.gamma = 100;
    if (!lambertShader) {
      lambertShader = new Shader("vs_3.glsl", "fs_lambert.glsl");
    }
    this.shader = lambertShader;
  }

  bindShader() {
    super.bindShader();
    var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
    Globals.gl.uniform4f(
      materialDiffLoc,
      this.diffR,
      this.diffG,
      this.diffB,
      this.diffA,
    );
  }
}

export class SpecularMaterial extends SimpleMaterial {
  specR;
  specG;
  specB;
  specA;
  gamma;

  constructor(diffRed, diffGreen, diffBlue, diffAlpha) {
    super(diffRed, diffGreen, diffBlue, diffAlpha);
    // default white specular
    this.specR = 1.0;
    this.specG = 1.0;
    this.specB = 1.0;
    this.specA = 1.0;
    this.gamma = 100;
    if (!phongShader) {
      phongShader = new Shader("vs_3.glsl", "fs_phong.glsl");
    }
    this.shader = phongShader;
  }

  setSpecularColor(specRed, specGreen, specBlue, specAlpha) {
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
    var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
    var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
    var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
    Globals.gl.uniform4f(
      materialDiffLoc,
      this.diffR,
      this.diffG,
      this.diffB,
      this.diffA,
    );
    Globals.gl.uniform4f(
      materialSpecularLoc,
      this.specR,
      this.specG,
      this.specB,
      this.specA,
    );
    Globals.gl.uniform1f(specularShineLoc, this.gamma);
  }
}

export class ToonMaterial extends SimpleMaterial {
  specR;
  specG;
  specB;
  specA;
  gamma;
  diffTh;
  specTh;

  constructor(
    diffRed,
    diffGreen,
    diffBlue,
    diffAlpha,
    diffThreshold,
    specThreshold,
  ) {
    super(diffRed, diffGreen, diffBlue, diffAlpha);
    // default white specular
    this.specR = 1.0;
    this.specG = 1.0;
    this.specB = 1.0;
    this.specA = 1.0;
    this.gamma = 100;
    this.diffTh = diffThreshold;
    this.specTh = specThreshold;
    if (!toonShader) {
      toonShader = new Shader("vs_3.glsl", "fs_toon.glsl");
    }
    this.shader = toonShader;
  }

  bindShader() {
    super.bindShader();
    var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
    var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
    var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
    Globals.gl.uniform4f(
      materialDiffLoc,
      this.diffR,
      this.diffG,
      this.diffB,
      this.diffA,
    );
    Globals.gl.uniform4f(
      materialSpecularLoc,
      this.specR,
      this.specG,
      this.specB,
      this.specA,
    );
    Globals.gl.uniform1f(specularShineLoc, this.gamma);
  }
}
