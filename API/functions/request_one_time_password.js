const admin = require('firebase-admin');

const twilio = require('./twilio');

const TWILIO_PHONE = '+18582642271';

module.exports = (req, res) => {
    // verify user provides a phone
    if (!req.body.phone)
    return res.status(422).json({ error: 'Missing Phone Number' });

    const phone = String(req.body.phone).replace(/[^\d]/g, '');

    admin.auth().getUser(phone)
    .then(userRecord => {
        const code = Math.floor(Math.random() * 8999 + 1000);
        twilio.messages.create({
            body: `Your code is ${code}`,
            to: userRecord.phoneNumber,
            from: TWILIO_PHONE
        })
        .then(message => {
            console.log(`Twilio message ${message.sid} sent`);
            admin.database().ref(`users/${phone}`)
            .update({ code, isValid: true }, (err) => {
                if (err)
                    return res.status(500).json({ error: err });

                res.status(200).json({success: true});
            });
        })
        .catch(err => res.status(422).json({ error: err }));
    })
    .catch(err => res.status(422).json({ error: err }));
};