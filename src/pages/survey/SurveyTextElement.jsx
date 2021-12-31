import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import sanitizeString from "../../utilities/sanitizeString";
import useStore from "../../globalState/useStore";

const SurveyTextElement = (props) => {
  // STATE
  const results = useStore((state) => state.resultsSurvey);
  const setResultsSurvey = useStore((state) => state.setResultsSurvey);
  const checkRequiredQuestionsComplete = useStore(
    (state) => state.checkRequiredQuestionsComplete
  );
  const requiredAnswersObj = useStore((state) => state.requiredAnswersObj);
  // const resultsSurvey = useStore((state) => state.resultsSurvey);
  const setRequiredAnswersObj = useStore(
    (state) => state.setRequiredAnswersObj
  );

  // preload "no response" in state
  useEffect(() => {
    results[`qNum${props.opts.qNum}`] = "no response";
    setResultsSurvey(results);
  }, [props, setResultsSurvey, results]);

  const id = `qNum${props.opts.qNum}`;

  const [userText, setUserText] = useState("");
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  // event handler
  const handleOnChange = (e) => {
    let value = e.target.value;
    let valueLen = value.length;

    // restrict to numbers
    if (props.opts.restricted === "true" || props.opts.restricted === true) {
      value = value.replace(/\D/g, "");
    }

    // limit length
    if (props.opts.limited === "true" || props.opts.limited === true) {
      if (value.length > +props.opts.limitLength) {
        value = value.substring(0, +props.opts.limitLength);
      }
    }
    setUserText(value);

    // record if answered or not
    if (valueLen > 0) {
      requiredAnswersObj[id] = "answered";
      let sanitizedText = sanitizeString(value);
      results[`qNum${props.opts.qNum}`] = sanitizedText;
    } else {
      results[`qNum${props.opts.qNum}`] = "no response";
      requiredAnswersObj[id] = "no response";
    }
    setRequiredAnswersObj(requiredAnswersObj);
    setResultsSurvey(results);
  };

  // required question answer check
  let userTextLen = 0;
  if (userText) {
    userTextLen = userText.length;
  }

  useEffect(() => {
    if (
      checkRequiredQuestionsComplete === true &&
      userTextLen < 1 &&
      props.opts.required === true
    ) {
      setFormatOptions({
        bgColor: "lightpink",
        border: "3px dashed black",
      });
    } else {
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [checkRequiredQuestionsComplete, userTextLen, props]);

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));
  const noteText = ReactHtmlParser(decodeHTML(props.opts.note));

  return (
    <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
      <TitleBar>
        <div>{labelText}</div>
      </TitleBar>
      <NoteText>
        <div>{noteText}</div>
      </NoteText>
      <TextInput value={userText || ""} onChange={handleOnChange} />
    </Container>
  );
};

export default view(SurveyTextElement);

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1300px;
  min-height: 200px;
  background-color: ${(props) => props.bgColor};
  border: ${(props) => props.border};
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  min-height: 50px;
  font-size: 18px;
  text-align: center;
  width: 100%;
  border-radius: 3px;
  background-color: lightgray;
`;

const NoteText = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  vertical-align: center;
  margin-top: 5px;
  height: 50px;
  font-size: 16px;
  text-align: center;
  background-color: whitesmoke;
  width: 100%;
  border-radius: 3px;
`;

const TextInput = styled.input`
  display: flex;
  justify-content: left;
  align-items: center;
  vertical-align: center;
  margin-top: 5px;
  height: 50px;
  font-size: 18px;
  background-color: white;
  width: 100%;
  border-radius: 3px;
  border: 2px solid lightgray;
  padding-left: 5px;
  padding-right: 5px;
`;
