const NavigationNumberMain = () => {
  const btn_style = "p-1 rounded-sm w-[25px]";
  return (
    <nav className="w-full flex justify-center mt-3">
      <div className="w-[200px] flex justify-around">
        <button className={`btn_style`}>1</button>
        <button className={btn_style}>2</button>
        <button className={btn_style}>3</button>
        <button className={btn_style}>4</button>
        <button className={btn_style}>5</button>
      </div>
    </nav>
  )
}

export default NavigationNumberMain;