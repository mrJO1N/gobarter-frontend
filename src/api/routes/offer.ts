import type { IOffer } from "@/utils/types";
import { BaseApi } from "../base.api";

interface ICreateOfferPayload extends IOffer {}

class OfferApi extends BaseApi {
  constructor() {
    super();
    this.handleError = this.handleError.bind(this);
    this.create = this.create.bind(this);
  }

  async create(data: ICreateOfferPayload) {
    try {
      const response = await this.axiosInstance.post("/offers/new", data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export const offerApi = new OfferApi();
