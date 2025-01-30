import {
  AddButton,
  InputContainer,
  FormContainer,
  StyledInput,
  SubmitButton,
} from "./styles";

import useToggle from "@hooks/useToggle";
import useAddNewType from "@pages/Page_ExamTypeList/hooks/useAddNewType";

const AddExamButton = () => {
  const [showInput, onClickToggle, inputRef] = useToggle();
  const [newTypeName, onChangeNewTypeName, onSubmitNewType] = useAddNewType();

  return (
    <>
      <AddButton onClick={onClickToggle}>
        {showInput ? "Close" : "Add New Type"}
      </AddButton>
      <InputContainer>
        <form onSubmit={onSubmitNewType}>
          <FormContainer>
            <InputContainer>
              <StyledInput
                value={newTypeName}
                onChange={onChangeNewTypeName}
                type="text"
                placeholder="Type"
                show={showInput}
                ref={inputRef}
              />
              <SubmitButton type="submit" show={showInput}>
                Submit
              </SubmitButton>
            </InputContainer>
          </FormContainer>
        </form>
      </InputContainer>
    </>
  );
};

export default AddExamButton;
