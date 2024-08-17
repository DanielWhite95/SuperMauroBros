export class KeyFrame {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  constructor(
    x: number = 0,
    y: number = 0,
    z: number = 0,
    rotX: number = 0,
    rotY: number=0 ,
    rotZ: number = 0,
    scaleX: number = 1,
    scaleY: number = 1,
    scaleZ: number = 1,
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotX = rotX;
    this.rotY = rotY;
    this.rotZ = rotZ;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.scaleZ = scaleZ;
  }
}

export class CameraKeyFrame {
  x: number;
  y: number;
  z: number;
  angle: number;
  elevation: number;
  lookRadius: number;

  constructor(
    x: number,
    y: number,
    z: number,
    angle: number,
    elevation: number,
    lookRadius: number,
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.angle = angle;
    this.elevation = elevation;
    this.lookRadius = lookRadius;
  }

  //interpolates this with the next frame
  //interpolatePosition range: [0.0, 1.0];
  interpolate(nextframe: CameraKeyFrame, interpolatePosition: number) {
    return new CameraKeyFrame(
      this.x + (nextframe.x - this.x) * interpolatePosition,
      this.y + (nextframe.y - this.y) * interpolatePosition,
      this.z + (nextframe.z - this.z) * interpolatePosition,
      this.angle + (nextframe.angle - this.angle) * interpolatePosition,
      this.elevation +
        (nextframe.elevation - this.elevation) * interpolatePosition,
      this.lookRadius +
        (nextframe.lookRadius - this.lookRadius) * interpolatePosition,
    );
  }
}

export class BezierCurve {
  keyframes: KeyFrame[];

  constructor(keyframes: KeyFrame[] = []) {
    this.keyframes = keyframes;
  }

  addPoint(keyframe: KeyFrame) {
    this.keyframes.push(keyframe);
  }

  interpolate(alpha: number) {
    // position interpolation
    var i = 0;
    var intermediateStep = [];
    for (i = 0; i < this.keyframes.length; i++) {
      intermediateStep.push(this.keyframes[i]);
    }

    var tempFrames = [];
    var tempFrame1;
    var tempFrame2;
    var tempCoordinates1;
    var tempCoordinates2;
    var tempScales1;
    var tempScales2;
    var tempRotations1;
    var tempRotations2;
    var intermediateCoordinates;
    // var intermediateQuaternion;
    var intermediateRotations;
    var intermediateScales;
    // var tempQ1;
    // var tempQ2;

    while (intermediateStep.length > 2) {
      for (i = 0; i < intermediateStep.length - 1; i++) {
        // coordinate
        tempFrame1 = intermediateStep[i];
        tempFrame2 = intermediateStep[i + 1];
        tempCoordinates1 = [tempFrame1.x, tempFrame1.y, tempFrame1.z];
        tempCoordinates2 = [tempFrame2.x, tempFrame2.y, tempFrame2.z];
        intermediateCoordinates = this.lerp(
          tempCoordinates1,
          tempCoordinates2,
          alpha,
        );

        // rotations
        tempRotations1 = [tempFrame1.rotX, tempFrame1.rotY, tempFrame1.rotZ];
        tempRotations2 = [tempFrame2.rotX, tempFrame2.rotY, tempFrame2.rotZ];
        intermediateRotations = this.lerp(
          tempRotations1,
          tempRotations2,
          alpha,
        );

        // scales
        tempScales1 = [tempFrame1.x, tempFrame1.y, tempFrame1.z];
        tempScales2 = [tempFrame2.x, tempFrame2.y, tempFrame2.z];
        intermediateScales = this.lerp(tempScales1, tempScales2, alpha);
        tempFrames.push(
          new KeyFrame(
            intermediateCoordinates[0],
            intermediateCoordinates[1],
            intermediateCoordinates[2],
            intermediateRotations[0],
            intermediateRotations[1],
            intermediateRotations[2],
            intermediateScales[0],
            intermediateScales[1],
            intermediateScales[2],
          ),
        );
      }
      intermediateStep = tempFrames;
      tempFrames = [];
    }
    // final interpolation
    tempFrame1 = intermediateStep[0];
    tempFrame2 = intermediateStep[1];
    tempCoordinates1 = [tempFrame1.x, tempFrame1.y, tempFrame1.z];
    tempCoordinates2 = [tempFrame2.x, tempFrame2.y, tempFrame2.z];
    intermediateCoordinates = this.lerp(
      tempCoordinates1,
      tempCoordinates2,
      alpha,
    );

    // rotations
    tempRotations1 = [tempFrame1.rotX, tempFrame1.rotY, tempFrame1.rotZ];
    tempRotations2 = [tempFrame2.rotX, tempFrame2.rotY, tempFrame2.rotZ];
    intermediateRotations = this.lerp(tempRotations1, tempRotations2, alpha);

    // scales
    tempScales1 = [tempFrame1.scaleX, tempFrame1.scaleY, tempFrame1.scaleZ];
    tempScales2 = [tempFrame2.scaleX, tempFrame2.scaleY, tempFrame2.scaleZ];
    intermediateScales = this.lerp(tempScales1, tempScales2, alpha);

    // rotation interpolation
    return new KeyFrame(
      intermediateCoordinates[0],
      intermediateCoordinates[1],
      intermediateCoordinates[2],
      intermediateRotations[0],
      intermediateRotations[1],
      intermediateRotations[2],
      intermediateScales[0],
      intermediateScales[1],
      intermediateScales[2],
    );
  }

