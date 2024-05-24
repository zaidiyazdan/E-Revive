import { Link } from 'react-router-dom'

const Footer = () => {
  return (
  <footer className="bg-gray-900 rounded-lg text-white shadow border-2 border-gray-200  light:bg-gray-900">
  <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <Link
        href="#"
        className="flex items-center mb-4 sm:mb-0"
      >
        <img
          src="https://www.gadgetronicx.com/e-waste/lhs-recycle-icon2/"
          className="h-8 mr-3"
          alt="Logo"
        />
        <span className="self-center text-2xl hover:text-green-600 font-semibold whitespace-nowrap light:text-white">
          E-revive
        </span>
      </Link>
      <ul className="flex flex-wrap items-center mb-6 text-m font-large text-black-500 sm:mb-0 light:text-gray-400">
        <li>
          <Link to="/about" className="mr-4 hover:underline hover:text-green-600 md:mr-6 ">
            About
          </Link>
        </li>
        <li>
          <Link to="" className="mr-4 hover:underline hover:text-green-600   md:mr-6">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="#" className="mr-4 hover:underline hover:text-green-600  md:mr-6 ">
            Licensing
          </Link>
        </li>
        <li>
          <Link to="/contat" className="hover:underline hover:text-green-600">
            Contact
          </Link>
        </li>
      </ul>
    </div>
    <hr className="my-8 border-gray sm:mx-auto light:border-gray-700 lg:my-8" />
    <span className="block text-m text-black-500 sm:text-center light:text-gray-400">
      © 2023{" "}
      <Link to="" className="hover:border-b-2 border-green-600">
        E-revive™
      </Link>
      . All Rights Reserved. 
    </span>
  </div>
</footer>
  )
}

export default Footer;