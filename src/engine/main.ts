import { Canvas } from "./Canvas";
import { Input } from "./Input";
import { Scene } from "./Scene";

export function main() {
  Canvas.init();
  Input.init();
  Scene.start();
}
