import { LogInNav } from "./LogInNav";
import tms from "../Images/tms.avif";
import supimg from "../Images/signupimg.png";
import teamcomm from "../Images/teamcomm.jpg";

export function Home() {
  return (
    <>
      <div className="scroll-smooth">
        <LogInNav />

        <div className="grid grid-cols-2 gap-6 bg-homeBg scroll-smooth">
          <div className="">
            <h1 className="text-3xl ml-2 mt-20 text-center font-bold ">
              <span className="text-cyan-500"> Welcome </span>to our Task{" "}
              <span className="text-orange-300"> Management</span> System
            </h1>
            <p className="text-center m-20 text-xl  justify-items-center">
              <span>Start managing your tasks from anywhere </span>
              <span>
                {" "}
                And create your teams and communicate with your team members
              </span>
            </p>
            <div className="flex justify-center mt-30">
              {/* About button */}
              <a
                href="#About"
                type="button"
                class="select-none m-2 rounded-lg bg-gray-900 hover:text-orange-300 hover:bg-cyan-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                About
              </a>
              {/* Sign up button */}
              <a
                href="/signUp"
                type="button"
                className="select-none m-2 hover:text-cyan-500 hover:bg-orange-300 rounded-lg border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Get started
              </a>
            </div>
          </div>

          <div className="m-5 ">
            <img className="item-right rounded-full " src={tms} alt="" />
          </div>
        </div>

        <div id="About" className="justify-between scroll-smooth">
          <div className=" h-full transition delay-150 duration-300 ease-in-out  m-2 rounded-md ring-1 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-250 dark:bg-slate-100 dark:highlight-white/5 dark:hover:bg-slate-200">
            <h1 className="text-center text-3xl font-bold text-sky-400">
              About
            </h1>
            <div className="grid grid-cols-2">
              <img src={supimg} alt="" />
              <p className="text-center text-2xl m-10 mt-20">
                To effectively manage your tasks, sign up now and begin creating
                them with proper organization and management techniques.{" "}
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-center text-xl m-10 mt-20">
                Establish your own chat-based team to enhance communication and
                effectively track task statuses, fostering efficient
                collaboration and productivity.
              </p>
              <img className="rounded-full w-9/12" src={teamcomm} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
