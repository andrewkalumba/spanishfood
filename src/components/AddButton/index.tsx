import { IoIosAddCircle } from "react-icons/io";

interface AddButtonProp {
  handleClick: () => void;
}

const AddButton = ({ handleClick }: AddButtonProp) => {
  return (
    <button onClick={handleClick}>
      <IoIosAddCircle className="w-full text-3xl text-green-500 hover:text-green-600 transition duration-200" />
    </button>
  );
};

export default AddButton;
