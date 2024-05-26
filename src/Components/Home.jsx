import { LogInNav } from "./LogInNav";
import tms from "../Images/tms.avif";

export function Home() {
  return (
    <>
      <div className="scroll-smooth">
        <LogInNav />

        <div className="grid grid-cols-2 gap-6 bg-homeBg scroll-smooth">
          <div className="">
            <h1 className="text-3xl ml-2 mt-20 transition delay-300 duration-600 ease-in-out text-center font-bold transition-all transform">
              Welcome to our Task Management System
            </h1>
            <div className="flex justify-center mt-40">
              {/* About button */}
              <a
                href="#About"
                type="button"
                class="select-none m-2 rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                About
              </a>
              {/* Sign up button */}
              <a
                href="/signUp"
                type="button"
                className="select-none m-2 rounded-lg border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
            <p className="text-center text-2xl mt-20">
              Just sign up to start managing your tasks
            </p>
            <p className="text-left text-xl pt-40">
              Create you tasks folder and build your team to communicate with
              them
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
