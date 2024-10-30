import { create } from "zustand";
import axios from "axios";

export interface User {
  userId: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
}

export interface Device {
  deviceId: number;
  userId: number;
  description: string;
  address: string;
  mhec: number;
  status: string;
}

export interface UserSummary {
  userId: number;
  name: string;
  surname: string;
  email: string;
}

interface StoreState {
  user: User | null;
  users: User[];
  devices: Device[];
  userDevices: Device[];
  userSummary: UserSummary | null;
  loading: boolean;
  error: string | null;

  loginUser: (email: string, password: string) => void;
  signInUser: (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => void;
  fetchDataDevices: () => void;
  createDevice: (newDevice: Device) => Promise<void>;
  updateDevice: (
    deviceId: number,
    updatedData: Partial<Device>
  ) => Promise<void>;
  deleteDevice: (deviceId: number) => Promise<void>;
  fetchAllUsers: () => Promise<void>;
  createUser: (newUser: User) => Promise<void>;
  updateUser: (userId: number, updatedData: Partial<User>) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
  getDevicesByUserId: (userId: number) => Promise<void>; 
  getUserSummaryById: (userId: number) => Promise<void>;
}

const useStore = create<StoreState>((set, get) => ({
  user: null,
  users: [],
  devices: [],
  userDevices: [],
  userSummary: null,
  loading: false,
  error: null,

  loginUser: async (email: string, password: string) => {
    try {
      const response = await axios.post<User>("http://localhost:8080/Login", {
        email,
        password,
      });
      if (response.data) {
        set({ user: response.data, error: null });
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        set({ user: null, error: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Login error", error);
      set({ user: null, error: "An error occurred during login" });
    }
  },

  signInUser: async (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post<boolean>(
        "http://localhost:8080/SignIn",
        {
          name,
          surname,
          email,
          password,
        }
      );
      set({ error: response.data ? null : "Email already registered" });
    } catch (error) {
      console.error("Registration error", error);
      set({ error: "An error occurred during registration" });
    }
  },

  fetchDataDevices: async () => {
    set({ loading: true });
    try {
      const response = await axios.get<Device[]>(
        "http://localhost:8081/GetAllDevices"
      );
      set({ devices: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching devices data:", error);
      set({ loading: false });
    }
  },

  createDevice: async (newDevice) => {
    try {
      const response = await axios.post<Device>(
        "http://localhost:8081/CreateDevice",
        newDevice
      );
      set((state) => ({ devices: [...state.devices, response.data] }));
    } catch (error) {
      console.error("Error creating device:", error);
    }
  },

  updateDevice: async (deviceId, updatedData) => {
    try {
      await axios.put(
        `http://localhost:8081/UpdateDevice/${deviceId}`,
        updatedData
      );
      const { fetchDataDevices } = get();
      await fetchDataDevices();
    } catch (error) {
      console.error("Error updating device:", error);
    }
  },

  deleteDevice: async (deviceId) => {
    try {
      await axios.delete(`http://localhost:8081/DeleteDevice/${deviceId}`);
      set((state) => ({
        devices: state.devices.filter((device) => device.deviceId !== deviceId),
      }));
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  },

  fetchAllUsers: async () => {
    set({ loading: true });
    try {
      const response = await axios.get<User[]>(
        "http://localhost:8080/GetAllUsers"
      );
      set({ users: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching users:", error);
      set({ loading: false });
    }
  },

  createUser: async (newUser) => {
    try {
      const response = await axios.post<User>(
        "http://localhost:8080/SignIn",
        newUser
      );
      set((state) => ({ users: [...state.users, response.data] }));
    } catch (error) {
      console.error("Error creating user:", error);
    }
  },

  updateUser: async (userId, updatedData) => {
    try {
      await axios.put(
        `http://localhost:8080/UpdateUser/${userId}`,
        updatedData
      );
      const { fetchAllUsers } = get();
      await fetchAllUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },

  deleteUser: async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/DeleteUser/${userId}`);
      set((state) => ({
        users: state.users.filter((user) => user.userId !== userId),
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },

  getDevicesByUserId: async (userId: number) => {
    set({ loading: true });
    try {
      const response = await axios.get<Device[]>(
        `http://localhost:8081/GetDevice/${userId}`
      );
      set({ userDevices: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching devices by user ID:", error);
      set({ loading: false });
    }
  },

  getUserSummaryById: async (userId: number) => {
    set({ loading: true });
    try {
      const response = await axios.get<User>(
        `http://localhost:8081/GetSummary/${userId}`
      );
      set({ userSummary: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching user summary by ID:", error);
      set({ loading: false });
    }
  },
}));

export default useStore;
