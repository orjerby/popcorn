import Stars from "./Stars";

function Card() {
  return (
    <div className="flex h-522 flex-col overflow-hidden">
      <div className="mt-37 flex h-481 w-268 flex-col items-center justify-center rounded-sm bg-white">
        <div className="group flex flex-col items-center gap-10">
          <img
            className="mt-105 h-256 w-full cursor-pointer object-contain transition-all duration-300 group-hover:scale-105"
            src="https://www.pipsnacks.com/cdn/shop/files/PC-Popcorn_Truffle_4.5oz_010323-render-front_7beebedc-e973-43e5-af88-a6fbe1848bd5.png?v=1690293798&width=165 165w, //www.pipsnacks.com/cdn/shop/files/PC-Popcorn_Truffle_4.5oz_010323-render-front_7beebedc-e973-43e5-af88-a6fbe1848bd5.png?v=1690293798&width=360 360w, //www.pipsnacks.com/cdn/shop/files/PC-Popcorn_Truffle_4.5oz_010323-render-front_7beebedc-e973-43e5-af88-a6fbe1848bd5.png?v=1690293798&width=533 533w, //www.pipsnacks.com/cdn/shop/files/PC-Popcorn_Truffle_4.5oz_010323-render-front_7beebedc-e973-43e5-af88-a6fbe1848bd5.png?v=1690293798&width=720 720w, //www.pipsnacks.com/cdn/shop/files/PC-Popcorn_Truffle_4.5oz_010323-render-front_7beebedc-e973-43e5-af88-a6fbe1848bd5.png?v=1690293798&width=940 940w, //www.pipsnacks.com/cdn/shop/files/PC-Popcorn_Truffle_4.5oz_010323-render-front_7beebedc-e973-43e5-af88-a6fbe1848bd5.png?v=1690293798&width=1066 1066w, //www.pipsnacks.com/cdn/shop/files/PC-Popcorn_Truffle_4.5oz_010323-render-front_7beebedc-e973-43e5-af88-a6fbe1848bd5.png?v=1690293798 3000w"
            alt="Popcorn"
          />
          <h3 className="text-lg font-bold">Truffle Mini Popcorn</h3>
          <div className="mt-16 flex flex-col items-center gap-10">
            <div className="flex gap-x-5 font-bold">
              <span>4-PACK</span>
              <span>|</span>
              <span>$18</span>
            </div>
            <div className="flex">
              <Stars></Stars>
              <span className="pl-5 text-sm font-bold text-[#337d9c]">
                295 REVIEWS
              </span>
            </div>
          </div>

          <div className="mt-20 mb-190 flex flex-col gap-10">
            <button className="w-188 cursor-pointer rounded-[5px] bg-[#3eadb8] p-12 font-bold text-white hover:opacity-70">
              ADD TO CART
            </button>
            <button className="w-188 cursor-pointer rounded-[5px] bg-[#b69775] p-12 font-bold text-white hover:opacity-70">
              VIEW MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
