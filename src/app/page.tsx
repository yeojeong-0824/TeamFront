import CardPosts from "./components/CardPosts";
import { Suspense } from "react";
import LoadingSpinner from "./components/Loading";

export default function Board_main() {
  return (
    <div>
      <main className="max-w-[800px] min-h-[1300px] mx-auto mt-20 relative p-2">
          <Suspense fallback={<LoadingSpinner size={15} mt={400} isLoading={true} />}>
            <CardPosts />
          </Suspense>
      </main>
    </div>
  );
};
