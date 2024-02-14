const cartDataSet = require("../data/cartValueData.json");

const { sendOfferRequest } = require("../helper/sendOfferRequest.js");
const { offerBodyFlatX, offerBodyFlatXPercentage } = require("../data/offerRequestData.js")

const baseUrl = 'http://localhost:9001';


fixture("check FlatX off")
    .before(async () => {
        await sendOfferRequest(offerBodyFlatX);
        await sendOfferRequest(offerBodyFlatXPercentage);
    });
cartDataSet.forEach(({ testName, headers, requestBody, expectedResponse }) => {
    test(testName, async t => {
        const response = await t.request({
            url: `${baseUrl}/api/v1/cart/apply_offer`,
            method: "post",
            headers: headers,
            body: requestBody
        });
        await t.expect(response.body.cart_value).eql(expectedResponse.cart_value)
        await t.expect(response.status).eql(expectedResponse.statusCode);
    });
});
