// import "bootstrap/dist/css/bootstrap.min.css";

import Image from "next/image";
import Balancer from "react-wrap-balancer";

export default function Home() {
  // const bannerImages = [databiz, audiophile, meet, maker];

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* hero */}
      <section className="mx-auto flex max-w-6xl  flex-col-reverse gap-2  px-4  pb-12 transition-all md:flex-row md:gap-4">
        {/* left div */}
        <div className=" flex flex-col items-center  gap-6 pt-8 text-center md:w-1/2 md:items-start md:gap-10 md:pt-32 md:text-left">
          <h1 className="text-4xl font-semibold md:text-6xl">
            <Balancer>Welcome to RCE</Balancer>
          </h1>

          <h3 className=" text-neutral-600 md:max-w-[400px]">
            <Balancer>Find the best content for DSA</Balancer>
          </h3>

          <button className="border-balck  w-fit rounded-xl border-2 bg-black px-4 py-2  text-white transition-all hover:border-black hover:bg-black hover:bg-transparent  hover:text-black/90">
            Learn more
          </button>
        </div>

        {/* right div */}
      </section>
    </div>
  );
}
