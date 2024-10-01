import React from "react";
import saleImgOne from "../../assets/images/homeSales/saleImgOne.webp";
import saleImgTwo from "../../assets/images/homeSales/saleImgTwo.webp";
import saleImgThree from "../../assets/images/homeSales/saleImgThree.webp";
import { Link } from "react-router-dom";

export default function Sales() {
  return (
    <div className="py-20 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10">
      <div className="w-full md:w-2/3 lg:w-1/2 h-full">
        <Link to="/shop">
          <img className="h-full w-full object-cover" src={saleImgOne} />
        </Link>
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10">
        <div className="h-1/2 w-full">
          <Link to="/shop">
            <img className="h-full w-full object-cover" src={saleImgTwo} />
          </Link>
        </div>
        <div className="h-1/2 w-full">
          <Link to="/shop">
            <img className="h-full w-full object-cover" src={saleImgThree} />
          </Link>
        </div>
      </div>
    </div>
  );
}
