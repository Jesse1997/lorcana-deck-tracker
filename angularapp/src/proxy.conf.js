const PROXY_CONFIG = [
  {
    context: [
      "/cards",
      "/api/accounts/registration",
      "/api/accounts/login",
      "/cards/privacy",
      "/api/accounts/forgotpassword",
      "/api/accounts/resetpassword",
      "/api/accounts/emailconfirmation"
    ],
    target: "https://localhost:7180",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
