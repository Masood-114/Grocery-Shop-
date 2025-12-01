export default function Banner({ bannerTitle, bgBanner }) {
  return (
    <div>
      <div
        className=" h-[50vh] flex justify-center items-center mt-25 bg-center bg-cover "
        style={{
          backgroundImage: `url(${bgBanner})`,
        }}
      >
        <h2 className="text-5xl text-zinc-800 bg-white rounded-xl font-bold p-5">
          {bannerTitle}
        </h2>
      </div>
    </div>
  );
}
