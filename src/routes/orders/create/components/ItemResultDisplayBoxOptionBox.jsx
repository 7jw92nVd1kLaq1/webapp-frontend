import "./animations.css";

const ItemResultDisplayBoxOptionBox = ({
  requestItemJSON,
  optionsKey,
  options,
  itemId,
  itemDomain,
}) => {
  const handleClick = (e) => {
    handleClickAsync(e);
  };
  const handleClickAsync = async (e) => {
    let url = e.currentTarget.id;
    if (!url) return;

    const target_url = `${itemDomain}${url}`;
    await requestItemJSON(target_url);
  };

  return (
    <div className="p-7 text-left">
      <p className="font-medium text-lg">{optionsKey}</p>
      <div className="mt-6 flex flex-wrap gap-5">
        {options.map((elem) => {
          const chosenOption =
            (elem.hasOwnProperty("selectedOption") &&
              elem.selectedOption === true) ||
            elem.url === itemId
              ? " bg-sky-200"
              : "";

          const unavailable = !elem.available ? " text-slate-300" : "";
          return (
            <button
              className={
                "block rounded-md border border-slate-300 p-3" +
                chosenOption +
                unavailable
              }
              id={elem.url}
              onClick={handleClick}
            >
              <p className="font-medium">
                {elem.name.replace("Click to select ", "")}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ItemResultDisplayBoxOptionBox;
