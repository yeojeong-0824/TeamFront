// 컴포넌트 import
import Main_control_bar from "./components/Control_bar_main";
import Main_post_cards from "./components/Main_post_cards";
import Main_navigation_number from "./components/Navigation_number_main";
import Footer from "./components/Footer";
import Card_post from "./components/Card_post";

export default function Board_main() {
  return (
    <div>
      <main className="flex flex-col gap-3 mt-[100px] max-w-[800px] min-h-[1000px] mx-auto p-2">
        <Main_control_bar />
        <Card_post />
      </main>
      <Main_navigation_number />
      <Footer />
    </div>
  );
};
