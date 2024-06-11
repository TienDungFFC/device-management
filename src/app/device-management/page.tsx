import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("@/components/header"), {
  ssr: false,
});
const DynamicDeviceManagement = dynamic(
  () => import("@/components/device-management"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <DynamicHeader />
        <DynamicDeviceManagement />
      </div>
    </>
  );
}
