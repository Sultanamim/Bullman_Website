import React from "react";

export default function TrackingSlider() {
  return (
    <div className="bg-white border my-5 pb-5">
      <div className="flex flex-row items-center justify-between pt-4 px-6">
        <p className="text-[#000] text-[16px] font-[401] mb-[25px]">
          Suivi de commande
        </p>
      </div>
      {/* row 1 */}
      <div className="flex flex-row items-center justify-center px-6">
        {/* circle 1 */}
        <div className="w-[40px] h-[40px] border-[4px] border-navyBlue bg-navyBlue rounded-[40px] flex items-center justify-center">
          <i className="fa-solid fa-check text-white text-[24px]"></i>
        </div>
        <div className="h-[4px] w-1/5 bg-navyBlue"></div>
        {/* circle 2 */}
        <div className="w-[40px] h-[40px] border-[4px] border-[#d1d1d1] rounded-[40px]"></div>
        <div className="h-[4px] w-1/5 bg-[#d1d1d1]"></div>
        {/* circle 3 */}
        <div className="w-[40px] h-[40px] border-[4px] border-[#d1d1d1] rounded-[40px]"></div>
        <div className="h-[4px] w-1/5 bg-[#d1d1d1]"></div>
        {/* circle 4 */}
        <div className="w-[40px] h-[40px] border-[4px] border-[#d1d1d1] rounded-[40px]"></div>
        <div className="h-[4px] w-1/5 bg-[#d1d1d1]"></div>
        {/* circle 5 */}
        <div className="w-[40px] h-[40px] border-[4px] border-[#d1d1d1] rounded-[40px]"></div>
      </div>
      {/* row 2 */}
      <div className="flex flex-row items-center px-0  w-full mt-3">
        <div className="flex flex-col items-center justify-start w-1/5">
          {/* item 1 */}
          <div className="flex flex-col items-center ml-[-100px]">
            <img
              src="/img/track-1.webp"
              className="mb-2 mlg:w-[40px] mlg:h-[32px]"
            />
            <p className="font-medium text-[16px] mlg:text-[12px] text-navyBlue">
              Order received
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-1/5">
          {/* item 2 */}
          <div className="flex flex-col items-center ml-[-50px]">
            <img
              src="/img/track-2.png"
              className="mb-2 mlg:w-[40px] mlg:h-[32px]"
            />
            <p className="font-medium text-[16px] mlg:text-[12px] w-[105px] text-center text-[#000]">
              Reassort / Production on order
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-1/5">
          {/* item 3 */}
          <div className="flex flex-col items-center">
            <img
              src="/img/track-3.webp"
              className="mb-2 mlg:w-[40px] mlg:h-[32px]"
            />
            <p className="font-medium text-[16px] mlg:text-[12px] text-[#000]">
              Packed
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-1/5">
          {/* item 4 */}
          <div className="flex flex-col items-center mr-[-60px]">
            <img
              src="/img/track-4.webp"
              className="mb-2 mlg:w-[40px] mlg:h-[32px]"
            />
            <p className="font-medium text-[16px] mlg:text-[12px] text-[#000]">
              Shipped
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-1/5">
          {/* item 5 */}
          <div className="flex flex-col items-center mr-[-100px]">
            <img
              src="/img/track-5.webp"
              className="mb-2 mlg:w-[40px] mlg:h-[32px]"
            />
            <p className="font-medium text-[16px] mlg:text-[12px] text-[#000]">
              Delivered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
