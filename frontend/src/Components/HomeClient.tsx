import React, { useEffect } from "react";
import useStore from "../Store/UseStore";
import "../Styles/HomeClientStyle.css";
import useAutoRedirect from "../Hooks/useAutoRedirect";

const HomeClient: React.FC = () => {
  useAutoRedirect();
  const {
    userSummary,
    userDevices,
    getUserSummaryById,
    getDevicesByUserId,
    loading,
  } = useStore();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const userId = user.userId;

      getUserSummaryById(userId);
      getDevicesByUserId(userId);
    }
  }, [getUserSummaryById, getDevicesByUserId]);

  return (
    <div className="clientBody">
      <div className="clientContainer">
        <div className="clientSummaryCard">
          <h2 className="clientSectionTitle">User Summary</h2>
          {loading ? (
            <p>Loading...</p>
          ) : userSummary ? (
            <div className="clientCard">
              <h3>
                {userSummary.name} {userSummary.surname}
              </h3>
              <p>
                <strong>Email:</strong> {userSummary.email}
              </p>
              <p>
                <strong>User ID:</strong> {userSummary.userId}
              </p>
            </div>
          ) : (
            <p>No user summary found.</p>
          )}
        </div>

        <div className="clientDeviceList">
          <h2 className="clientSectionTitle">Device Details</h2>
          {loading ? (
            <p>Loading...</p>
          ) : userDevices.length > 0 ? (
            userDevices.map((device) => (
              <div key={device.deviceId} className="clientCard">
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
              </div>
            ))
          ) : (
            <p>No devices found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
