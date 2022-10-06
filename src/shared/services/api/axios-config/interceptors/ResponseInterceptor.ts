import { AxiosResponse } from "axios";

export const responseInterceptor = (response: AxiosResponse) => {
  //Aqui poderia tratar todos os dados que recebo como resposta da API
  return response;
};
