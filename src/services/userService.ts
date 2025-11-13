import apiClient from './api';

type BackendUser = {
  id?: string;
  _id?: string;
  fullName: string;
  email: string;
  role: string;
  isActive?: boolean;
};

type ApiListResponse = { success: boolean; data: BackendUser[] };
type ApiItemResponse = { success: boolean; data: BackendUser };
type ApiDeleteResponse = { success: boolean; data: { deleted: boolean } };
// type ApiLoginResponse = { success: boolean; data?: { token?: string; user?: BackendUser }; message?: string };
type ApiLoginResponse = { success: boolean;  user?: BackendUser ; message?: string };

export const userService = {
  async list() {
    const res = await apiClient.get<ApiListResponse>('/users');
    return (res.data || []).map((u) => ({
      id: u.id || u._id || '',
      fullName: u.fullName,
      email: u.email,
      role: u.role,
      isActive: u.isActive ?? true,
    }));
  },

  async create(input: { fullName: string; email: string; password: string; role: string; isActive: boolean }) {
    const payload = {
      fullName: input.fullName,
      email: input.email,
      password: input.password,
      role: input.role,
      isActive: input.isActive,
    };
    const res = await apiClient.post<ApiItemResponse>('/users', payload);
    const u = res.data;
    return {
      id: u.id || u._id || '',
      fullName: u.fullName,
      email: u.email,
      role: u.role,
      isActive: u.isActive ?? true,
    };
  },

  async update(id: string, input: Partial<{ fullName: string; email: string; password: string; role: string; isActive: boolean }>) {
    const res = await apiClient.put<ApiItemResponse>(`/users/${id}`, input);
    const u = res.data;
    return {
      id: u.id || u._id || '',
      fullName: u.fullName,
      email: u.email,
      role: u.role,
      isActive: u.isActive ?? true,
    };
  },

  async remove(id: string) {
    const res = await apiClient.delete<ApiDeleteResponse>(`/users/${id}`);
    return res.data?.deleted ?? true;
  },

  async login(email: string, password: string) {
    const res = await apiClient.post<ApiLoginResponse>('/users/login', { email, password });
    return res;
  },
};

export type UserDTO = Awaited<ReturnType<typeof userService.list>>[number];