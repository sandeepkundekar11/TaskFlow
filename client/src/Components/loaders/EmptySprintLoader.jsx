const EmptySprintLoader = () => {
  return (
    <div className="h-full w-full">
      <div className="mb-1 grid h-full w-full grid-cols-3 space-x-1">
        <div className="col-span-1 h-11 animate-pulse bg-slate-300"></div>
        <div className="col-span-1 h-11 animate-pulse bg-slate-300"></div>
        <div className="col-span-1 h-11 animate-pulse bg-slate-300"></div>
      </div>
      <div className="grid h-full w-full grid-cols-1 space-y-1">
        <div className="col-span-1 grid h-12 animate-pulse items-center bg-slate-300 pl-2">
          <div className="h-9 w-9 rounded-full bg-slate-400"></div>
        </div>
        <div className="col-span-1 grid h-12 animate-pulse items-center bg-slate-300 pl-2">
          <div className="h-9 w-9 rounded-full bg-slate-400"></div>
        </div>
        <div className="col-span-1 grid h-12 animate-pulse items-center bg-slate-300 pl-2">
          <div className="h-9 w-9 rounded-full bg-slate-400"></div>
        </div>
        <div className="col-span-1 grid h-12 animate-pulse items-center bg-slate-300 pl-2">
          <div className="h-9 w-9 rounded-full bg-slate-400"></div>
        </div>
        <div className="col-span-1 grid h-12 animate-pulse items-center bg-slate-300 pl-2">
          <div className="h-9 w-9 rounded-full bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
};
export default EmptySprintLoader;
