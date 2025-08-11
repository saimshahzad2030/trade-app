import Navbar from "@/components/Navbar/Navbar";
 
import { poppins } from "@/fonts/fonts"; 
import Custom404 from "@/components/Custom404/Custom404";
export default function Housing() {
  return (
    <div className={`flex flex-col items-center   w-full ${poppins.className}`}>
      <Navbar />

      <div className="relative flex flex-col    w-full overflow-x-hidden  pt-40 bg-[#13131f]">
         
        <Custom404 /> 
      </div>
    </div>
  );
}
