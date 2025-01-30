import { useCallback, useState, useRef } from "react";

const useToggle = () => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef();

  const onClickToggle = useCallback(() => {
    setShowInput(!showInput);
    if (!showInput) {
      inputRef.current.focus();
    }
  }, [showInput]);

  return [showInput, onClickToggle, inputRef];
};

export default useToggle;
