import { IEpisodeVo, ILikeMovie, IMovieDetails, IMovieDetailsLoklok } from "@types";
import axiosLoklok from "configs/axiosLoklok";
import { PATH_API } from "configs/path.api";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";

const getMovieDetailsPageApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const { data } = await axiosLoklok.get(PATH_API.detail, {
    params: query
  });
  if (!data) {
    const error = new ApiError(STATUS.NOT_FOUND, "Not found movie");
    return responseError(error, res);
  }
  delete data.collect;
  delete data.drameTypeVo;
  delete data.episodeRoomListVo;
  delete data.contentTagResourceList;
  delete data.reserved;
  delete data.showSetName;
  delete data.nameJson;
  delete data.translateType;
  delete data.upInfo;
  delete data.drameTypeVo;
  delete data.areaNameList;
  delete data.coverHorizontalUrlJson;
  const response = {
    message: `Get details ${data.name} successfully!`,
    data: {
      ...data,
      likeList: data.likeList.map((movie: ILikeMovie) => ({
        id: movie.id,
        name: movie.name,
        coverVerticalUrl: movie.coverVerticalUrl,
        category: movie.category
      })),
      episodeVo: data.episodeVo.map((ep: IEpisodeVo) => ({
        id: ep.id,
        seriesNo: ep.seriesNo
      }))
    }
  };
  responseSuccess(res, response);
};

export default catchAsync(getMovieDetailsPageApi);

/** Get data detail movie
 * @swagger
 * /detail:
 *  get:
 *    summary: Get data detail movie
 *    tags: [Movie]
 *    parameters:
 *      - in: query
 *        name: category
 *        required: true
 *        example: 1
 *        schema:
 *          type: number
 *      - in: query
 *        name: id
 *        required: true
 *        example: 23149
 *        schema:
 *          type: number
 *    responses:
 *        200:
 *            description: Success
 */
