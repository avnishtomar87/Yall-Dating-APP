const router = require("express").Router();
const { verifyToken } = require("../middlewares/userAuth");

const usersDocumentsController = require("../controllers/user_documents.controller");
const usersController = require("../controllers/users.controller");
const preferencesController = require("../controllers/dating_preferences.controller")
const categoryController = require("../controllers/interest_category.controller")
const valueController = require("../controllers/category_value.controller")
const interestController = require("../controllers/user_interests.controller")
const eventsController = require("../controllers/events.controller")
const eventTypeController = require("../controllers/event_type.controller")
const eventBookingController = require("../controllers/event_booking.controller")
const paymentCardsController = require("../controllers/payment_cards.controller")
const promptsController = require("../controllers/prompts.controller")
const userPromptsController = require("../controllers/user_prompts.controller")

// users APIs adminLogin
router.post("/user/adminLogin", usersController.adminLogin);
router.post("/user/googlelogin", usersController.googleLogin);
router.post("/user/fblogin", usersController.fbLogin);
router.post("/user/applelogin", usersController.appleLogin);
router.get("/user/all", usersController.getAllUsers);
router.get("/user/:id", usersController.getUserById);
router.put("/user/update/:id", usersController.updateUser);
router.delete("/user/delete/:id", usersController.deleteUserById);
router.post("/user/changePassword/:id", usersController.changePassword);
router.post("/user/devicetoken", usersController.deviceToken);
router.post("/user/sendOtp", usersController.sendOtp);
router.post("/user/isExit", usersController.otpVerify);

// user_document APIs
router
  .route("/document/gallery")
  .post(usersDocumentsController.uploadPhoto, usersDocumentsController.addDocuments)
  .get(usersDocumentsController.getAllDocuments);
router
  .route("/document/gallery/:id")
  .get(usersDocumentsController.getDocumentsById)
  .put(usersDocumentsController.uploadPhoto, usersDocumentsController.updateDocuments)
  .delete(usersDocumentsController.deleteDocuments);

//dating_preferences APIs
router
  .route("/preferences/user")
  .post(preferencesController.addPreferences)
  .get(preferencesController.getAllPreferences);
router
  .route("/preferences/user/:id")
  .get(preferencesController.getPreferencesById)
  .put(preferencesController.updatePreferences)
  .delete(preferencesController.deletePreferences);
router.get("/setPreferences", preferencesController.getSetPreferences)

//interest_category APIs
router
  .route("/interest/category")
  .post(categoryController.addCategory)
  .get(categoryController.getAllCategories);
router
  .route("/interest/category/:id")
  .get(categoryController.getCategoryById)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

//interest_value APIs
router
  .route("/interest/value")
  .post(valueController.addValue)
  .get(valueController.getAllValues);
router
  .route("/interest/value/:id")
  .get(valueController.getAllValuesById)
  .put(valueController.updateValue)
  .delete(valueController.deleteValue);

//user_interest APIs
router
  .route("/interest/user")
  .post(interestController.addInterest)
  .get(interestController.getAllInterests);
router
  .route("/interest/user/:id")
  .get(interestController.getInterestById)
  .put(interestController.updateInterest)
  .delete(interestController.deleteInterest);

//event APIs
router
  .route("/events")
  .post(eventsController.uploadBanners, eventsController.addEvent)
  .get(eventsController.getAllEvents);
router
  .route("/event/:id")
  .put(eventsController.uploadBanners, eventsController.updateEvent)
  .delete(eventsController.deleteEvent);
router.get("/event", eventsController.getEventById)

//event_type APIs
router
  .route("/eventType")
  .post(eventTypeController.uploadBanner, eventTypeController.addEventType)
  .get(eventTypeController.getAllEventType);
router
  .route("/eventType/:id")
  .get(eventTypeController.getEventTypeById)
  .put(eventTypeController.uploadBanner, eventTypeController.updateEventType)
  .delete(eventTypeController.deleteEventType);

//event_booking
router
  .route("/eventBooking")
  .post(eventBookingController.addEventBooking)
  .get(eventBookingController.getAllEventBooking);
router
  .route("/eventBooking/:id")
  .get(eventBookingController.getEventBookingById)
  .put(eventBookingController.updateEventBooking)
  .delete(eventBookingController.deleteEventBooking);

//payment_cards APIs
router
  .route("/paymentCards")
  .post(paymentCardsController.addPaymentCard)
  .get(paymentCardsController.getAllPaymentCards);

router
  .route("/paymentCard/:id")
  .get(paymentCardsController.getPaymentCardById)
  .put(paymentCardsController.updatePaymentCard)
  .delete(paymentCardsController.deletePaymentCard)

//prompts APIs
router
  .route("/prompts")
  .post(promptsController.addPrompt)
  .get(promptsController.getAllPrompts);

router
  .route("/prompt/:id")
  .get(promptsController.getPromptById)
  .put(promptsController.updatePrompt)
  .delete(promptsController.deletePrompt)

//user_prompts APIs
router
  .route("/userPrompts")
  .post(userPromptsController.addUserPrompt)

router
  .route("/userPrompt/:user_id")
  .get(userPromptsController.getUserAllPromptsById);

module.exports = router;
