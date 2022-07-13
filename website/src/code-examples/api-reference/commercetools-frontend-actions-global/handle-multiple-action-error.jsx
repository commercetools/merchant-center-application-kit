const error = {
  // ...
  body: {
    // ...
    errors: [
      {
        message:
          "This is the first error", // displayed as the notification text
        code: "Invalid",
      },
      {
        message:
          "This is the second error", // also displayed as the notification text
        code: "Invalid",
      },
    ],
  },
}