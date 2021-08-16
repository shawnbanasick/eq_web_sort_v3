import React, { useState } from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";
// import getGlobalState from "../../globalState/getGlobalState";
// import setGlobalState from "../../globalState/setGlobalState";

const getOptionsArray = (options) => {
  let array = options.split(";");
  array = array.filter(function (e) {
    return e;
  });
  array = array.map((x) => x.replace(/\s/g, ""));
  return array;
};

let localStore = store({
  hasBeenAnswered: false,
});

// template
const RadioInput = ({ label, value, checked, setter }) => {
  return (
    <label>
      <InputStyleDiv>
        <input
          type="radio"
          checked={checked === value}
          onChange={() => setter(value)}
        />
        <LabelDiv>{label}</LabelDiv>
      </InputStyleDiv>
    </label>
  );
};

const SurveyRadioElement = (props) => {
  const optsArray = getOptionsArray(props.opts.options);
  const nameValue = `question${props.opts.qNum}`;

  // const [hasBeenAnswered, setHasBeenAnswered] = useState(false);
  // required question answer check
  // console.log(hasBeenAnswered);
  const checkRequiredQuestionsComplete = true;
  let bgColor;
  let border;

  const [selected, setSelected] = useState();

  const setLocalStore = () => {
    localStore.hasBeenAnswered = true;
  };

  const handleChange = (e) => {
    console.log(e);

    setLocalStore();
    // setHasBeenAnswered(true);
  };

  console.log(
    `qNum${props.opts.qNum}-${props.opts.type}`,
    selected

    // optsArray.indexOf(e.target.value) + 1
  );

  // required question answered?
  if (
    checkRequiredQuestionsComplete === true &&
    localStore.hasBeenAnswered === false
  ) {
    bgColor = "lightpink";
    border = "2px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => (
      <div key={uuid()}>
        <RadioInput
          // id={`${item}-${index}`}
          // type="radio"
          value={item}
          checked={selected}
          // name={nameValue}
          label={item}
          setter={setSelected}
        />
      </div>
    ));
    return <div>{radioList}</div>;
  };

  return (
    <Container bgColor={bgColor} border={border}>
      <TitleBar>{props.opts.label}</TitleBar>
      <RadioContainer onChange={(e) => handleChange(e)}>
        <RadioItems />
      </RadioContainer>
    </Container>
  );
};

export default view(SurveyRadioElement);

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1100px;
  min-height: 200px;
  background-color: ${(props) => props.bgColor};
  border: ${(props) => props.border};
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-size: 18px;
  text-align: center;
  background-color: lightgray;
  width: 100%;
  border-radius: 3px;
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  padding: 20px;
  vertical-align: center;
  margin-top: 5px;
  min-height: 100px;
  font-size: 16px;
  background-color: white;
  width: 100%;
  border-radius: 3px;
  border: 2px solid lightgray;

  input {
    margin-top: 8px;
  }

  label {
    margin-left: 8px;
  }
`;

const LabelDiv = styled.div`
  padding-left: 5px;
`;

const InputStyleDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;
