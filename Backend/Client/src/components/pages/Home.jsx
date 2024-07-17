import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthToken";

function Home() {
  const { isSignIn, SignoutUser} = useAuth();

  return (
    <>
     <nav className="fixed top-0 left-0 w-full p-4 flex justify-end">
      {isSignIn ? (
        <button
          className="text-xl font-bold rounded-full p-3 bg-white cursor-pointer hover:bg-gray-800"
          onClick={SignoutUser}
        >
          <Link to="/signout">Sign Out</Link>
        </button>
      ) : (
        <button className="text-xl font-bold rounded-full p-3 bg-white cursor-pointer hover:bg-gray-800">
          <Link to="/signin">Sign In</Link>
        </button>
      )}
    </nav>
    <div className="flex items-center justify-center flex-col mx-4 md:mx-24 mt-20">
      <h1 className="text-4xl md:text-6xl text-white text-center mb-8 font-semibold">
        Welcome to the Todo Web
      </h1>
      <p className="text-lg md:text-xl text-white text-center mb-8 px-4 md:px-0">
        This is a simple web application that allows you to create, edit, and delete tasks.
        You can also search for specific tasks by name or description. The Todo Web uses
        the React framework and was built using Tailwind CSS as its CSS framework.
      </p>
      <div className="flex flex-col md:flex-row items-center">
        {isSignIn ? (
          <button className="text-lg md:text-xl font-bold rounded-2xl mt-7 p-3 bg-gray-100 text-gray-900 cursor-pointer md:mr-4">
            <Link to="/todo">Get Todo</Link>
          </button>
        ) : (
          <button className="text-lg md:text-xl font-bold rounded-2xl mt-7 p-3 bg-gray-100 text-gray-900 cursor-pointer md:mr-4">
            <Link to="/signup">Create Todo</Link>
          </button>
        )}
      </div>
    </div>
    </>
  );
}

export default Home;
