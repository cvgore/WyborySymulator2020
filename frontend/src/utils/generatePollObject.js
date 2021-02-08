import axios from "@/axios";

export default async function generatePollObject(allPolls) {
  let obj = [];
  console.log(allPolls)
  for (const poll of allPolls) {
    const questions = await axios.get(`/poll/${poll.id}/question`);
    for (const question of questions) {
      const options = await axios.get(`poll/${poll.id}/question/${question.id}/option`);
      obj.push({
        ...poll,
        questions: {
          ...question,
          options
        }
      })
    }
  }
  return obj;
}
