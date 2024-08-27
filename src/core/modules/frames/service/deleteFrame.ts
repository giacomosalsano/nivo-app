import { Frame } from "../../../../components/Interfaces/FrameInterface";
import { request } from "../../../services/request";
import { DeleteFrameProps } from "../types/deleteFrameProps";

const module = '/frames'

export async function deleteFrame(params: DeleteFrameProps) {
  return await request<Frame>({
    url: `${module}/deleteFrame/${params.id}`,
    method: 'delete',
    params: { 
      id: params.id 
    },
  })
}