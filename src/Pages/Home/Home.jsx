import Progress from "./Progress";
import ToDo from "./ToDo";

const Home = () => {
  return (
    <>
      <div className=" min-h-[85vh]">
        <div className="grid grid-cols-3 max-w-screen-xl mx-auto gap-10 pt-10 pb-28 px-6">
          {/* ToDo */}
          <ToDo></ToDo>

          {/* inProgress */}
          <Progress></Progress>

          {/* taskComplated */}
          <div className="bg-base-200 px-6 py-6 rounded-lg">b</div>
        </div>
      </div>
    </>
  );
};

export default Home;
