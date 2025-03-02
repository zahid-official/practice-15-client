import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="min-h-[69.8vh] flex items-center justify-center bg-[#94a3b822]">
      <div className="text-center ">
        <h2 className="text-4xl font-bold">Welcome to Clearify </h2>
        <p className="pt-3 pb-7">
          Your Task Management Solution – Organize, track and manage tasks
          effortlessly with Clearify. <br /> Boost efficiency, collaboration,
          and productivity. Get started today!
        </p>
        <Link to={'/home'}>
          <button className="btn text-xl font-bold bg-[#005f73] hover:bg-[#103c44] text-white border-none px-6 ">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Intro;
