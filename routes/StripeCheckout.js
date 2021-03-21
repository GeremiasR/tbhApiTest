const { Router } = require("express");

const router = Router();

const stripe = require("stripe")(
  "sk_test_51IUCi9H7BxuXo85876s7yTp9SbwETcNHvrcCkA1PX11PZ0zKJPbxpnbetGij2hAz0UW1HrFLMqpRHFAHhkZwQEKl00F6jq0kUs"
);
const stripePublicKey =
  "pk_test_51IUCi9H7BxuXo858AqjWJxKThNKPwRijc4S3AukJkyNtM5PwIYSuwU3stvc3fgdyfHnJKqxQ5t4qNbfEzElsALq600Mv915sIy";
const YOUR_DOMAIN = `http://localhost:3000/`;

router.get("/payment/success", (req, res) => {
  res.json({ success: true });
});

router.get("/payment/cancel", (req, res) => {
  res.json({ success: false });
});

router.get("/checkout/redirect", async (req, res) => {
  const checkoutHtmlPage = (stripePublicKey, sessionId) => {
    return `<html>
          <body>
            <!-- Load Stripe.js on your website. -->
            <script src="https://js.stripe.com/v3"></script>
            <h1>Redirecting you to Checkout...</h1>
            <div id="error-message"></div>
            <script>
              (function () {
                var stripe = Stripe('${stripePublicKey}');
                window.onload = function () {
                  stripe.redirectToCheckout({
                    sessionId: '${sessionId}'
                  })
                  .then(function (result) {
                    if (result.error) {
                      var displayError = document.getElementById('error-message');
                      displayError.textContent = result.error.message;
                    }
                  });
                };
              })();
            </script>
          </body>
        </html>`;
  };
  res.send(checkoutHtmlPage(stripePublicKey, req.query.sessionId));
});

router.post("/checkout", async (req, res) => {
  console.log(req.body);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: req.body.description,
            images: [
              "https://i.pinimg.com/originals/71/70/5d/71705dc28ec7a94f304f2e4e5a23bf52.jpg",
            ],
          },
          unit_amount: 100,
        },
        quantity: req.body.amount,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}payment/success`,
    cancel_url: `${YOUR_DOMAIN}payment/cancel`,
  });

  res.json({ id: session.id });
});

module.exports = router;
