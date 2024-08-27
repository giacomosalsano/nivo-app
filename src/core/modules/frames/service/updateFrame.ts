import { Frame } from "../../../../components/Interfaces/FrameInterface"
import { request } from "../../../services/request"
import { UpdateFrameProps } from "../types/updateFrameProps"

const module = '/frames'

export async function updateFrame(params: UpdateFrameProps) {
  return await request<Frame>({
    url: `${module}/editFrame/${params.id}`,
    method: 'put',
    params: { 
      id: params.id 
    },
    body: params,
  })
}

