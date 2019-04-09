const router = require('express-promise-router')();

const userController = require('../controllers/user.controller');

router.route('/register')
    .post(userController.register)

router.route('/login')
    .post(userController.login)

router.route('/logout')
    .post(userController.logout);

router.route('/secret')
    .post(userController.secret);

router.route('/emailValidation')
    .post(userController.validateEmail)

    /**in:
     * {
     *  session: "token"
     * }
     * 
     * out:
     * {
     *  username: String,
     *  id: String,
     *  isAdmin: boolean,
     *  email: String
     * }
     */
router.route('/userProperties')
    .post(userController.userProperties)

    /**in:
     * {
     *  session: "token"
     * }
     * 
     * out:
     * {
     *  likedArticles:[array d'article id]
     * }
     */
router.route('/userLikedArticles')
.post(userController.likeArticles)

module.exports = router;