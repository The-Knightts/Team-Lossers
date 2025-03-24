import { IoShareOutline } from "react-icons/io5";

function ShareButton() {
  return (
    <button className="flex items-center gap-2 px-3 py-2 text-white rounded-lg hover:bg-gray-800 transition">
      <IoShareOutline className="text-white text-lg" />
      <span className="font-light">Share</span>
    </button>
  );
}

export default ShareButton;
