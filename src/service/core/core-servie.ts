import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV } from "src/constant/env";
import { RequestConstant } from 'src/constant/request-constant';
import { EXceptionHandler } from 'src/utils/exception-handler';
import { LoggerWrapper } from 'src/utils/logger.wrapper';
import { StorageUtils } from 'src/utils/storage.util';

const BASE_URL = () => {
  return ENV.OSB_API;
}

const api = axios.create({
  baseURL: BASE_URL(),
  headers: {
    'Content-Type': 'application/json'
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    config.headers[RequestConstant.TOKEN_ID_KEY] = StorageUtils.get(RequestConstant.TOKEN_ID)
    config.headers[RequestConstant.INSTITUTION_ID_KEY] = StorageUtils.get(RequestConstant.INSTITUTION_ID)
    config.headers[RequestConstant.USER_ID_key] = StorageUtils.get(RequestConstant.USER_ID)
    config.headers[RequestConstant.YEAR_ID_KEY] = StorageUtils.get(RequestConstant.YEAR_ID)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//  GET request
const get = async <T>(url: string): Promise<T> => {

  try {
    const response: AxiosResponse<T> = await api.get(url);
    return response.data;
  } catch (error) {
    LoggerWrapper.error("core-service get method : []",error);
    EXceptionHandler.exception(error);
    throw error;
  }
};

//POST request
const post = async <T>(url: string, data: any): Promise<T> => {

  try {
    const response: AxiosResponse<T> = await api.post(url, data);
    return response.data;
  } catch (error) {
    LoggerWrapper.error("core-service post method : []",error);
    EXceptionHandler.exception(error);
    throw error;
  }
};

//PUT request
const put = async <T>(url: string, data: any): Promise<T> => {

  try {
    const response: AxiosResponse<T> = await api.put(url, data);
    return response.data;
  } catch (error) {
    LoggerWrapper.error("core-service put method : []",error);
    EXceptionHandler.exception(error);
    throw error;
  }
};

//  DELETE request
const del = async <T>(url: string): Promise<T> => {

  try {
    const response: AxiosResponse<T> = await api.delete(url);
    return response.data;
  } catch (error) {
    LoggerWrapper.error("core-service delete method : []",error);
    EXceptionHandler.exception(error);
    throw error;
  }
};


// Export the generic methods
const apiCoreService = {
  get,
  post,
  put,
  del

};

export default apiCoreService;