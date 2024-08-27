import { Frame } from "../../../../components/Interfaces/FrameInterface";
import { request } from "../../../services/request";
import { GetFrameByIdProps } from "../types/getFrameByIdProps";

const module = '/frames'
;

export async function getFrameById(params: GetFrameByIdProps) {
  return await request<Frame>({
    url: `${module}/getById/${params.id}`,
    method: 'get',
    params: {
      id: params.id,
    },
  })
}