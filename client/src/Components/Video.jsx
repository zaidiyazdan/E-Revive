import vid1 from "../Assets/video/education.mp4"

const Video = () => {
    return (
      <video controls className="w-[80%] mx-auto mt-8 h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700">
        <source src={vid1} type="video/mp4"
        />
        Sorry, your browser doesnt support videos.
      </video>
    );
  };

  export default Video