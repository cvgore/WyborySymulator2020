import axios from "@/axios";

export default async function generatePollObject(allPolls) {
  let obj = [];
  for (const poll of allPolls) {
    const questions = await axios.get(`/poll/${poll.id}/question`);
    obj.push({
      ...poll,
      questions: []
    })
    for (const question of questions.data) {
      const { data } = await axios.get(`poll/${poll.id}/question/${question.id}/option`);
      for (let i=0;i < obj.length;i++){
        obj[i].questions.push({
          ...question,
          options: []
        });
        for (let j=0;j < obj[i].questions.length;j++){
          obj[i].questions[j].options.push(...data)
        }
      }
    }
  }
  return obj;
}
