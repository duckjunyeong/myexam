import styled from "@emotion/styled";

// 1. 내가 고른 문제집이에요.
export const SideLeft = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
  height: 100%;
`;

export const ProblemImage = styled.img`
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

// 4. 원하는 문제에 빨리 접근할 수도 있죠!
export const SideRight = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #f0f0f8;
  border-left: 1px solid #dee2e6;
  overflow-y: auto;
  height: 100%;
`;

export const ProblemSideItemContent = styled.div`
  font-size: 14px;
  color: #495057;
`;

// 5. 문제에 댓글을 남길수도 있죠!
export const CommentSection = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  resize: vertical;
`;

export const CommentButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  height: 100vh; // 높이는 100vh로 유지
`;

export const Header = styled.header`
  background-color: #fff;
  padding: 10px 20px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const ChoiceButton = styled.button`
  background-color: ${(props) => (props.isSelected ? "skyblue" : "white")};
  border: 1px solid black;
  width: 15px; /* 가로 길이 설정 */
  height: 15px; /* 세로 길이 설정 (가로 길이와 동일하게) */
  padding: 0; /* 내부 여백 제거 (텍스트 중앙 정렬을 위해) */
  cursor: pointer;
  border-radius: 50%; /* 완벽한 원형 */
  display: flex; /* 텍스트 중앙 정렬을 위한 flexbox */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  font-size: 14px; /* 글자 크기 조정 
  margin-right: 100px;


  &:hover {
    background-color: lightgray;
  }
`;

export const ChoiceText = styled.label`
  font-size: 16px;
  color: #212529;
  cursor: pointer;
  margin-left: 17px;
`;

export const ChoiceWrapper = styled.div`
  display: flex;
  align-items: center; // 버튼과 텍스트를 세로 중앙 정렬
  margin-bottom: 12px;
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #0069d9;
  }
`;

// ProblemContent 스타일 수정 - 선택지 간 간격 조정
export const ProblemTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #007bff;
`;
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 20px;
  padding: 20px;
`;
export const ProblemContent = styled.div`
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
