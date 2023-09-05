export default function OrderGeneralInfo({
  orderId,
  created_date,
  personal_req,
}) {
  const date = new Date(Date.parse(created_date));

  return (
    <div className="my-5 flex flex-col gap-4">
      <div className="flex items-center text-sm justify-between">
        <p className="w-1/3 text-slate-400">Order ID</p>
        <p className="w-2/3 flex justify-end">{orderId}</p>
      </div>
      <div className="flex items-center text-sm justify-between">
        <p className="w-1/3 text-slate-400">Created Date</p>
        <p className="w-2/3 flex justify-end">{`${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`}</p>
      </div>
      {personal_req && (
        <div className="flex items-center text-sm justify-between">
          <p className="w-1/3 text-slate-400">Personal Request</p>
          <p className="w-2/3 flex justify-end">{personal_req}</p>
        </div>
      )}
    </div>
  );
}
