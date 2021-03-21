const { Router } = require("express");
const axios = require("axios");
const config = require("../config/TwitchAuth");
const router = Router();

router.get("/", (req, res) => {
  try {
    axios
      .post(
        `https://id.twitch.tv/oauth2/token?client_id=${config.CLIENT_ID}&client_secret=${config.SECRET_ID}&grant_type=client_credentials`
      )
      .then((data) => res.status(200).json({"data":data.data}))
      .catch((err) => res.status(500).json({"msg":"Internal server error."}));
  } catch (err) {
    console.error("GG", err);
    res.status(500).json({"msg":"Internal server error."});
  }
});

module.exports = router;
