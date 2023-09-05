import celebration from "@/assets/celebration.svg";
import star from "@/assets/star_white.svg";
import star_filled from "@/assets/star_filled.svg";
import { useRef, useState } from "react";

const RateUserBox = () => {
  const [rating, setRating] = useState(0);
  const ratingStars = useRef();
  const ratingFilledStars = useRef();

  const ratingPercentage = (5 * ((100 - parseFloat(rating)) / 100)).toFixed(1);

  const handleRatingStarClick = (e) => {
    const elem = ratingStars.current.getBoundingClientRect();

    let x = e.clientX - elem.x;
    let width = elem.right - elem.x;
    let percentage = (100 - (x / width) * 100).toFixed(2);

    setRating(`${percentage}`);
  };

  const handleRatingFilledStarClick = (e) => {
    const elem = ratingFilledStars.current.getBoundingClientRect();

    let x = e.clientX - elem.x;
    let width = elem.right - elem.x;
    let percentage = (100 - (x / width) * 100).toFixed(2);

    setRating(`${percentage}`);
  };

  return (
    <div>
      <div className="mt-12">
        <p className=" text-center">
          You have rated: <span className="font-bold">{ratingPercentage}</span>{" "}
          / 5.0
        </p>
      </div>
      <div className="mt-4 flex justify-center relative">
        <div
          ref={ratingFilledStars}
          className="flex items-center justify-center gap-1 absolute"
          onClick={handleRatingFilledStarClick}
          style={{
            clipPath: `inset(0% ${rating}% 0% 0%`,
            transition: "all 0.1s ease-in",
          }}
        >
          <img src={star_filled} className="w-10 h-10" />
          <img src={star_filled} className="w-10 h-10" />
          <img src={star_filled} className="w-10 h-10" />
          <img src={star_filled} className="w-10 h-10" />
          <img src={star_filled} className="w-10 h-10" />
        </div>
      </div>
      <div className="flex justify-center">
        <div
          ref={ratingStars}
          className="flex items-center justify-center gap-1 "
          onClick={handleRatingStarClick}
        >
          <img src={star} className="w-10 h-10" />
          <img src={star} className="w-10 h-10" />
          <img src={star} className="w-10 h-10" />
          <img src={star} className="w-10 h-10" />
          <img src={star} className="w-10 h-10" />
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button className="bg-sky-600 font-semibold p-3 rounded-lg text-white">
          Submit
        </button>
      </div>
    </div>
  );
};

export default function EscrowReleased() {
  return (
    <div className="bg-white rounded-md px-12 py-8 pb-12">
      <p className="font-semibold text-lg">Complete</p>
      <div className="relative w-40 h-40 mt-10 mx-auto">
        <img
          src={celebration}
          className="w-4/6 h-auto absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <h3 className="mt-10 font-semibold text-xl text-center">
        Order Complete!
      </h3>
      <p className="text-slate-500 mt-3 text-sm text-center">
        The escrow has been released upon your permission! Please rate and share
        your experience with intermediary for future customers!
      </p>
      <RateUserBox />
    </div>
  );
}
