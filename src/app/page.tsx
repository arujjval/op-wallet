import Navbar from "@/components/Navbar";
import SendEth from "@/components/SendEth";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#000000]">
      <Navbar />
      <div className="flex flex-row w-full">
        <SendEth />
      </div>
    </div>
  );
}
