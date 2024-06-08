import { Record, RegisteredDevice } from "@/types";
import { fetcher } from "@/utils/fetcher";

export const getDevicesByUserId = async (id: string) => {
  try {
    const response = await fetcher<RegisteredDevice[]>(`/users/${id}/devices`);
    console.log("Res: ", response);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getTimelinesByUserId = async (id: string) => {
  try {
    const response = await fetcher<Record[]>(`/users/${id}/timelines`);
    console.log("Res: ", response);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getRecordsByUserId = async (id: string) => {
  try {
    const response = await fetcher<Record[]>(`/users/${id}/records`);
    console.log("Res: ", response);
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};
