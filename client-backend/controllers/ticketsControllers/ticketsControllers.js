// const Ticket = require("../../models/TicketTest");
const Ticket = require("../../models/Tickets");
const TicketUsersTest = require("../../models/TicketUsersTest");
const bcrypt = require("bcryptjs");
// POST - Raise a ticket

const createTicket = async (req, res) => {
  try {
    // Get the sent in data off request body
    // const ticketIdFromRequestBody = req.body.ticketId;
    const raisedByFromRequestBody = req.body.raisedBy;
    const descriptionFromRequestBody = req.body.description;
    const selectedDepartmentFromRequestBody = req.body.selectedDepartment;

    // Create a ticket with it (take the values from the request body / frontend and insert in the database)
    const ourCreatedTicket = await Ticket.create({
      //   ticketId: ticketIdFromRequestBody,
      raisedBy: raisedByFromRequestBody,
      description: descriptionFromRequestBody,
      selectedDepartment: selectedDepartmentFromRequestBody,
    });

    // respond with the new ticket (this will be our response in postman / developer tools)
    res.json({ ticket: ourCreatedTicket });
  } catch (error) {
    console.log(error);
  }
};

// GET - Fetch all tickets
const fetchAllTickets = async (req, res) => {
  try {
    // Find the tickets
    const listOfAllTickets = await Ticket.find();

    // Respond with them
    res.json({ tickets: listOfAllTickets });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// GET - Fetch a single ticket
const fetchASingleTicket = async (req, res) => {
  try {
    // Get the id off the url
    const ticketIdFromTheUrl = req.params.id;

    // Find the ticket using that id
    const ticketFromTheDb = await Ticket.findOne({
      _id: ticketIdFromTheUrl,
    });

    // Respond with the ticket
    res.json({ ticket: ticketFromTheDb });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// DELETE - delete ticket

const deleteTicket = async (req, res) => {
  try {
    // get id off the url
    const ticketIdFromTheUrl = req.params.id;

    // Delete the record
    await Ticket.deleteOne({ _id: ticketIdFromTheUrl });

    // Respond with a message (eg: ticket deleted)
    res.json({ success: "Record deleted" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// PUT - edit ticket
const updateTicket = async (req, res) => {
  try {
    // Get the id off the url
    const ticketIdFromTheUrl = req.params.id;

    // Get the data off the req body
    const raisedByFromRequestBody = req.body.raisedBy;
    const descriptionFromRequestBody = req.body.description;

    // Find and update the record
    await Ticket.findOneAndUpdate(
      { _id: ticketIdFromTheUrl },
      {
        raisedBy: raisedByFromRequestBody,
        description: descriptionFromRequestBody,
      }
    );

    //   Find updated ticket (using it's id)
    const updatedTicket = await Ticket.findById(ticketIdFromTheUrl);

    // Respond with the updated ticket (after finding it)
    res.json({ ticket: updatedTicket });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// PUT - Accept ticket
const acceptTicket = async (req, res) => {
  try {
    // Get the id off the url
    const ticketIdFromTheUrl = req.params.id;

    // Get the data off the req body
    const assignedMemberFromRequestBody = req.body.assignedMember;
    // const descriptionFromRequestBody = req.body.description;

    // Find and update the record
    await Ticket.findOneAndUpdate(
      { _id: ticketIdFromTheUrl },
      {
        assignedMember: assignedMemberFromRequestBody,
        // description: descriptionFromRequestBody,
        "accepted.acceptedStatus": true,
      },
      { new: true } // Returns the updated document
    );

    //   Find updated ticket (using it's id)
    const updatedTicket = await Ticket.findById(ticketIdFromTheUrl);

    // Respond with the updated ticket (after finding it)
    res.json({ ticket: updatedTicket });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// PUT - close ticket
const closeTicket = async (req, res) => {
  try {
    // Get the id off the url
    const ticketIdFromTheUrl = req.params.id;

    // Get the data off the req body
    // const assignedMemberFromRequestBody = req.body.assignedMember;
    // const descriptionFromRequestBody = req.body.description;

    // Find and update the record
    await Ticket.findOneAndUpdate(
      { _id: ticketIdFromTheUrl },
      {
        // assignedMember: assignedMemberFromRequestBody,
        // description: descriptionFromRequestBody,
        status: "Closed",
      },
      { new: true } // Returns the updated document
    );

    //   Find updated ticket (using it's id)
    const updatedTicket = await Ticket.findById(ticketIdFromTheUrl);

    // Respond with the updated ticket (after finding it)
    res.json({ ticket: updatedTicket });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// PUT - escalate ticket
const escalateTicket = async (req, res) => {
  try {
    // Get the id off the url
    const ticketIdFromTheUrl = req.params.id;

    // Get the data off the req body
    // const assignedMemberFromRequestBody = req.body.assignedMember;
    // const descriptionFromRequestBody = req.body.description;

    // Find and update the record
    await Ticket.findOneAndUpdate(
      { _id: ticketIdFromTheUrl },
      {
        // assignedMember: assignedMemberFromRequestBody,
        // description: descriptionFromRequestBody,
        "escalation.escalationToAdmin.isEscalated": true,
        "escalation.escalationToAdmin.escalatedTo": "Machendranath",
      },
      { new: true } // Returns the updated document
    );

    //   Find updated ticket (using it's id)
    const updatedTicket = await Ticket.findById(ticketIdFromTheUrl);

    // Respond with the updated ticket (after finding it)
    res.json({ ticket: updatedTicket });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// TEST USER ROUTES START

const signupUser = async (req, res) => {
  try {
    // Get the email and password off the req body
    const nameFromRequestBody = req.body.name;
    const emailFromRequestBody = req.body.email;
    const roleFromRequestBody = req.body.role;
    const departmentFromRequestBody = req.body.department;
    const passwordFromRequestBody = req.body.password;
    const designationFromRequestBody = req.body.designation;
    const companyFromRequestBody = req.body.company;
    const phoneFromRequestBody = req.body.phone;

    //   Hash password
    const hashedPassword = bcrypt.hashSync(passwordFromRequestBody, 8);

    // Create a user with the data (in the DB)
    await TicketUsersTest.create({
      name: nameFromRequestBody,
      email: emailFromRequestBody,
      role: roleFromRequestBody,
      department: departmentFromRequestBody,
      password: hashedPassword,
      designation: designationFromRequestBody,
      company: companyFromRequestBody,
      phone: phoneFromRequestBody,
    });

    // respond with the new created user
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
// TEST USER ROUTES END

module.exports = {
  createTicket,
  fetchAllTickets,
  fetchASingleTicket,
  deleteTicket,
  updateTicket,
  acceptTicket,
  closeTicket,
  escalateTicket,
  signupUser,
};
