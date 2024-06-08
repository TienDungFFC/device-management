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

  const [activeVideo, setActiveVideo] = useState();
  const [activeMap, setActiveMap] = useState();
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
        />
      </div>
      <div className="h-full">
        {activeTab == 0 ? <VideoPlayer src={"/videos/mov_bbb.mp4"} /> : <Map />}
      </div>
    </div>
  );
}
