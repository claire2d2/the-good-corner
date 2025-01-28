import instance from "../instance";
import { Ad } from "../../types/Ad";
import { ApiResponse } from "../../types/Api";

export async function createAd(formData: FormData) {
  const { data } = await instance.post<ApiResponse<Ad>>(
    "/ads/create",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
}

export async function updateAd(id: string, formData: FormData) {
  const { data } = await instance.patch(`/ads/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}

export async function findAd(id: string) {
  const { data } = await instance.get<ApiResponse<Ad>>(
    `/ads/find/${id}`
  );

  return data;
}