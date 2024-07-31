// 컴포넌트 import
import ControlBarMain from "./components/ControlBarMain";
import NavigationNumberMain from "./components/NavigationNumberMain";
import Footer from "./components/Footer";
import CardPosts from "./components/CardPosts";

export default function Board_main() {
  return (
    <div>
      <main className="flex flex-col gap-3 mt-[100px] max-w-[800px] min-h-[1000px] mx-auto p-2">
        <ControlBarMain />
        <CardPosts />
      </main>

      <NavigationNumberMain />
      <Footer />
    </div>
  );
};
