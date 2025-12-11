const Fav = ({ meal, onToggle, isfav }) => {
  return (
    <button
      onClick={() => onToggle(meal)}
      className={`absolute p-1 rounded-full ${
        isfav ? "bg-red-600 text-white" : "bg-white/80 text-gray-700"
      } mt-2 py-1 px-2 mx-2.5`}
    >
      {isfav ? "❤︎" : "♡"}
    </button>
  );
};

export default Fav;
