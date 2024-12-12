const ticketController = require("../controllers/ticketsControllers/ticketsControllers");
const router = require("express").Router();

// Create a new ticket
router.post("/create-ticket", ticketController.createTicket);

// View All Tickets
router.get("/view-all-tickets", ticketController.fetchAllTickets);

// View A single Tickets
router.get("/view-a-single-ticket/:id", ticketController.fetchASingleTicket);

// Delete Ticket
router.delete("/delete-ticket/:id", ticketController.deleteTicket);

// Edit Ticket
router.put("/edit-ticket/:id", ticketController.updateTicket);

// TICKET TEST USER ROUTES START

// User Signup
router.post("/signup-user", ticketController.signupUser);

// TICKET TEST USER ROUTES END

module.exports = router;
