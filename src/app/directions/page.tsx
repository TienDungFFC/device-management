import Image from "next/image";
import MapWithWaypoints from "../../components/map";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MapWithWaypoints />
    </main>
  );
}
