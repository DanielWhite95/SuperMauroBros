import * as utils from "../lib/utils";
import { Globals } from "./globals";
import { Scene } from "./Scene";

export class Light {
  public name;
  public x;
  public y;
  public z;
  public Rcolor;
  public Gcolor;
  public Bcolor;
  public movedPosition;
  public on;
  public rotation;
  public dirx;
  public diry;
  public dirz;
  public movedDir;
  public coneIn;
  public coneOut;
  public targetDistance;
  public decay;

  constructor(name, x, y, z) {
    this.name = name; // prefix used in gl variables
    this.x = x;
    this.y = y;
    this.z = z;
    this.Rcolor = 1.0;
    this.Gcolor = 1.0;
    this.Bcolor = 1.0;
    this.movedPosition = [x, y, z, 1.0];
    this.on = 1.0;
    this.rotation = utils.MakeRotateXMatrix(0);
  }

  public setPosition(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public setRotation(angle, elevation) {
    this.rotation = utils.multiplyMatrices(
      utils.MakeRotateYMatrix(angle),
      utils.MakeRotateXMatrix(-elevation),
    );
  }

  public setDirection(dirx, diry, dirz) {
    var length = Math.sqrt(dirx * dirx + diry * diry + dirz * dirz);
    this.dirx = dirx / length;
    this.diry = diry / length;
    this.dirz = dirz / length;
    this.movedDir = [dirx, diry, dirz];
  }

  public setColor(red, green, blue) {
    this.Rcolor = red / 255;
    this.Gcolor = green / 255;
    this.Bcolor = blue / 255;
  }

  public getLightPosition() {
    return [this.x, this.y, this.z];
  }

  public getLightDirection() {
    return [this.dirx, this.diry, this.dirz];
  }

  public getLightColor3() {
    return [this.Rcolor, this.Gcolor, this.Bcolor];
  }

  public moveToCameraSpace(viewMatrix) {
    var lightDirMatrix = utils.invertMatrix(utils.transposeMatrix(viewMatrix));
    var lightPosMatrix = viewMatrix;
    this.movedPosition = utils.multiplyMatrixVector(lightPosMatrix, [
      this.x,
      this.y,
      this.z,
      1.0,
    ]);
    var rotatedDir = utils.multiplyMatrix3Vector3(
      utils.sub3x3from4x4(this.rotation),
      [this.dirx, this.diry, this.dirz],
    );
    this.movedDir = utils.multiplyMatrix3Vector3(
      utils.sub3x3from4x4(lightDirMatrix),
      rotatedDir,
    );
  }

  public bind(shader) {
    var directionLoc = shader.getUniformLocation(this.name + "Dir");
    var colorLoc = shader.getUniformLocation(this.name + "Color");
    var positionLoc = shader.getUniformLocation(this.name + "Pos");
    var targetLoc = shader.getUniformLocation(this.name + "Target");
    var decayLoc = shader.getUniformLocation(this.name + "Decay");
    var coneInLoc = shader.getUniformLocation(this.name + "ConeIn");
    var coneOutLoc = shader.getUniformLocation(this.name + "ConeOut");
    var lightOnLoc = shader.getUniformLocation(this.name + "On");
    Globals.gl.uniform1f(lightOnLoc, this.on);
    Globals.gl.uniform3f(colorLoc, this.Rcolor, this.Gcolor, this.Bcolor);
    Globals.gl.uniform3f(
      directionLoc,
      this.movedDir[0],
      this.movedDir[1],
      this.movedDir[2],
    );
    Globals.gl.uniform3f(
      positionLoc,
      this.movedPosition[0],
      this.movedPosition[1],
      this.movedPosition[2],
    );
    Globals.gl.uniform1f(targetLoc, this.targetDistance);
    Globals.gl.uniform1f(decayLoc, this.decay);
    Globals.gl.uniform1f(coneInLoc, this.coneIn);
    Globals.gl.uniform1f(coneOutLoc, this.coneOut);
  }

  public static moveAllLights(viewMatrix) {
    Scene.lights.forEach(function (light) {
      light.moveToCameraSpace(viewMatrix);
    });
  }

  public static bindAllLights(shader) {
    Scene.lights.forEach(function (light) {
      light.bind(shader);
    });
  }
}

export class DirectionalLight extends Light {
  constructor(name, dirx, diry, dirz) {
    super(name, 0.0, 0.0, 0.0);
    var length = Math.sqrt(dirx * dirx + diry * diry + dirz * dirz);
    this.dirx = dirx / length;
    this.diry = diry / length;
    this.dirz = dirz / length;
    this.coneIn = 45;
    this.coneOut = 0;
    this.targetDistance = 1.0;
    this.decay = 0.0;
  }

  bind(shader) {
    // bind gl variables
    super.bind(shader);
    var lightTypeLoc = shader.getUniformLocation(this.name + "Type");
    Globals.gl.uniform3f(lightTypeLoc, 1.0, 0.0, 0.0);
  }
}

export class PointLight extends Light {
  constructor(name, x, y, z, target, decay) {
    super(name, x, y, z);
    this.targetDistance = target;
    this.decay = decay;
    this.dirx = 1.0;
    this.diry = 0.0;
    this.dirz = 0.0;
    this.coneIn = 45;
    this.coneOut = 0;
  }

  bind(shader) {
    // bind gl variables
    super.bind(shader);
    var lightTypeLoc = shader.getUniformLocation(this.name + "Type");
    Globals.gl.uniform3f(lightTypeLoc, 0.0, 1.0, 0.0);
  }
}

export class SpotLight extends Light {
  constructor(name, x, y, z, dirx, diry, dirz, target, decay) {
    super(name, x, y, z);
    var length = Math.sqrt(dirx * dirx + diry * diry + dirz * dirz);
    this.dirx = dirx / length || 0;
    this.diry = diry / length || -1;
    this.dirz = dirz / length || 0;
    this.targetDistance = target || 1.0;
    this.decay = decay || 0;
    this.coneIn = 0.5;
    this.coneOut = 0.5;
  }

  setDecay(decay) {
    this.decay = decay;
  }

  setTarget(target) {
    this.targetDistance = target;
  }

  setCone(coneIn, coneOut) {
    this.coneIn = coneIn;
    this.coneOut = coneOut;
  }

  bind(shader) {
    // bind gl variables
    super.bind(shader);
    var lightTypeLoc = shader.getUniformLocation(this.name + "Type");
    Globals.gl.uniform3f(lightTypeLoc, 0.0, 0.0, 1.0);
  }
}
