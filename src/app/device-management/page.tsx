import DeviceManagement from "@/components/device-management";
import Header from "@/components/header";

export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />
        <DeviceManagement />
      </div>
    </>
  );
}
