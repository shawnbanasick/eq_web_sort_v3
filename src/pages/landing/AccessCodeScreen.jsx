import React from "react";
import styled from "styled-components";
import LogInSubmitButton from "./LogInSubmitButton";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getDisplayAccessCodeWarning = (state) => state.displayAccessCodeWarning;
const getUserInputAccessCode = (state) => state.userInputAccessCode;
const getSetDisplayLandingContent = (state) => state.setDisplayLandingContent;
const getSetDisplayNextButton = (state) => state.setDisplayNextButton;
const getSetIsLoggedIn = (state) => state.setIsLoggedIn;
const getSetUserInputAccessCode = (state) => state.setUserInputAccessCode;
const getSetDisplayAccessCodeWarning = (state) =>
  state.setDisplayAccessCodeWarning;

const LogInScreen = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  const displayAccessCodeWarning = useStore(getDisplayAccessCodeWarning);
  const userInputAccessCode = useStore(getUserInputAccessCode);
  const setDisplayLandingContent = useStore(getSetDisplayLandingContent);
  const setDisplayNextButton = useStore(getSetDisplayNextButton);
  const setIsLoggedIn = useStore(getSetIsLoggedIn);
  const setUserInputAccessCode = useStore(getSetUserInputAccessCode);
  const setDisplayAccessCodeWarning = useStore(getSetDisplayAccessCodeWarning);

  const handleAccess = (e) => {
    setUserInputAccessCode(e.target.value);
  };

  const handleSubmit = (e) => {
    let userAccessOK = false;
    const projectAccessCode = configObj.accessCode;

    // get user input

    if (userInputAccessCode === projectAccessCode) {
      userAccessOK = true;
      setDisplayLandingContent(true);
      setDisplayNextButton(true);
      setIsLoggedIn(true);
    }

    // invalid input ==> display warnings
    if (userAccessOK === false) {
      setDisplayAccessCodeWarning(true);
      setTimeout(() => {
        setDisplayAccessCodeWarning(false);
      }, 5000);
    }
  };

  return (
    <Container>
      <div>
        <h2>{langObj.loginHeaderText}</h2>
        <StyledHr />
      </div>
      <div>
        <h3>{langObj.accessInputText}</h3>
        <StyledInputDiv>
          <StyledInput onChange={handleAccess} type="text" />
          {displayAccessCodeWarning && (
            <WarningText>{langObj.accessCodeWarning}</WarningText>
          )}
        </StyledInputDiv>
      </div>

      <LogInSubmitButton onClick={handleSubmit} />
    </Container>
  );
};

export default LogInScreen;

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  margin-top: 50px;
  width: 50vw;
  padding: 1.5vw;
  min-height: 300px;
  margin-bottom: 200px;
  border: 2px solid black;
  justify-self: center;
  background-color: whitesmoke;
`;

const StyledHr = styled.hr`
  margin-top: 5px;
  margin-bottom: 30px;
`;

const StyledInput = styled.input`
  margin-top: 5px;
  width: 400px;
  height: 30px;
  font-size: 1.4em;
  padding-left: 5px;
`;

const StyledInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const WarningText = styled.div`
  color: red;
  font-weight: bold;
  font-size: 1.4em;
  margin-left: 10px;
`;
