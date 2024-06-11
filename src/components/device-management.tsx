"use client";

import Map from "@/components/map";
import RegisteredDevices from "./registered-devices";
import Records from "./records";
import { useEffect, useState } from "react";
import VideoPlayer from "./videoPlayer";
import { Record, RegisteredDevice } from "@/types";
import { getTimelinesByUserId, getRecordsByUserId } from "@/libs";
import { useRouter } from "next/navigation";

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
  const userId = localStorage.getItem("userId");
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push("/login");
    }
  }, [userId, router]);

  const [activeTab, setActiveTab] = useState(0);
  const [list, setList] = useState<Record[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registeredDevices, setRegisteredDevices] =
    useState<RegisteredDevice[]>();

  const [activeVideo, setActiveVideo] = useState<string>();
  const [activeMap, setActiveMap] = useState<string>();

  const getRegisteredDevices = () => {
    try {
      fetch(`/api/users/${userId}/devices`)
        .then((res) => res.json())
        .then((data) => {
          setRegisteredDevices(data);
          setLoading(false);
        });
    } catch (err: any) {
      setError(err.message);
    }
  };
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setError(null);
      try {
        fetch(
          `/api/users/${userId}/${activeTab == 0 ? "records" : "timelines"}`
        )
          .then((res) => res.json())
          .then((data) => {
            setList(data);
            if (activeTab == 0) {
              setActiveVideo(data[0]?.filename || "");
            } else {
              setActiveMap(data[0]?.filename || "");
            }
            setLoading(false);
          });
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [activeTab, userId]);

  useEffect(() => {
    getRegisteredDevices();
  }, []);

  const getActive = () => {
    if (activeTab === 0) {
      return setActiveVideo;
    }
    return setActiveMap;
  };

  const onDeleteRecord = async (recordId: string) => {
    const formData = new FormData();
    formData.append("type", String(activeTab));
    try {

      const res = await fetch(`/api/records/${recordId}`, {
        method: "POST", 
        body: formData,
      });
      const updatedList = list?.filter((record) => record.id !== recordId);
      setList(updatedList);
    } catch (err) {
      console.log("Error deleting record", err)
    }
  }
  

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
          recordList={list || []}
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
        ) : activeTab == 0 ? (
          <VideoPlayer src={activeVideo} />
        ) : (
          <Map src={activeMap} />
        )}
      </div>
    </div>
  );
}
