// https://formatjs.io/docs/tooling/cli#extraction
exports.format = function format(extractedMessages) {
  return (
    Object.keys(extractedMessages)
      // transform strings to lowercase to imitate phraseapp sorting
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      .reduce(
        (allMessages, messageId) => ({
          ...allMessages,
          // Return a simple key/value JSON object.
          [messageId]: extractedMessages[messageId].defaultMessage,
        }),
        {}
      )
  );
};
