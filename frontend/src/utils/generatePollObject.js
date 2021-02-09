import axios from '@/axios';

export default async function generatePollObject(allPolls) {
  let obj = []
  for (const poll of allPolls) {
    const { data } = await axios.get(`/poll/${poll.id}/question`);
    const answersOfSinglePoll = await generateAnswers(data, poll.id);
    obj.push({
      ...poll,
      questions: [...answersOfSinglePoll]
    })
  }
  return obj;
}

async function generateAnswers(questions, pollID) {
  let obj = [];
  for (const q of questions) {
    const { data } = await axios.get(`poll/${pollID}/question/${q.id}/option`);
    obj.push({
      ...q,
      options: [...data]
    });
  }
  return obj;
}
