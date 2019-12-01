const Router= require('express');

const router = new Router();

router.get('/test', (req, res) => {
    const data = {
        name: 'Weather dashboard',
        website: 'weatherdashboard.com'
    };
    res.json(data);
});  

module.exports = router;