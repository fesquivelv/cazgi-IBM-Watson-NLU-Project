const express = require('express');
const dotenv = require('dotenv');
const app = new express();
dotenv.config();

function getNLUINstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    console.log('key',api_key);

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url
    });

    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", async (req,res) => {

            try {
            const analyzeParams = {
            'url': req.query.url,
            'features': {
                'emotion': {
                }
            }
        };
        const analizeResult = await getNLUINstance().analyze(analyzeParams);
        const emotion = analizeResult.result.emotion.document.emotion
        console.log(JSON.stringify(analizeResult.result.emotion.document.emotion, null, 2));
        return res.send(emotion);
    } catch (e) {
        console.log('My Error', e);
        return res.status(400).send(e.message);
    }
});

app.get("/url/sentiment", async (req,res) => {
    try {
            const analyzeParams = {
            'url': req.query.url,
            'features': {
                'sentiment': {
                }
            }
        };
        const analizeResult = await getNLUINstance().analyze(analyzeParams);
        const label = analizeResult.result.sentiment.document.label;
        return res.send(label);
    } catch (e) {
        console.log('My Error', e);
        return res.status(400).send(e.message);
    }
});

app.get("/text/emotion", async (req,res) => {
        try {
            const analyzeParams = {
            'text': req.query.text,
            'features': {
                'emotion': {
                }
            }
        };
        const analizeResult = await getNLUINstance().analyze(analyzeParams);
        const emotion = analizeResult.result.emotion.document.emotion
        console.log(JSON.stringify(analizeResult.result.emotion.document.emotion, null, 2));
        return res.send(emotion);
    } catch (e) {
        console.log('My Error', e);
        return res.status(400).send(e.message);
    }
});

app.get("/text/sentiment", async (req,res) => {
    try {
            const analyzeParams = {
            'text': req.query.text,
            'features': {
                'sentiment': {
                }
            }
        };
        const analizeResult = await getNLUINstance().analyze(analyzeParams);
        const label = analizeResult.result.sentiment.document.label;
        return res.send(label);
    } catch (e) {
        console.log('My Error', e);
        return res.status(400).send(e.message);
    }

});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

