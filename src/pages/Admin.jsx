import React from "react";

export default function Admin() {
  return (
    <div className="bg-white dark:bg-[#0F172A] min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10">
        <div className="ml-12 dark:text-white flex-none h-full flex items-center justify-center">
          NERVE
        </div>
        <div className="grow h-full flex items-center justify-center" />
        <div className="flex-none h-full text-center flex items-center justify-center">
          <div className="flex space-x-3 items-center px-3">
            <div className="flex-none flex justify-center">
              <div className="w-8 h-8 flex">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
                  alt="profile"
                  className="shadow rounded-full object-cover"
                />
              </div>
            </div>
            <div className="hidden md:block text-sm md:text-md text-black dark:text-white">
              John Doe
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="w-60 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B] mt-16">
        <div className="max hidden text-white mt-4 flex-col space-y-2 w-full">
          <SidebarItem icon="home" label="Home" />
          <SidebarItem icon="list" label="Table" />
          <SidebarItem icon="chart-pie" label="Graph" />
        </div>
      </aside>
    </div>
  );
}

function SidebarItem({ icon, label }) {
  const icons = {
    home: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0
          .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125
          1.125-1.125h2.25c.621 0 1.125.504
          1.125 1.125V21h4.125c.621 0 1.125-.504
          1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    list: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        />
      </svg>
    ),
    'chart-pie': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
        />
      </svg>
    )
  };

  return (
    <div className="hover:ml-4 w-full hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full flex flex-row items-center space-x-3">
      {icons[icon]}
      <span>{label}</span>
    </div>
  );
}
