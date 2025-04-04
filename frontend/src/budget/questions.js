const questions = [
   {
      id: 1,
      question: "I want a budget focused on needs",
      options: ["very much so", "a little bit", "not sure", "not really", "no"],
      type: "needs",
      weight: 5
   },
   {
      id: 2,
      question: "I have a lot of unavoidable expenses",
      options: ["very much so", "a little bit", "not sure", "not really", "no"],
      type: "needs",
      weight: 10
   },
   {
      id: 3,
      question: "I don't mind spending on stuff I enjoy",
      options: ["very much so", "a little bit", "not sure", "not really", "no"],
      type: "wants",
      weight: 5
   },
   {
      id: 4,
      question: "I have expensive hobbies",
      options: ["very much so", "a little bit", "not sure", "not really", "no"],
      type: "wants",
      weight: 10
   },
   {
      id: 5,
      question: "I want a budget focused on saving",
      options: ["very much so", "a little bit", "not sure", "not really", "no"],
      type: "savings",
      weight: 5
   },
   {
      id: 6,
      question: "I typically have a lot of excess money",
      options: ["very much so", "a little bit", "not sure", "not really", "no"],
      type: "savings",
      weight: 10
   }
];

export default questions;