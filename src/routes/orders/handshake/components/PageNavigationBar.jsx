import left from "@/assets/left.svg";
import right from "@/assets/right.svg";
import useCustomersOrdersPageNumber from "@/hooks/useCustomersOrdersPageNumber";

const PageNavigationBar = ({ pageRange }) => {
  const {
    pageNumber,
    incrementPageNumber,
    decrementPageNumber,
    goToPageNumber,
  } = useCustomersOrdersPageNumber();

  return (
    <div className="mt-16 mb-8 w-fit flex mx-auto text-sm font-semibold gap-4 items-center">
      <button className="px-3 p-2 rounded-md" onClick={decrementPageNumber}>
        <img src={left} className="w-4 h-4" />
      </button>
      {pageRange.map((number) => {
        if (number != pageNumber)
          return (
            <button
              className="px-3 p-2 rounded-md"
              onClick={() => {
                goToPageNumber(number);
              }}
            >
              {number}
            </button>
          );
        return (
          <button className="px-3 p-2 rounded-md border border-sky-500 bg-sky-100">
            {number}
          </button>
        );
      })}
      <button className="px-3 p-2 rounded-md" onClick={incrementPageNumber}>
        <img src={right} className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PageNavigationBar;
