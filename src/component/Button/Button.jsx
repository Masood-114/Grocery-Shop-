function Button(props) {

  return (
    <button onClick={props.onClick}
      className="bg-gradient-to-b from-orange-400 to-orange-500
     text-white px-8 py-3 rounded-lg md:text-xl text-md 
     hover:scale-105 hover:to-orange-600 transition-all duration-300 cursor-pointer"
    >
      {props.content}
    </button>
  );
}

export default Button;
