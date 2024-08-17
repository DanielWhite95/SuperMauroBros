import { Globals } from "./globals";

var keys = [];
var clickedKeys = [];
var mouseState = false;
var lastMouseX = 0;
var lastMouseY = 0;
var mouseDx = 0;
var mouseDy = 0;
var mouseWheelD = 0;

var pointerLocked =
  "pointerLockElement" in document ||
  "mozPointerLockElement" in document ||
  "webkitPointerLockElement" in document;

export class Input {
  public static readonly UP_KEY = 38;
  public static readonly DOWN_KEY = 40;
  public static readonly LEFT_KEY = 37;
  public static readonly RIGHT_KEY = 39;

  public static readonly W_KEY = 87;
  public static readonly S_KEY = 83;
  public static readonly A_KEY = 65;
  public static readonly D_KEY = 68;

  public static readonly SPACE_KEY = 32;
  public static readonly SHIFT_KEY = 16;

  public static readonly B_KEY = 66;
  public static readonly C_KEY = 67;

  public static init() {
    window.addEventListener("keyup", Input.keyUp, false);
    window.addEventListener("keydown", Input.keyDown, false);
    /*canvas.addEventListener("mousedown", Input.mouseDown, false);
        canvas.addEventListener("mouseup", Input.mouseUp, false);
        canvas.addEventListener("mousemove", Input.mouseMove, false);
        canvas.addEventListener("mousewheel", Input.mouseWheel, false);*/

    Input.enableMousePointerLock();
  }

  public static keyUp(e) {
    if (keys[e.keyCode]) {
      keys[e.keyCode] = false;
      clickedKeys[e.keyCode] = false;
    }
  }

  public static keyDown(e) {
    if (!keys[e.keyCode]) {
      keys[e.keyCode] = true;
      clickedKeys[e.keyCode] = true;
    }
  }

  public static mouseDown(event) {
    lastMouseX = event.pageX;
    lastMouseY = event.pageY;
    mouseState = true;
  }

  public static mouseUp(event) {
    lastMouseX = -100;
    lastMouseY = -100;
    mouseState = false;
  }

  public static mouseMove(event) {
    mouseDx = event.movementX || event.mozMovementX || 0;
    mouseDy = event.movementY || event.mozMovementY || 0;
  }

  public static mouseWheel(event) {
    mouseWheelD = event.wheelDelta / 100;
  }

  //mouse pointer lock
  public static enableMousePointerLock() {
    Globals.canvas.onclick = function () {
      Globals.canvas.requestPointerLock();
    };

    document.addEventListener("pointerlockchange", lockChangeAlert, false);
    document.addEventListener("mozpointerlockchange", lockChangeAlert, false);

    function lockChangeAlert() {
      if (
        document.pointerLockElement == Globals.canvas
      ) {
        document.addEventListener("mousedown", Input.mouseDown, false);
        document.addEventListener("mouseup", Input.mouseUp, false);
        document.addEventListener("mousemove", Input.mouseMove, false);
        document.addEventListener("mousewheel", Input.mouseWheel, false);
      } else {
        document.removeEventListener("mousedown", Input.mouseDown, false);
        document.removeEventListener("mouseup", Input.mouseUp, false);
        document.removeEventListener("mousemove", Input.mouseMove, false);
        document.removeEventListener("mousewheel", Input.mouseWheel, false);
      }
    }
  }

  //getters
  public static isKeyDown(key) {
    return keys[key];
  }

  public static isKeyClicked(key) {
    var ret = clickedKeys[key];

    if (clickedKeys[key]) clickedKeys[key] = false;

    return ret;
  }

  public static isMouseDown() {
    return mouseState;
  }

  public static isMouseClicked() {
    var ret = mouseState;
    mouseState = false;
    return ret;
  }

  public static getMouseDiffX() {
    var ret = mouseDx;
    mouseDx = 0;
    return ret;
  }

  public static getMouseDiffY() {
    var ret = mouseDy;
    mouseDy = 0;
    return ret;
  }

  public static getMouseWheelDiff() {
    var ret = mouseWheelD;
    mouseWheelD = 0;
    return ret;
  }
}
