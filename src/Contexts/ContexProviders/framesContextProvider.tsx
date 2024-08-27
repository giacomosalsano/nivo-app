import { createContext, ReactElement, useState } from "react";
import { FrameContextProviderProps, FramesContextType } from "../ContextsSchemas/framesContextSchema";
import { Frame } from "../../components/Interfaces/FrameInterface";

const FramesContext = createContext<FramesContextType>({
  frames:[],
  setFrames: () => {},
  selectedFrame: null,
  setSelectedFrame: () => {},
})

const FramesContextProvider = ({ children }: FrameContextProviderProps): ReactElement => {
  const [frames, setFrames] = useState<Frame[]>([])
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);

  return (
    <FramesContext.Provider value={{ frames, setFrames, selectedFrame, setSelectedFrame }}>
      {children}
    </FramesContext.Provider>
  )
}

export { FramesContext, FramesContextProvider }

