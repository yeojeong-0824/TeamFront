import CardPosts from "./components/CardPosts";
import { Suspense } from "react";
import LoadingSpinner from "./components/Loading";

export default function Board_main() {
  return (
    <div>
      <main className="relative max-w-[800px] min-h-[calc(100vh-280px)] mx-auto mt-10 sm:mt-20 p-2 sm:min-h-[calc(100vh-283px)]">
        <Suspense fallback={<></>}>
          <CardPosts />
        </Suspense>
      </main>
    </div>
  );
}
