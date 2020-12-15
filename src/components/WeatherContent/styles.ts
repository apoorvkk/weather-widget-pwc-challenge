import styled from "styled-components";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

const StagingContainer = styled(Col)`
  text-align: center;
  padding-top: 80px;
  padding-bottom: 80px;
`;

const StyledSpinner = styled(Spinner)`
  width: 80px;
  height: 80px;
`;

const LocationRow = styled(Row)`
  margin-bottom: 20px;
`;

const SwitchContainer = styled(Col)`
  flex-grow: 0;
  padding-top: 10px;
`;

export {
  StagingContainer,
  StyledSpinner as Spinner,
  LocationRow,
  SwitchContainer,
};
