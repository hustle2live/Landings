export const postFeedback = async (TOKEN, DATA, METHOD_NAME = `sendMessage`) => {
   console.log('sending...');
   return await fetch(`https://api.telegram.org/bot${TOKEN}/${METHOD_NAME}`, {
      method: 'POST',
      body: DATA
   });
};
