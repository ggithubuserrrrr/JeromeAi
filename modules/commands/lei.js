const axios = require('axios');

module.exports.config = {
  name: 'lei',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Adrian', // Replace with the actual author's name
  description: 'Ask Lei a question!',
  usePrefix: false,
  commandCategory: 'chatbots',
  usages: 'Lei [question]',
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const question = args.join(' '); // Use the command argument as the question
  const apiKey = 'j86bwkwo-8hako-12C'; // Replace with your API Key

  const url = 'https://lianeapi.onrender.com/@unregistered/api/0.21867366430130786';
  const params = {
    key: apiKey,
    query: question,
  };

  api.setMessageReaction("⏱️", event.messageID, () => {}, true);

  try {
    const response = await axios.get(url, { params });

    // Log the response to console if you prefer.
    console.log(response.data.message);

    api.sendMessage(response.data.message, event.threadID, event.messageID);
    api.setMessageReaction("", event.messageID, () => {}, true);
  } catch (error) {
    api.sendMessage('⚠️ Something went wrong: ' + error.message, event.threadID, event.messageID);
    api.setMessageReaction("⚠️", event.messageID, () => {}, true);
  }
};