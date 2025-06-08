import type { IOffer } from "@/utils/types";
import { BaseApi } from "../base.api";
import { toUrlQuery } from "../api.utils";
import { config } from "@/utils/config";

interface ICreateOfferPayload extends IOffer {}
interface ISearchOptions {
  page: number;
  onlyMy: boolean;
  search?: string;
}

class OfferApi extends BaseApi {
  constructor() {
    super();
    this.handleError = this.handleError.bind(this);
    this.create = this.create.bind(this);
    this.getOne = this.getOne.bind(this);
    this.search = this.search.bind(this);
  }

  async create(data: ICreateOfferPayload) {
    try {
      const response = await this.axiosInstance.post("/offers/new", data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getOne(id: number) {
    try {
      const response = await this.axiosInstance.get(`/offers/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async search(searchOptions: ISearchOptions) {
    const { onlyMy, ...options } = searchOptions;
    try {
      const response = await this.axiosInstance.get(
        `/offers/?${toUrlQuery({
          only_my: onlyMy,
          size: config.get("OFFERS_SIZE_ON_THE_PAGE"),
          ...options,
        })}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export const offerApi = new OfferApi();
