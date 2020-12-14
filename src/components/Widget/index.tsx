import React from "react";
import styled from "styled-components";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StyledContainer = styled(Container)`
  border: 1px solid black;
`;

const StyledRow = styled(Row)`
  border: 1px solid red;
`;

const StyledCol = styled(Col)`
  border: 1px solid blue;
`;

const Widget = (): React.ReactElement => (
  <>
    <StyledContainer>
      <StyledRow>
        <StyledCol>
          <h1>Sydney</h1>
        </StyledCol>
      </StyledRow>
    </StyledContainer>
  </>
);

export default Widget;
