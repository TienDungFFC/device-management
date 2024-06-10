/* eslint-disable react/no-unescaped-entities */
"use client";
import { SetStateAction, Dispatch } from "react";
import DeleteIcon from "./icons/delete";
import { Record, Tabs } from "@/types";

interface Props {
  tabs: Tabs[];
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  recordList: Record[];
  setActiveRecord: Dispatch<SetStateAction<string | undefined>>;
}

export default function Records(props: Props) {
  const { tabs, activeTab, setActiveTab, recordList, setActiveRecord } = props;

  return (
    <div className="border-solid border-[1px] rounded-xl p-5 border-[#e7e7e7e] max-h-[400px] overflow-y-auto">
      <div className="inline-block p-2 bg-[#e7e7e7] rounded-xl">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`${
              activeTab === i ? "bg-white" : "bg-none"
            } py-2 px-3 font-bold rounded-md text-black`}
            onClick={() => setActiveTab(i)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <table className="table-auto mt-4">
        <thead>
          <tr className="text-[#a1a1a1]">
            <th className="text-left w-[50%]">Name</th>
            <th className="w-[35%]">Date</th>
            <th className="w-[15%]">Delete</th>
          </tr>
        </thead>
        <tbody>
          {recordList &&
            recordList.length > 0 &&
            recordList.map((record, i) => {
              return (
                <tr key={i} className="text-center-except-first">
                  <td
                    className="cursor-pointer"
                    onClick={() => setActiveRecord(record?.filename || "")}
                  >
                    {record.filename}
                  </td>
                  <td>{record.created_at}</td>
                  <td>
                    <DeleteIcon />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
