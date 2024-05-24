import { Link } from "react-router-dom"
import banner from "../Assets/hero/banner.webp"
import feature from "../Assets/dotteds.png"

export const Hero = () => {
  return (
    <section className=" text-gray-800 h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] ">
	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="text-5xl f
			ont-bold leadi sm:text-6xl">E-Revive</h1>
			<h2 className="text-4xl"><span className="text-green-600">Breathing</span>  New Life into Tomorrow</h2>
			<p className="mt-6 mb-8 text-lg sm:mb-12"> Join us in our mission to reduce environmental
				<br/> impact and drive positive change
			</p>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<Link rel="noopener noreferrer" to='/User/login' className="px-8 py-3 text-lg font-semibold rounded bg-green-600 text-gray-50">Recycle</Link>
				<Link rel="noopener noreferrer" to='/education' className="px-8 py-3 text-lg font-semibold border rounded border-gray-800">Know About E-waste</Link>
			</div>
		</div>
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src={banner} alt="banner" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
		</div>
	</div>
	<div className="relative w-screen">
	<img src={feature} alt="kuch to hai" className="left-[100px] top-[-50px] -z-50 absolute"/>
	<img src={feature} alt='ye kya hai' className="right-[50px] top-[-30px] rotate-90 -z-50 absolute"/>
	</div>
</section>
  )
}
