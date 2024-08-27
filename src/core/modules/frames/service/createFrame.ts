import { Frame } from "../../../../components/Interfaces/FrameInterface"
import { request } from "../../../services/request"
import { CreateFrameProps } from "../types/createFrameProps"

const module = '/frames'

export async function createFrame(params: CreateFrameProps) {
  return await request<Frame>({
    url: `${module}/createFrame`,
    method: 'post',
    body: params,
  })
}

