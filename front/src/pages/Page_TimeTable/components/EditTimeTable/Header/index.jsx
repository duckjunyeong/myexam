import React from "react";
import { Link, useParams } from "react-router";
import { Header, Title, Buttons, Button, StyledLink } from "./styles";
const EditTimeTableHeader = () => {
  const { date } = useParams();

  return (
    <Header>
      <Title>Time Table</Title>
      <Buttons>
        <Button>
          <StyledLink to={`/main/calendar/stopWatch/${date}`}>
            {" "}
            Stop Watch{" "}
          </StyledLink>
        </Button>
        <Button>
          <i className="fas fa-envelope"></i>
        </Button>
        <Button>
          <i className="fas fa-search"></i>
        </Button>
        <Button>
          <i className="fas fa-cog"></i>
        </Button>
      </Buttons>
    </Header>
  );
};

export default EditTimeTableHeader;
