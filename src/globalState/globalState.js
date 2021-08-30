import { store } from "@risingstack/react-easy-state";

const globalState = store({
  cardFontSize: 15,
  cardHeight: 0,
  checkRequiredQuestionsComplete: false,
  currentPage: "landing",
  dataLoaded: false,
  defaultCardFontSize: 15,
  displayAccessCodeWarning: false,
  displayContinueButton: false,
  displayLandingContent: false,
  displayNextButton: false,
  displayPartIdWarning: false,
  overloadedColumn: "",
  partId: "anonymous",
  presortPosCards: [],
  presortNeuCards: [],
  presortNegCards: [],
  presortCards: [],
  presortSortedStatements: 0,
  progressScore: 10,
  progressScoreAdditional: 0,
  progressScoreAdditionalSort: 0,
  rating2State: {},
  requiredAnswersObj: {},
  results: {},
  resultsPostsort: {},
  resultsSurvey: {},
  sortFinishedModalHasBeenShown: false,
  sortGridResults: {},
  statementCommentsObj: {},
  triggerLandingModal: false,
  triggerPresortModal: false,
  triggerSortModal: false,
  triggerPostsortModal: false,
  triggerSortingFinishedModal: false,
  triggerTransmissionOKModal: false,
  triggerTransmissionFailModal: false,
  userInputPartId: "",
  userInputAccessCode: "",
});

export default globalState;
