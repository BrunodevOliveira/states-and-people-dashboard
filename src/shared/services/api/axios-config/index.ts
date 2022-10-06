import axios from "axios";

import { Enviroment } from "./../../../environment/index";
import { errorInterceptor, responseInterceptor } from "./interceptors";

const Api = axios.create({
  baseURL: Enviroment.URL_BASE,
});

//^Interceptor -> são middlewares criados através de funções que posso utilizar conforme a resposta do servidor

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };
