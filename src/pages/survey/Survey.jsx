import React, { useEffect } from "react";
import setGlobalState from "../../globalState/setGlobalState";
import getGlobalState from "../../globalState/getGlobalState";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import SurveyTextElement from "./SurveyTextElement";
import SurveyTextAreaElement from "./SurveyTextAreaElement";
import SurveyRadioElement from "./SurveyRadioElement";
import SurveyDropdownElement from "./SurveyDropdownElement";
import SurveyCheckboxElement from "./SurveyCheckboxElement";
import SurveyRating2Element from "./SurveyRating2Element";
import SurveyRating5Element from "./SurveyRating5Element";
import SurveyRating10Element from "./SurveyRating10Element";
import SurveyTextRestrictedElement from "./SurveyTextRestrictedElement";
import SurveyInformationElement from "./SurveyInformationElement";
import { v4 as uuid } from "uuid";

const SurveyPage = () => {
  let surveyQuestionObjects;
  useEffect(() => {
    setTimeout(function () {
      setGlobalState("currentPage", "survey");
    }, 100);
  }, []);

  surveyQuestionObjects = JSON.parse(
    localStorage.getItem("surveyQuestionObjArray")
  );

  console.log(JSON.stringify(surveyQuestionObjects, null, 2));

  // const surveyQuestionObjects = [
  //   {
  //     qNum: 1,
  //     type: "information",
  //     label: "Questions with an * are required",
  //     backgroundColor: "orange",
  //   },
  //   {
  //     qNum: 2,
  //     type: "text",
  //     required: true,
  //     label: "Age*",
  //     note: "Please enter your year of birth",
  //     limitLength: false,
  //     maxLen: 4,
  //     numsOnly: false,
  //   },
  //   {
  //     qNum: 3,
  //     type: "textRestricted",
  //     required: true,
  //     label: "Restricted Age*",
  //     note: "Please enter your year of birth",
  //     limitLength: true,
  //     maxLen: 4,
  //     numsOnly: true,
  //   },
  //   {
  //     qNum: 4,
  //     type: "textArea",
  //     required: true,
  //     label: "Comments",
  //   },
  //   {
  //     qNum: 5,
  //     type: "radio",
  //     required: true,
  //     label: "Year*",
  //     note: "Please select your year",
  //     options: "Freshman; Sophomore; Junior; Senior;",
  //   },
  //   {
  //     qNum: 6,
  //     type: "select",
  //     required: true,
  //     label: "What is your program focus?",
  //     options: "Global Studies; Linguistics; English Literature",
  //   },
  //   {
  //     qNum: 7,
  //     type: "checkbox",
  //     required: true,
  //     label: "What type of class do you prefer?",
  //     options: "Lecture; Group Discussion; Active Learning",
  //   },
  //   {
  //     qNum: 8,
  //     type: "rating2",
  //     required: true,
  //     label: "Please answer the following questions",
  //     scale: "Yes; No",
  //     options:
  //       "I have used an iPad in class before.; I have used a notebook computer in class before.",
  //   },
  //   {
  //     qNum: 9,
  //     type: "rating5",
  //     required: true,
  //     label: "Please answer the following questions.",
  //     options:
  //       "How would you rate the use of iPads in this class?; How would you rate this class overall",
  //   },
  //   {
  //     qNum: 10,
  //     type: "rating10",
  //     required: true,
  //     label: "Please answer the following questions.",
  //     options:
  //       "How would you rate the use of the Socrative website in this class?; How would you rate the use of the Quizlet website in this class?",
  //   },
  // ];

  const SurveyQuestions = () => {
    const QuestionList = surveyQuestionObjects.map((object, index) => {
      if (object.type === "text") {
        return <SurveyTextElement key={uuid()} opts={object} />;
      }
      if (object.type === "textRestricted") {
        return <SurveyTextRestrictedElement key={uuid()} opts={object} />;
      }
      if (object.type === "textArea") {
        return <SurveyTextAreaElement key={uuid()} opts={object} />;
      }
      if (object.type === "radio") {
        return <SurveyRadioElement key={uuid()} opts={object} />;
      }
      if (object.type === "select") {
        return <SurveyDropdownElement key={uuid()} opts={object} />;
      }
      if (object.type === "checkbox") {
        return <SurveyCheckboxElement key={uuid()} opts={object} />;
      }
      if (object.type === "rating2") {
        return <SurveyRating2Element key={uuid()} opts={object} />;
      }
      if (object.type === "rating5") {
        return <SurveyRating5Element key={uuid()} opts={object} />;
      }
      if (object.type === "rating10") {
        return <SurveyRating10Element key={uuid()} opts={object} />;
      }
      if (object.type === "information") {
        return <SurveyInformationElement key={uuid()} opts={object} />;
      }
      return null;
    });
    return QuestionList;
  };

  return (
    <Container>
      <h1>Post-Sort Survey</h1>
      <SurveyQuestions />
    </Container>
  );
};

export default view(SurveyPage);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 150px;
`;
