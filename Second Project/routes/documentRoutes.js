const express = require("express");
const router = express.Router();

const {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
} = require("../controllers/documentController");

router.post("/", createDocument);

router.get("/", getAllDocuments);

router.get("/:id", getDocumentById);

router.put("/:id", updateDocument);

router.delete("/:id", deleteDocument);

module.exports = router;