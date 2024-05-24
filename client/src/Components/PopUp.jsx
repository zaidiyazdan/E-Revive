import React from "react";
import popUpImage from "../Assets/popup-imagejpg.jpg";


export default function PopUp({ showModal, setShowModal }) {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex bg-green-600 text-white items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">E waste</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="container  mx-auto p-6">
                  <div className="flex flex-col-reverse items-center md:flex-row">
                    <div className="md:w-1/2 p-4">
                      <p className="my-4 text-black-500 text-justify text-lg leading-relaxed">
                        E-waste is electronic products that are unwanted, not
                        working, and nearing or at the end of their “useful
                        life.” Computers, televisions, VCRs, stereos, copiers,
                        and fax machines are everyday electronic products.
                      </p>
                    </div>
                    <div className="md:w-1/2 p-4">
                      <img
                        src={popUpImage}
                        alt="E-waste"
                        className="object-cover w-full h-48 md:h-72 lg:h-96 xl:h-112 2xl:h-128"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-700 text-white active:bg-emerald-500 hover:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Lets Recycle
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
