import star from "@/assets/star.svg";
import user from "@/assets/user_black.svg";

export default function WaitForOrderPlacement() {
  return (
    <div className="bg-white rounded-md px-12 py-8 pb-12">
      <p className="font-semibold text-lg">Waiting For Order Placement</p>
      <div className="mt-10">
        <p className="font-medium text-center">Your Intermediary</p>
        <div className="p-5 bg-sky-100 flex gap-3 items-center mt-10 w-max mx-auto rounded-lg">
          <img src={user} className="block w-14 h-14" />
          <div className="flex flex-col gap-3 items-end">
            <p className="font-semibold">Soojong</p>
            <div className="flex gap-2 items-center">
              <img src={star} className="block w-5 h-5" />
              <p className="font-medium">4.5</p>
            </div>
          </div>
        </div>
        <p className="text-center mt-10">
          We will notify you upon the placement of an order!
        </p>
      </div>
    </div>
  );
}
