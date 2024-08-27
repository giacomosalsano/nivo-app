import { createContext, ReactElement, useState } from "react";
import { FrameContextProviderProps, FramesContextType } from "../ContextsSchemas/framesContextSchema";
import { Frame } from "../../components/Interfaces/FrameInterface";

const FramesContext = createContext<FramesContextType>({
  frames:[],
  setFrames: () => {},
})

const FramesContextProvider = ({ children }: FrameContextProviderProps): ReactElement => {
  const [frames, setFrames] = useState<Frame[]>([])

  return (
    <FramesContext.Provider value={{ frames, setFrames }}>
      {children}
    </FramesContext.Provider>
  )
}

export { FramesContext, FramesContextProvider }

