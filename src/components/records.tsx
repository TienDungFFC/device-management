"use client";
import { useEffect, useState } from "react";
import { SetStateAction, Dispatch } from "react";
import DeleteIcon from "./icons/delete";
import { Record, Tabs } from "@/types";

interface Props {
  tabs: Tabs[];
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  recordList: Record[];
  setRecordList: Dispatch<SetStateAction<Record[] | undefined>>;
  setActiveRecord: Dispatch<SetStateAction<string | undefined>>;
  onDeleteRecord: (recordId: string) => void;
}

export default function Records(props: Props) {
  const {
    tabs,
    activeTab,
    setActiveTab,
    recordList,
    setRecordList,
    setActiveRecord,
    onDeleteRecord,
  } = props;

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch(
          `/api/users/${localStorage.getItem("userId")}/${
            activeTab === 0 ? "records" : "timelines"
          }`
        );
        if (res.ok) {
          const data = await res.json();
          setRecordList(data);
        }
      } catch (err) {
        console.error("Error fetching records:", err);
      }
    };

    const intervalId = setInterval(() => {
      fetchRecords();
    }, 5000);

    fetchRecords();

    return () => clearInterval(intervalId);
  }, [activeTab, setRecordList]);

  return (
    <div className="border-solid border-[1px] rounded-xl p-5 border-[#e7e7e7e] max-h-[400px] overflow-y-auto">
      <div className="inline-block p-2 bg-[#e7e7e7] rounded-xl">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`py-2 px-3 font-bold rounded-md text-black tab-button ${
              activeTab === i ? "active" : ""
            }`}
            onClick={() => setActiveTab(i)}
            style={{ transformOrigin: "center", outline: "none" }}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <table className="table-auto mt-4 w-full">
        <thead>
          <tr className="text-[#a1a1a1] border-b-[1px]">
            <th className="text-left w-[50%]">Name</th>
            <th className="w-[35%]">Date</th>
            <th className="w-[15%]">Delete</th>
          </tr>
        </thead>
        <tbody>
          {recordList &&
            recordList.length > 0 &&
            recordList.map((record, i) => (
              <tr
                key={i}
                className={`text-center-except-first text-black ${
                  i !== recordList.length - 1 ? "border-b border-gray-300" : ""
                }`}
              >
                <td
                  className="cursor-pointer"
                  onClick={() => setActiveRecord(record?.filename || "")}
                >
                  {record.filename}
                </td>
                <td>{record.created_at}</td>
                <td
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to delete this record?")
                    ) {
                      onDeleteRecord(record.id);
                    }
                  }}
                >
                  <DeleteIcon />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
