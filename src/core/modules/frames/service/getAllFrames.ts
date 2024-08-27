import { Frame } from "../../../../components/Interfaces/FrameInterface";
import { request } from "../../../services/request";
import { GetAllFramesProps } from "../types/getAllFramesProps";

const module = '/frames'
;

export async function getAllFrames(params: GetAllFramesProps) {
  return await request<Frame>({
    url: `${module}/`,
    method: 'get',
    params,
  })
}