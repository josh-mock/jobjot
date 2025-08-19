export const interviewDefaultValues = {
  interviewDate: new Date(),
  location: "",
  dressCode: "",
  interviewTasks: [
    {
      taskName: "Prepare presentation",
      taskStatus: "Not Started",
      documentUrl: null,
    },
  ],
  interviewers: [
    {
      interviewerName: "",
      interviewerPosition: "",
      linkedInUrl: null,
    },
  ],
  questionsToAsk: "",
  potentialQuestions: "",
  interviewComplete: false,
  whatWentWell: "",
  couldDoBetter: "",
  notes: "",
};
