import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent"; //this
import Link from "next/link";
import Image from "next/image";
import Box from "@/components/Box";
import Mbabox from "./MBA.png";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="c">
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">
            Welcome to ReviseIT
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-1 xl:grid-cols-3 2xl-grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Audio notes"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Newest Audio notes
          </h1>
        </div>
        {/* <PageContent songs={songs} /> */}
        <Box>
          <Link href={"/mba"}>
            <Child1 />
          </Link>
        </Box>
      </div>
    </div>
  );
}

const Child1 = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
        <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
          <Image className="object-cover" src={Mbabox} fill alt="image" />
        </div>
        <div className="flex flex-col items-start w-full pt-4 gap-y-1">
          <p className="font-semibold truncate w-full">{"MBA"}</p>
          {/* <p className="text-neutral-400 text-sm pb-4 w-full truncate">
            By {P}
          </p> */}
        </div>
      </div>
    </div>
  );
};
