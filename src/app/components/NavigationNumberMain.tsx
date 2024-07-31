const NavigationNumberMain = () => {
  const btn_style = "p-1 rounded-sm w-[25px]";
  return (
    <nav className="w-full flex justify-center mt-3">
      <div className="w-[200px] flex justify-around"> {/* 추후 페이지네이션 기능 추가 시 버튼 동적 생성 필요 */}
        <button className={`btn_style underline text-blue-500`}>1</button>
        <button className={btn_style}>2</button>
        <button className={btn_style}>3</button>
        <button className={btn_style}>4</button>
        <button className={btn_style}>5</button>
        <button className={btn_style}>...</button>
      </div>
    </nav>
  )
}

export default NavigationNumberMain;