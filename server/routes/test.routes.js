const router = require("express").Router();
const testController = require("../controllers/test.controller");

router.route("/ok")
  .get(testController.index);

router.route("/post")
  .get(testController.shouldBePost)
  .post(testController.postTest);

router.route("/modeltest")
  .get(testController.modelTest);

// router.route("/:id")
//   .get(GameController.show)
//   .put(authenticate, GameController.update)
//   .delete(authenticate, GameController.destroy);

// router.route("/:id/begin")
//   .put(authenticate, GameController.begin);

// router.route('/:gameId/addPlayerWhite/:userId')
//   .put(authenticate, GameController.addPlayerWhite);
// router.route('/:gameId/addPlayerBlack/:userId')
//   .put(authenticate, GameController.addPlayerBlack);

// router.route('/:gameId/removePlayerWhite/:userId')
//   .put(authenticate, GameController.removePlayerWhite);
// router.route('/:gameId/removePlayerBlack/:userId')
//   .put(authenticate, GameController.removePlayerBlack);

module.exports = router;