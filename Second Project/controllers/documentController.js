const { Document } = require("../models");

// CREATE
const createDocument = async (req, res) => {
    try {

        const document = await Document.create(req.body);

        res.status(201).json({
            message: "Document created successfully.",
            document
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// READ ALL
const getAllDocuments = async (req, res) => {
    try {

        const documents = await Document.findAll();

        res.status(200).json({
            message: "All Documents",
            documents
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// READ ONE
const getDocumentById = async (req, res) => {
    try {

        const document = await Document.findByPk(req.params.id);

        if (!document) {
            return res.status(404).json({
                message: "Document not found."
            });
        }

        res.status(200).json(document);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// UPDATE
const updateDocument = async (req, res) => {
    try {

        const document = await Document.findByPk(req.params.id);

        if (!document) {
            return res.status(404).json({
                message: "Document not found."
            });
        }

        await document.update(req.body);

        res.status(200).json({
            message: "Document updated successfully.",
            document
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// DELETE
const deleteDocument = async (req, res) => {
    try {

        const document = await Document.findByPk(req.params.id);

        if (!document) {
            return res.status(404).json({
                message: "Document not found."
            });
        }

        await document.destroy();

        res.status(200).json({
            message: "Document deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
};