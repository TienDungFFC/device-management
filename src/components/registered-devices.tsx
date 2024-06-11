import { RegisteredDevice } from "@/types";
import DeleteIcon from "./icons/delete";
import { useState, useEffect } from "react";
/* eslint-disable react/no-unescaped-entities */

export default function RegisteredDevices({
  registeredDevices,
  getRegisteredDevices,
}: {
  registeredDevices: RegisteredDevice[] | undefined;
  getRegisteredDevices: () => void;
}) {
  const [newDevices, setNewDevices] = useState<{ name: string; id: string }[]>([
    { name: "", id: "" },
  ]);
  const [errorRegisteredDevice, setErrorRegisteredDevice] = useState<
    string | null
  >(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getRegisteredDevices();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [getRegisteredDevices]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (errorRegisteredDevice) {
      timeout = setTimeout(() => {
        setErrorRegisteredDevice(null);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [errorRegisteredDevice]);

  if (!registeredDevices) {
    return null;
  }

  const handleAddNewDevice = () => {
    setNewDevices([...newDevices, { name: "", id: "" }]);
  };

  const handleNewDeviceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedNewDevices = newDevices.map((device, i) =>
      i === index ? { ...device, [name]: value } : device
    );
    setNewDevices(updatedNewDevices);
  };

  const handleRegisterDevice = async (index: number) => {
    const newDevice = newDevices[index];
    if (newDevice.name && newDevice.id) {
      try {
        const formData = new FormData();
        formData.append("id", newDevice.id);
        formData.append("name", newDevice.name);
        if (typeof window !== "undefined") {
          formData.append("userId", localStorage.getItem("userId") || "");
        }
        const res = await fetch("/api/devices/register", {
          method: "POST",
          body: formData,
        });

        if (res.status !== 200) {
          const errorData = await res.json();
          setErrorRegisteredDevice(errorData.message);
          return;
        }
        const updatedNewDevices = [...newDevices];
        updatedNewDevices.splice(index, 1);
        setNewDevices(updatedNewDevices);
        getRegisteredDevices();
      } catch (error: any) {
        console.error("Error registering device:", error);
        setErrorRegisteredDevice(error.message);
      }
    }
  };

  const handleRemoveNewDevice = (index: number) => {
    const updatedNewDevices = [...newDevices];
    updatedNewDevices.splice(index, 1);
    setNewDevices(updatedNewDevices);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/devices/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        getRegisteredDevices();
      }
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  return (
    <div className="border-solid border-[1px] rounded-xl p-5 border-[#e7e7e7e] max-h-[600px] overflow-y-auto">
      <h3 className="font-bold text-lg mb-2 text-black">Registered Devices</h3>

      <table className="table-auto w-full">
        <thead>
          <tr className="text-[#a1a1a1] w-full border-b-[1px] py-2 table-header-tr">
            <th className="text-left w-[40%]">Device's Name</th>
            <th className="w-[30%]">ID</th>
            <th className="w-[15%]">Status</th>
            <th className="w-[15%]">Remove</th>
          </tr>
        </thead>
        <tbody>
          {registeredDevices &&
            registeredDevices.length > 0 &&
            registeredDevices.map((registeredDevice, i) => (
              <tr
                key={i}
                className="text-center-except-first text-black border-b-[1px]"
              >
                <td>{registeredDevice.name}</td>
                <td>{registeredDevice.id}</td>
                <td>
                  {registeredDevice.status === 1 ? (
                    <span className="text-[#2a9a20]">online</span>
                  ) : (
                    "offline"
                  )}
                </td>
                <td>
                  <div
                    className="text-center flex justify-center"
                    onClick={() => {
                      if (typeof window !== "undefined" && window.confirm) {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this device?"
                          )
                        ) {
                          handleDelete(registeredDevice.id);
                        }
                      }
                    }}
                  >
                    <DeleteIcon />
                  </div>
                </td>
              </tr>
            ))}
          {newDevices.map((newDevice, i) => (
            <tr key={`new-${i}`} className="text-center-except-first">
              <td>
                <input
                  className="py-1 rounded-lg w-full outline-none"
                  type="text"
                  name="name"
                  value={newDevice.name}
                  onChange={(e) => handleNewDeviceChange(e, i)}
                  placeholder="Device's Name"
                />
              </td>
              <td>
                <input
                  className="py-1 rounded-lg w-full outline-none"
                  type="text"
                  name="id"
                  value={newDevice.id}
                  onChange={(e) => handleNewDeviceChange(e, i)}
                  placeholder="ID"
                />
              </td>
              <td colSpan={1} className="">
                <button
                  className="p-2 bg-gray-300 text-black rounded-lg"
                  onClick={() => handleRegisterDevice(i)}
                >
                  Register
                </button>
              </td>
              <td>
                {newDevices.length > 1 && (
                  <div
                    className="text-center flex justify-center "
                    onClick={() => handleRemoveNewDevice(i)}
                  >
                    <DeleteIcon />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-center mt-3 text-gray-400">
        <span
          className="cursor-pointer p-2 hover:text-gray-500"
          onClick={handleAddNewDevice}
        >
          New device
        </span>
      </p>
      {errorRegisteredDevice && (
        <p className="text-center text-red-500 mt-2">{errorRegisteredDevice}</p>
      )}
    </div>
  );
}
