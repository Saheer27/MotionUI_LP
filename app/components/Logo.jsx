export default function Logo() {
  return (
    <div className="logo absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6 z-20">
      <div className="col flex flex-col justify-end">
        <div
          className="block block-1 w-[35px] h-[35px] bg-[#ffe9d9]"
          style={{
            transform: "rotate(42deg)",
            transformOrigin: "bottom right",
          }}
        />
        <div className="block block-2 w-[35px] h-[35px] bg-[#ffe9d9]" />
      </div>
      <div className="col flex flex-col justify-end gap-[26px]">
        <div className="block block-3 w-[35px] h-[35px] bg-[#ffe9d9]" />
        <div className="block block-4 w-[35px] h-[35px] bg-[#ffe9d9]" />
      </div>
      <div className="col flex flex-col justify-end">
        <div
          className="block block-5 w-[35px] h-[35px] bg-[#ffe9d9]"
          style={{
            transform: "rotate(-42deg)",
            transformOrigin: "bottom left",
          }}
        />
        <div className="block block-6 w-[35px] h-[35px] bg-[#ffe9d9]" />
      </div>
    </div>
  );
}
