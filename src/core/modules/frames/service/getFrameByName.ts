import { Frame } from "../../../../components/Interfaces/FrameInterface";
import { request } from "../../../services/request";
import { GetFrameByNameProps } from "../types/getFrameByNameProps";

const module = '/frames'
;

export async function getFrameById(params: GetFrameByNameProps) {
  return await request<Frame>({
    url: `${module}/getByName/${params.frameNameSlug}`,
    method: 'get',
    params: {
      frameNameSlug: params.frameNameSlug,
    },
  })
}