// 컴포넌트 import
import Footer from "./components/Footer";
import CardPosts from "./components/CardPosts";

export default function Board_main() {
  return (
    <div>
      <main className="max-w-[800px] min-h-[1100px] mx-auto mt-10 relative p-2">
        <CardPosts />
      </main>
      
      <Footer />
    </div>
  );
};
