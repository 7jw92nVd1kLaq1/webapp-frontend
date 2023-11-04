import ListingGridEntry from "./ListingGridEntry";

const ListingGrid = ({ entries }) => {
  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {entries.map((item) => {
        if (item.payment) return <ListingGridEntry entry={item} />;
      })}
    </div>
  );
};

export default ListingGrid;
