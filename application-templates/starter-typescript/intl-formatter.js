// https://formatjs.io/docs/tooling/cli#extraction
exports.format = function format(extractedMessages) {
  return (
    Object.keys(extractedMessages)
      // transform strings to lowercase to imitate phraseapp sorting
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      .reduce(
        (allMessages, messageId) => ({
          ...allMessages,
          // return a simple STRUCTURED_JSON object
          [messageId]: {
            string: extractedMessages[messageId].defaultMessage,
            ...(extractedMessages[messageId].description && {
              developer_comment: extractedMessages[messageId].description,
            }),
          },
        }),
        {}
      )
  );
};
