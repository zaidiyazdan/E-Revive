import img1 from "../Assets/waste.jpg";
import img2 from "../Assets/cppy.png";
import img3 from "../Assets/popup-imagejpg.jpg";
import Navbar from "../Components/Navbar";
import Video from "../Components/Video";
import Wrapper from "../Components/Wrapper";


const Education = () => {
  return (
    <Wrapper>
      <Navbar />
      <h1 className="  text-center text-5xl font-bold pt-8 font-mono z-10">
        Education
      </h1>
      <hr className="bg-green-600 h-2 w-[18%] mx-auto relative -z-10 top-[-12px]" />
      <section>
        <div className="container max-w-[1080px] shadow-md  border-2 border-gray-100 rounded-lg bg-white mt-8 flex flex-col justify-center p-4 mx-auto sm:py-4 lg:py-8 lg:flex-row lg:justify-between">
          <div className="flex items-center justify-center  p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src={img1}
              alt="banner"
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h2 className="text-4xl font-bold leadi sm:text-4xl">
              What is E-waste?
            </h2>
            <hr className="bg-green-400 h-2 w-[30%] mt-2" />
            <p className="mt-6 mb-8 text-lg sm:mb-12 text-justify">
              E-waste, or electronic waste, refers to discarded electronic
              devices or equipment that have reached the end of their useful
              life or are no longer wanted. This can include a wide range of
              items such as computers, laptops, smartphones, tablets,
              televisions, refrigerators, washing machines, printers, cameras,
              and more.
            </p>
          </div>
        </div>
        {/* <hr className='bg-stone-400  h-[2px] w-[80%] mx-auto mt-2'/> */}
        <Video />

        <div className="container max-w-[1000px]  rounded-lg flex flex-col justify-center p-4 mx-auto sm:py-4 lg:py-16 lg:flex-row lg:justify-between">
          <div className="flex flex-col bg-green-600 text-white justify-center p-8 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h2 className="text-4xl font-bold leadi sm:text-4xl">
              Benifits of recycling
            </h2>
            <hr className="bg-white h-2 w-[40%] mt-2" />
            <p className="mt-6 mb-8 text-lg sm:mb-12 text-justify">
              If Managed safely by Recycling, E-waste can be a secondary source
              of raw material,other benifits are:
            </p>
            <ul className="list-disc text-justify">
              <li>
                <span className="font-semibold">Economic Benefits </span>-
                Revengue generation from recoverd materials
              </li>
              <li>
                <span className="font-semibold">Enviromental Benefits </span>-
                Natural resource conservation & Reduction in Environmantal
                pollution
              </li>
              <li>
                <span className="font-semibold">Social Benifits </span>-
                Employment Generation
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center  p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src={img2}
              alt="recycling"
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
        </div>

        <div className="container max-w-[1080px] bg-white flex flex-col justify-center p-4 mx-auto sm:py-4 lg:py-8 lg:flex-row lg:justify-between">
          <div className="flex items-center justify-center  p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src={img3}
              alt="banner"
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
          <div className="flex flex-col justify-center text-lg p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h2 className="text-4xl font-bold leadi sm:text-4xl">
              Reasons to recycle
            </h2>
            <hr className="bg-green-400 h-2 w-[30%] mt-2" />
            <p className="mt-6 mb-8 sm:mb-12 text-justify">
              If Managed safely by Recycling, E-waste can be a secondary source
              of raw material,other benifits are:
            </p>
            <ul className="list-disc text-justify">
              <li className="p-2">
                <span className="font-semibold">Resource Conservation </span>-
                Recycling e-waste allows for the recovery and reuse of these
                valuable materials, reducing the need for new raw material
                extraction and conserving natural resources.
              </li>
              <li className="p-2">
                <span className="font-semibold">
                  Mitigation of Health Risks{" "}
                </span>
                - Improper disposal of e-waste can lead to exposure to hazardous
                materials for both individuals and communities
              </li>
              <li className="p-2">
                <span className="font-semibold">Energy Savings </span>- Using
                recycled materials in manufacturing processes reduces the
                overall energy requirements, contributing to energy efficiency.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Education;
