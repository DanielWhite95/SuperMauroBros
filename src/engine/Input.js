"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
var globals_1 = require("./globals");
var keys = [];
var clickedKeys = [];
var mouseState = false;
var lastMouseX = 0;
var lastMouseY = 0;
var mouseDx = 0;
var mouseDy = 0;
var mouseWheelD = 0;
var pointerLocked = "pointerLockElement" in document ||
    "mozPointerLockElement" in document ||
    "webkitPointerLockElement" in document;
var Input = /** @class */ (function () {
    function Input() {
    }
    Input.init = function () {
        window.addEventListener("keyup", Input.keyUp, false);
        window.addEventListener("keydown", Input.keyDown, false);
        /*canvas.addEventListener("mousedown", Input.mouseDown, false);
            canvas.addEventListener("mouseup", Input.mouseUp, false);
            canvas.addEventListener("mousemove", Input.mouseMove, false);
            canvas.addEventListener("mousewheel", Input.mouseWheel, false);*/
        Input.enableMousePointerLock();
    };
    Input.keyUp = function (e) {
        if (keys[e.keyCode]) {
            keys[e.keyCode] = false;
            clickedKeys[e.keyCode] = false;
        }
    };
    Input.keyDown = function (e) {
        if (!keys[e.keyCode]) {
            keys[e.keyCode] = true;
            clickedKeys[e.keyCode] = true;
        }
    };
    Input.mouseDown = function (event) {
        lastMouseX = event.pageX;
        lastMouseY = event.pageY;
        mouseState = true;
    };
    Input.mouseUp = function (event) {
        lastMouseX = -100;
        lastMouseY = -100;
        mouseState = false;
    };
    Input.mouseMove = function (event) {
        mouseDx = event.movementX || event.mozMovementX || 0;
        mouseDy = event.movementY || event.mozMovementY || 0;
    };
    Input.mouseWheel = function (event) {
        mouseWheelD = event.wheelDelta / 100;
    };
    //mouse pointer lock
    Input.enableMousePointerLock = function () {
        globals_1.Globals.canvas.onclick = function () {
            globals_1.Globals.canvas.requestPointerLock();
        };
        document.addEventListener("pointerlockchange", lockChangeAlert, false);
        document.addEventListener("mozpointerlockchange", lockChangeAlert, false);
        function lockChangeAlert() {
            if (document.pointerLockElement == globals_1.Globals.canvas) {
                document.addEventListener("mousedown", Input.mouseDown, false);
                document.addEventListener("mouseup", Input.mouseUp, false);
                document.addEventListener("mousemove", Input.mouseMove, false);
                document.addEventListener("mousewheel", Input.mouseWheel, false);
            }
            else {
                document.removeEventListener("mousedown", Input.mouseDown, false);
                document.removeEventListener("mouseup", Input.mouseUp, false);
                document.removeEventListener("mousemove", Input.mouseMove, false);
                document.removeEventListener("mousewheel", Input.mouseWheel, false);
            }
        }
    };
    //getters
    Input.isKeyDown = function (key) {
        return keys[key];
    };
    Input.isKeyClicked = function (key) {
        var ret = clickedKeys[key];
        if (clickedKeys[key])
            clickedKeys[key] = false;
        return ret;
    };
    Input.isMouseDown = function () {
        return mouseState;
    };
    Input.isMouseClicked = function () {
        var ret = mouseState;
        mouseState = false;
        return ret;
    };
    Input.getMouseDiffX = function () {
        var ret = mouseDx;
        mouseDx = 0;
        return ret;
    };
    Input.getMouseDiffY = function () {
        var ret = mouseDy;
        mouseDy = 0;
        return ret;
    };
    Input.getMouseWheelDiff = function () {
        var ret = mouseWheelD;
        mouseWheelD = 0;
        return ret;
    };
    Input.UP_KEY = 38;
    Input.DOWN_KEY = 40;
    Input.LEFT_KEY = 37;
    Input.RIGHT_KEY = 39;
    Input.W_KEY = 87;
    Input.S_KEY = 83;
    Input.A_KEY = 65;
    Input.D_KEY = 68;
    Input.SPACE_KEY = 32;
    Input.SHIFT_KEY = 16;
    Input.B_KEY = 66;
    Input.C_KEY = 67;
    return Input;
}());
exports.Input = Input;
