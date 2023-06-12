const express = require("express");
const contactsController = require("../../controllers/contactsController");
const { schemas } = require("../../schemas/contactsSchema");
const { validateBody } = require("../../decorators");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.getAllContacts);

router.get("/:id", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.delete("/:id", isValidId, contactsController.deleteContactById);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContactById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateFavorite
);

module.exports = router;
