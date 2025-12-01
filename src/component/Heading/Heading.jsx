function Heading(props) {
  return (
    <div className="  w-fit mx-auto">
      <h2 className="md:text-5xl  text-[2.5rem] font-bold">
        <span className="text-orange-500">{props.highlight} </span>
        {props.heading}
      </h2>
      <div className=" w-34 h-1 bg-orange-400 ml-auto md:mt-5 mt-3"></div>
    </div>
  );
}

export default Heading;
