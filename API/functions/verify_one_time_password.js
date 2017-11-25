const admin = require('firebase-admin');

module.exports = (req, res) => {
    if (!req.body.code || !req.body.phone)
        return res.status(422).json({ error: 'Code and Phone must be provided' });

    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    const code = parseInt(req.body.code);

    admin.auth().getUser(phone)
    .then(userRecord => {
        const ref = admin.database().ref(`users/${phone}`)
        ref.once('value', snapshot => {
            const user = snapshot.val();
            if (user.code !== code || !user.isValid)
                return res.status(403).json({ error: 'Code is not valid' });
            ref.update({ isValid: false });
            admin.auth().createCustomToken(phone)
            .then(token => res.status(200).json({ token }))
        },
        err => res.status(500).json({ error: err }))
    })
    .catch(err => res.status(422).json({ error: err }));
};