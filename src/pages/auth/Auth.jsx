import video from "@/assets/videos/hero-section-video.mp4";

function Auth({ children }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-slack dark:bg-transparent h-screen  gap-2">
      <div className="md:w-1/2 w-full h-min p-4 flex justify-center items-center">{children}</div>
      <div className="md:w-1/2 hidden md:block h-screen py-4">
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          className="rounded-l-xl object-cover shadow-md h-full"
          src={video}
        ></video>
      </div>
    </div>
  );
}

export default Auth;
