
const express = require('express')
const app = express()
const config = require("./config/Constants")
app.use(express.static("."));

app.use("/twitch/user/auth", require("./routes/TwitchUserAuth"))
app.use("/twitch/app/auth", require("./routes/TwitchAppAuth"))
app.use("/stripe/checkout", require("./routes/StripeCheckout"))

app.listen(config.PORT, () => {
  console.log(`Example app listening at ${config.URL}:${config.PORT}`)
})
