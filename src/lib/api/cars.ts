import { axiosClient } from './axiosClient';
import { Car } from '@/types/car';

interface FetchCarsResponse {
  cars: Car[];
  total: number;
  page: number;
  totalPages: number;
}

export const fetchCars = async (page = 1, limit = 8): Promise<{ cars: Car[]; totalPages: number }> => {
  const response = await axiosClient.get('/cars');
  
  let allCars: Car[] = [];
  if (Array.isArray(response.data)) {
    allCars = response.data;
  } else if (response.data && Array.isArray((response.data as any).cars)) {
    allCars = (response.data as any).cars;
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCars = allCars.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allCars.length / limit);

  return {
    cars: paginatedCars,
    totalPages,
  };
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await axiosClient.get<Car>(`/cars/${id}`);
  return response.data;
};