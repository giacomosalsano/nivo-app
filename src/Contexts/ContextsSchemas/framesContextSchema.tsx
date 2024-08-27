import { ReactNode } from "react";
import { Frame } from "../../components/Interfaces/FrameInterface";

export interface FramesContextType {
  frames: Frame[];
  setFrames: React.Dispatch<React.SetStateAction<Frame[]>>;
}

export interface FrameContextProviderProps {
  children: ReactNode;
}