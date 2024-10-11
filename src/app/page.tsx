import Navbar from "@/components/Navbar";
import SendEth from "@/components/SendEth";
import ShowNft from "@/components/ShowNft";
import ShowTxn from "@/components/ShowTxn";

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-black">
      <Navbar />
      <div className="pt-20 flex flex-col gap-10 w-full items-center">
        <SendEth />
        <ShowTxn />
      </div>
    </div>
  );
}
