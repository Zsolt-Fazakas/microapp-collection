import React, { useEffect, useState } from "react";
import useStore, { Device, User } from "../Store/UseStore";
import "../Styles/HomeAdminStyle.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import useAutoRedirect from "../Hooks/useAutoRedirect";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HomeAdmin: React.FC = () => {
  useAutoRedirect();
  const {
    devices,
    users,
    fetchDataDevices,
    fetchAllUsers,
    createDevice,
    updateDevice,
    deleteDevice,
    createUser,
    updateUser,
    deleteUser,
    loading,
  } = useStore();

  const [editDevice, setEditDevice] = useState<Device | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

  const [newDevice, setNewDevice] = useState<Device>({
    deviceId: 0,
    userId: 0,
    description: "",
    address: "",
    mhec: 0,
    status: "active",
  });

  const [newUser, setNewUser] = useState<User>({
    userId: 0,
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "client",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchDataDevices();
    fetchAllUsers();
  }, [fetchDataDevices, fetchAllUsers]);

  const handleDeviceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewDevice((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const saveDevice = async () => {
    if (
      !newDevice.description ||
      !newDevice.address ||
      !newDevice.mhec ||
      !newDevice.userId
    ) {
      setSnackbarMessage("All fields are required for the device.");
      setOpenSnackbar(true);
      return;
    }
    if (editDevice) {
      await updateDevice(editDevice.deviceId, newDevice);
      setEditDevice(null);
    } else {
      await createDevice(newDevice);
    }
    fetchDataDevices();
    setNewDevice({
      deviceId: 0,
      userId: 0,
      description: "",
      address: "",
      mhec: 0,
      status: "active",
    });
  };

  const saveUser = async () => {
    if (
      !newUser.name ||
      !newUser.surname ||
      !newUser.email ||
      !newUser.password
    ) {
      setSnackbarMessage("All fields are required for the user.");
      setOpenSnackbar(true);
      return;
    }
    if (editUser) {
      await updateUser(editUser.userId, newUser);
      setEditUser(null);
    } else {
      await createUser(newUser);
    }
    fetchAllUsers();
    setNewUser({
      userId: 0,
      name: "",
      surname: "",
      email: "",
      password: "",
      role: "client",
    });
  };

  const handleEditDevice = (device: Device) => {
    setEditDevice(device);
    setNewDevice(device);
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setNewUser(user);
  };

  return (
    <div className="body">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <div className="formContainer">
        <div className="form deviceForm">
          <h3>{editDevice ? "Edit Device" : "Add Device"}</h3>
          <input
            type="number"
            name="deviceId"
            value={newDevice.deviceId || ""}
            onChange={handleDeviceChange}
            placeholder="Device ID"
          />
          <input
            type="number"
            name="userId"
            value={newDevice.userId || ""}
            onChange={handleDeviceChange}
            placeholder="User ID"
          />
          <input
            type="text"
            name="description"
            value={newDevice.description}
            onChange={handleDeviceChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="address"
            value={newDevice.address}
            onChange={handleDeviceChange}
            placeholder="Address"
          />
          <input
            type="number"
            name="mhec"
            value={newDevice.mhec || ""}
            onChange={handleDeviceChange}
            placeholder="MHEC"
          />
          <select
            name="status"
            value={newDevice.status}
            onChange={handleDeviceChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button onClick={saveDevice}>
            {editDevice ? "Update" : "Create"}
          </button>
        </div>

        <div className="form userForm">
          <h3>{editUser ? "Edit User" : "Add User"}</h3>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleUserChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="surname"
            value={newUser.surname}
            onChange={handleUserChange}
            placeholder="Surname"
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleUserChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="password"
            value={newUser.password}
            onChange={handleUserChange}
            placeholder="Password"
          />
          <select name="role" value={newUser.role} onChange={handleUserChange}>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={saveUser}>{editUser ? "Update" : "Create"}</button>
        </div>
      </div>

      <div className="container">
        <div className="deviceList">
          <h2 className="sectionTitle">Device List</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            devices.map((device) => (
              <div key={device.deviceId} className="card">
                <h3>{device.description}</h3>
                <p>
                  <strong>Address:</strong> {device.address}
                </p>
                <p>
                  <strong>Device ID:</strong> {device.deviceId}
                </p>
                <p>
                  <strong>User ID:</strong> {device.userId}
                </p>
                <p>
                  <strong>MHEC:</strong> {device.mhec}
                </p>
                <p>
                  <strong>Status:</strong> {device.status}
                </p>
                <button onClick={() => handleEditDevice(device)}>Edit</button>
                <button onClick={() => deleteDevice(device.deviceId)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <div className="userList">
          <h2 className="sectionTitle">User List</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            users.map((user) => (
              <div key={user.userId} className="card">
                <h3>
                  {user.name} {user.surname}
                </h3>
                <p>
                  <strong>User ID:</strong> {user.userId}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Password:</strong> {user.password}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.userId)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
