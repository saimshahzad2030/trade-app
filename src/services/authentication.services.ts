 
import axiosInstance,{axiosInstanceJson} from "../../axios/axiosInstance";
 
export const signup = async (data:{email:string,username:string,password:string}) => {
  try {
    const response =  await axiosInstanceJson.post("signup/", {
  email: data.email,
  username: data.username,
  password: data.password,
}); 
    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};

export const login = async (data:{username:string,password:string}) => {
  try {
    const response =  await axiosInstanceJson.post("token/", {
  username: data.username, 
  password: data.password,
}); 
    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
  const error = err as { response:{status: number; data: string} };
    return {
      status: error.response.status,
      data: error.response?.data,
    };
  }
};