  lerp(a: number[], b: number[], alpha: number) {
    // of coordinates or scales
    var result = [];
    for (var i = 0; i < a.length; i++) {
      result.push((1 - alpha) * a[i] + alpha * b[i]);
    }
    return result;
  }
}

export class CameraBezierCurve {
  cameraKeyFrames: CameraKeyFrame[];

  constructor(cameraKeyframes: CameraKeyFrame[] = []) {
    this.cameraKeyFrames = cameraKeyframes;
  }

  addPoint(cameraKeyframe: CameraKeyFrame) {
    this.cameraKeyFrames.push(cameraKeyframe);
  }

  interpolate(alpha: number) {
    // position interpolation
    var i = 0;
    var intermediateStep = [];
    for (i = 0; i < this.cameraKeyFrames.length; i++) {
      intermediateStep.push(this.cameraKeyFrames[i]);
    }

    var tempFrames = [];
    var tempFrame1;
    var tempFrame2;
    var tempCoordinates1;
    var tempCoordinates2;
    var tempScales1;
    var tempScales2;
    var tempRotations1;
    var tempRotations2;
    var tempLookRadius1;
    var tempLookRadius2;
    var intermediateCoordinates;
    var intermediateRotations;
    var intermediateLookRadius;

    while (intermediateStep.length > 2) {
      for (i = 0; i < intermediateStep.length - 1; i++) {
        // coordinate
        tempFrame1 = intermediateStep[i];
        tempFrame2 = intermediateStep[i + 1];
        tempCoordinates1 = [tempFrame1.x, tempFrame1.y, tempFrame1.z];
        tempCoordinates2 = [tempFrame2.x, tempFrame2.y, tempFrame2.z];
        intermediateCoordinates = this.lerp(
          tempCoordinates1,
          tempCoordinates2,
          alpha,
        );

        // rotations
        tempRotations1 = [tempFrame1.angle, tempFrame1.elevation];
        tempRotations2 = [tempFrame2.angle, tempFrame2.elevation];
        intermediateRotations = this.lerp(
          tempRotations1,
          tempRotations2,
          alpha,
        );

        // lookRadius
        tempLookRadius1 = [tempFrame1.lookRadius];
        tempLookRadius2 = [tempFrame2.lookRadius];
        intermediateLookRadius = this.lerp(
          tempLookRadius1,
          tempLookRadius2,
          alpha,
        );
        tempFrames.push(
          new CameraKeyFrame(
            intermediateCoordinates[0],
            intermediateCoordinates[1],
            intermediateCoordinates[2],
            intermediateRotations[0],
            intermediateRotations[1],
            intermediateLookRadius[0],
          ),
        );
      }
      intermediateStep = tempFrames;
      tempFrames = [];
    }
    // final interpolation
    tempFrame1 = intermediateStep[0];
    tempFrame2 = intermediateStep[1];
    tempCoordinates1 = [tempFrame1.x, tempFrame1.y, tempFrame1.z];
    tempCoordinates2 = [tempFrame2.x, tempFrame2.y, tempFrame2.z];
    intermediateCoordinates = this.lerp(
      tempCoordinates1,
      tempCoordinates2,
      alpha,
    );

    // rotations
    tempRotations1 = [tempFrame1.angle, tempFrame1.elevation];
    tempRotations2 = [tempFrame2.angle, tempFrame2.elevation];
    intermediateRotations = this.lerp(tempRotations1, tempRotations2, alpha);

    // lookRadius
    tempLookRadius1 = [tempFrame1.lookRadius];
    tempLookRadius2 = [tempFrame2.lookRadius];
    intermediateLookRadius = this.lerp(tempLookRadius1, tempLookRadius2, alpha);

    // rotation interpolation
    return new CameraKeyFrame(
      intermediateCoordinates[0],
      intermediateCoordinates[1],
      intermediateCoordinates[2],
      intermediateRotations[0],
      intermediateRotations[1],
      intermediateLookRadius[0],
    );
  }

  lerp(a: number[], b: number[], alpha: number) {
    // of coordinates or scales
    var result = [];
    for (var i = 0; i < a.length; i++) {
      result.push((1 - alpha) * a[i] + alpha * b[i]);
    }
    return result;
  }
}

export class Animation {
  bezierCurve: BezierCurve;
  duration: number;
  constructor(bezierCurve: BezierCurve, duration: number) {
    this.bezierCurve = bezierCurve;
    this.duration = duration || 0;
  }

  getFrame(time: number) {
    return this.bezierCurve.interpolate(time / this.duration);
  }
}

export class Animator {
  animations: Animation[] = [];
  duration = 0;
  object;
  instance;
  playing = false;
  loop = false;
  currTime = 0;
  animatePosition = true;
  animateRotation = true;
  animateScale = true;
  reverse = false;

