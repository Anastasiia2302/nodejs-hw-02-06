const { HttpError } = require("../helpers");
const {ctrlWrapper} = require("../decorators");
const {Contact} = require("../models/contact");


const getAllContacts = async (req, res, next) => {
   
      const result = await Contact.find();
      res.json(result);
    } 

  const getContactById = async (req, res, next) => {
    
      const { id } = req.params;
      const result = await Contact.findById(id)
      if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
      }
      res.json(result);
   
  }

  const addContact = async (req, res, next) => {
    
      
      const result = await Contact.create(req.body);
      res.status(201).json(result);
    } 

  const deleteContactById = async (req, res, next) => {
    
      const { id } = req.params;
      const result = await Contact.findByIdAndRemove(id);
      if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
      }
      res.json({
        message: "Delete success",
      });
    } 

  const updateContactById = async (req, res, next) => {
    
     
      const { id } = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
      if (!result) {
        throw HttpError(404, `Contacts with ${id} not found`);
      }
      res.json(result);
    } 
    
    const updateFavorite = async (req, res, next) => {
    
     
      const { id } = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
      if (!result) {
        throw HttpError(404, `missing field favorite`);
      }
      res.json(result);
    } 
    

  module.exports = {
    getAllContacts:ctrlWrapper(getAllContacts),
    getContactById:ctrlWrapper(getContactById),
    addContact:ctrlWrapper(addContact),
    deleteContactById:ctrlWrapper(deleteContactById),
    updateContactById:ctrlWrapper(updateContactById),
    updateFavorite:ctrlWrapper(updateFavorite),

  }