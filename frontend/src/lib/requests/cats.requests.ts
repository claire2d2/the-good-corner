import instance from "../instance";
import { Ad, Category } from "../../types/Ad";
import { ApiResponse } from "../../types/Api";



export async function getAdsByCategory(id: string) {
  const { data } = await instance.get<ApiResponse<Category>>(
    `/categories/find/${id}`
  );
  return data;
}

export async function categoriesList() {
  const { data } = await instance.get<ApiResponse<Category[]>>(
    "categories/list"
  );
  return data;
}