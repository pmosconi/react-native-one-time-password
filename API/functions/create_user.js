const admin = require('firebase-admin');
const phone = require('phone');

module.exports = (req, res) => {
    // verify user provides a phone
    if (!req.body.phone)
        return res.status(422).json({ error: 'Bad Input' });

    // check and format phone
    const userPhone = phone(String(req.body.phone));
    // valid phone number
    if (userPhone.length === 2) {
        const uid = userPhone[0].replace(/[^\d]/g, '');
        const country = userPhone[1];

        // create a new user
        admin.auth().createUser({ 
            uid,
            phoneNumber: userPhone[0],
            email: req.body.email,
        })
        .then(user => {
            admin.database().ref(`users/${uid}`)
            .update({ country }, (err) => {
                if (err)
                    return res.status(500).json({ error: err });

                res.status(200).json({success: true});
            });
        })
        .catch(err => res.status(422).json({ error: err }));
    }
    // invalid phone number
    else
        return res.status(422).json({ error: 'Invalid Phone Number' });
};