  constructor(object, instance) {
    this.animations = [];
    this.duration = 0;
    this.object = object;
    this.instance = instance;
    this.playing = false;
    this.loop = false;
    this.currTime = 0;
    this.animatePosition = true;
    this.animateRotation = true;
    this.animateScale = true;
  }

  addAnimation(animation: Animation) {
    this.animations.push(animation);
    this.duration += animation.duration;
  }

  enablePositionAnimation(bool: boolean) {
    this.animatePosition = bool;
  }

  enableRotationAnimation(bool: boolean) {
    this.animateRotation = bool;
  }

  enableScaleAnimation(bool: boolean) {
    this.animateScale = bool;
  }

  play(loop) {
    this.playing = true;
    this.reverse = false;
    this.loop = loop;
  }

  playReverse(loop) {
    this.playing = true;
    this.reverse = true;
    this.loop = loop;
  }

  stop() {
    this.playing = false;
    this.onStop(this.instance);
  }

  onStop(inst) {}

  update() {
    // time is counted as iterations of update function
    if (this.playing) {
      if (this.reverse) this.currTime--;
      else this.currTime++;

      if (this.currTime > this.duration) {
        this.currTime = this.duration;
        if (this.loop) {
          this.reverse = !this.reverse;
        } else this.stop();
      }

      if (this.currTime < 0) {
        this.currTime = 0;
        if (this.loop) {
          this.currTime--;
          this.reverse = !this.reverse;
        }
      }
    }

    let selectedAnimationIndex = 0;
    let residualTime = this.currTime;
    while (
      residualTime - this.animations[selectedAnimationIndex].duration >
      0
    ) {
      residualTime =
        residualTime - this.animations[selectedAnimationIndex].duration;
      selectedAnimationIndex++;
    }

    var interpolatedFrame =
      this.animations[selectedAnimationIndex].getFrame(residualTime);

    if (this.animatePosition)
      this.object.setPosition(
        interpolatedFrame.x,
        interpolatedFrame.y,
        interpolatedFrame.z,
      );
    if (this.animateRotation)
      this.object.setRotation(
        interpolatedFrame.rotX,
        interpolatedFrame.rotY,
        interpolatedFrame.rotZ,
      );
    if (this.animateScale)
      this.object.setScale(
        interpolatedFrame.scaleX,
        interpolatedFrame.scaleY,
        interpolatedFrame.scaleZ,
      );
  }
}

export class CameraAnimator {
  animations = [];
  duration = 0;
  camera;
  instance;
  playing = false;
  loop = false;
  currTime = 0;
  animatePosition = true;
  animateRotation = true;
  animateRadius = true;
  reverse = true;

  constructor(camera, instance = null) {
    this.animations = [];
    this.duration = 0;
    this.camera = camera;
    this.instance = instance;
    this.playing = false;
    this.loop = false;
    this.currTime = 0;
    this.animatePosition = true;
    this.animateRotation = true;
    this.animateRadius = true;
  }

  addAnimation(animation) {
    this.animations.push(animation);
    this.duration += animation.duration;
  }

  enablePositionAnimation(boolean) {
    this.animatePosition = boolean;
  }

  enableRotationAnimation(boolean) {
    this.animateRotation = boolean;
  }

  enableRadiusAnimation(boolean) {
    this.animateRadius = boolean;
  }

  play(loop) {
    this.playing = true;
    this.reverse = false;
    this.loop = loop;
  }

  playReverse(loop) {
    this.playing = true;
    this.reverse = true;
    this.loop = loop;
    this.currTime = this.duration;
  }

  stop() {
    this.playing = false;
    this.onStop(this.instance);
  }

  onStop(inst) {}

  update() {
    // time is counted as iterations of update function
    if (this.playing) {
      if (this.reverse) this.currTime--;
      else this.currTime++;

      if (this.currTime > this.duration) {
        this.currTime = this.duration;
        if (this.loop) {
          this.reverse = !this.reverse;
        } else this.stop();
      }

      if (this.currTime < 0) {
        this.currTime = 0;
        if (this.loop) {
          this.currTime--;
          this.reverse = !this.reverse;
        }
      }
    }

    let selectedAnimationIndex = 0;
    let residualTime = this.currTime;
    while (
      residualTime - this.animations[selectedAnimationIndex].duration >
      0
    ) {
      residualTime =
        residualTime - this.animations[selectedAnimationIndex].duration;
      selectedAnimationIndex++;
    }

    var interpolatedFrame =
      this.animations[selectedAnimationIndex].getFrame(residualTime);

    if (this.animatePosition)
      this.camera.setLookPoint(
        interpolatedFrame.x,
        interpolatedFrame.y,
        interpolatedFrame.z,
      );
    if (this.animateRotation) {
      this.camera.setAngle(interpolatedFrame.angle);
      this.camera.setElevation(interpolatedFrame.elevation);
    }
    if (this.animateRadius)
      this.camera.setLookRadius(interpolatedFrame.lookRadius);
  }
}
