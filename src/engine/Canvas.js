"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
var globals_1 = require("./globals");
var utils = require("../lib/utils");
var Canvas = /** @class */ (function () {
    function Canvas() {
    }
    Canvas.init = function () {
        var canvas = document.getElementById("canvas");
        document.body.style.overflow = "hidden";
        try {
            globals_1.Globals.canvas = canvas;
            globals_1.Globals.gl = canvas.getContext("webgl2");
        }
        catch (e) {
            console.log(e);
        }
        if (globals_1.Globals.gl) {
            window.onresize = Canvas.onResize;
            Canvas.onResize();
            globals_1.Globals.gl.enable(globals_1.Globals.gl.CULL_FACE);
            globals_1.Globals.gl.enable(globals_1.Globals.gl.DEPTH_TEST);
            globals_1.Globals.gl.cullFace(globals_1.Globals.gl.BACK);
            globals_1.Globals.gl.enable(globals_1.Globals.gl.BLEND);
            globals_1.Globals.gl.blendFunc(globals_1.Globals.gl.SRC_ALPHA, globals_1.Globals.gl.ONE_MINUS_SRC_ALPHA);
        }
        else
            alert("Error: WebGL not supported by your browser!");
    };
    Canvas.onResize = function () {
        globals_1.Globals.canvas.width = window.innerWidth;
        globals_1.Globals.canvas.height = window.innerHeight;
        globals_1.Globals.canvas.style.left = "0";
        globals_1.Globals.canvas.style.top = "0";
        globals_1.Globals.canvas.style.position = "absolute";
        var w = globals_1.Globals.canvas.clientWidth;
        var h = globals_1.Globals.canvas.clientHeight;
        globals_1.Globals.aspectRatio = w / h;
        Canvas.makePerspectiveMatrix();
        globals_1.Globals.gl.viewport(0.0, 0.0, w, h);
        globals_1.Globals.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        globals_1.Globals.gl.clear(globals_1.Globals.gl.COLOR_BUFFER_BIT | globals_1.Globals.gl.DEPTH_BUFFER_BIT);
    };
    Canvas.makePerspectiveMatrix = function () {
        globals_1.Globals.perspectiveMatrix = utils.MakePerspective(60, globals_1.Globals.aspectRatio, 0.1, 2000.0);
    };
    return Canvas;
}());
exports.Canvas = Canvas;
