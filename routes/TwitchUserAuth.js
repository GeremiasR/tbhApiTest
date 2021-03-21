const { Router } = require("express");
const https = require("https");
const axios = require("axios");
const config = require("../config/TwitchAuth");
const router = Router();

router.get("/", (req, res) => {
  console.log(req.query);
  try {
    axios
      .post(
        `https://id.twitch.tv/oauth2/token?client_id=${config.CLIENT_ID}&client_secret=${config.SECRET_ID}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=${config.REGISTERED_URI}`
      )
      .then((data) => res.status(200).json({"data":data.data}))
      .catch((err) => {
          res.status(500).json({"msg":"Internal server error."})
          console.log(err)
        });
  } catch (err) {
    console.error("GG", err);
    res.status(500).json({"msg":"Internal server error."});
  }
});

module.exports = router;
