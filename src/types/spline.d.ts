declare module "@splinetool/react-spline" {
  import { Application } from "@splinetool/runtime";
  import { FC, ReactNode } from "react";

  interface SplineProps {
    scene: string;
    className?: string;
    onLoad?: (spline: Application) => void;
    children?: ReactNode;
  }

  const Spline: FC<SplineProps>;
  export default Spline;
}

declare module "@splinetool/runtime" {
  export class Application {
    findObjectByName(name: string): any;
    emitEvent(eventName: string, object: any): void;
    playAnimation(name: string): void;
  }
}
