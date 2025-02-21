import Completed from "./Completed";
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

          {/* taskCompleted */}
          <Completed></Completed>
        </div>
      </div>
    </>
  );
};

export default Home;
