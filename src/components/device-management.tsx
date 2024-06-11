"use client";
import dynamic from "next/dynamic";

import Map from "@/components/map";
import RegisteredDevices from "./registered-devices";
import Records from "./records";
import { useEffect, useState } from "react";
import VideoPlayer from "./videoPlayer";
import { Record, RegisteredDevice } from "@/types";
import { getTimelinesByUserId, getRecordsByUserId } from "@/libs";
import { useRouter } from "next/navigation";
const DynamicMap = dynamic(() => import("@/components/map"), {
  ssr: false,
});
const tabs = [
  {
    title: "Records",
    type: "R",
    component: VideoPlayer,
    api: getRecordsByUserId,
  },
  {
    title: "Timelines",
    type: "T",
    component: Map,
    api: getTimelinesByUserId,
  },
];

export default function DeviceManagement() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [list, setList] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const [registeredDevices, setRegisteredDevices] = useState<
    RegisteredDevice[] | undefined
  >();
  const [activeVideo, setActiveVideo] = useState<string>();
  const [activeMap, setActiveMap] = useState<string>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userIdFromStorage = localStorage.getItem("userId");
      if (!userIdFromStorage) {
        router.push("/login");
      } else {
        setUserId(userIdFromStorage);
      }
    }
  }, [router]);

  useEffect(() => {
    if (userId) {
      getRegisteredDevices();
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/users/${userId}/${activeTab === 0 ? "records" : "timelines"}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setList(data);
        if (activeTab === 0) {
          setActiveVideo(data[0]?.filename || "");
        } else {
          setActiveMap(data[0]?.filename || "");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
      setLoading(false);
    };

    if (userId !== null) {
      fetchData();
    }
  }, [activeTab, userId]);

  const getRegisteredDevices = async () => {
    if (typeof window !== "undefined") {
      try {
        const response = await fetch(`/api/users/${userId}/devices`);
        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }
        const data = await response.json();
        setRegisteredDevices(data);
      } catch (err) {
        console.error("Error fetching devices:", err);
      }
    }
  };

  const onDeleteRecord = async (recordId: string) => {
    const formData = new FormData();
    formData.append("type", String(activeTab));
    try {
      const response = await fetch(`/api/records/${recordId}`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const updatedList = list.filter((record) => record.id !== recordId);
        setList(updatedList);
      } else {
        throw new Error("Failed to delete record");
      }
    } catch (err) {
      console.error("Error deleting record", err);
    }
  };

  const getActive = () => {
    return activeTab === 0 ? setActiveVideo : setActiveMap;
  };

  return (
    <div className="container m-auto py-5 gap-5 grid grid-cols-[35%_auto]">
      <div className="flex flex-col gap-5">
        <RegisteredDevices
          registeredDevices={registeredDevices}
          getRegisteredDevices={getRegisteredDevices}
        />
        <Records
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          recordList={list}
          setActiveRecord={getActive()}
          onDeleteRecord={onDeleteRecord}
          setRecordList={setList}
        />
      </div>
      <div className="h-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div>Loading...</div>
          </div>
        ) : activeTab === 0 ? (
          <VideoPlayer src={activeVideo} />
        ) : (
          <DynamicMap src={activeMap} />
        )}
      </div>
    </div>
  );
}
