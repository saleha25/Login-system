const { Organization } = require("../models");
const redis = require("../config/cache");
// CREATE Organization
const createOrganization = async (req, res) => {
    try {

        const organization = await Organization.create(req.body);

        res.status(201).json({
            message: "Organization created successfully.",
            organization
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// READ ALL Organizations
const getAllOrganizations = async (req, res) => {
    try {

        const organizations = await Organization.findAll();

        res.status(200).json({
            message: "All Organizations",
            organizations
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// READ Organization By ID
const getOrganizationById = async (req, res) => {
    try {

        const cacheKey = `organization:${req.params.id}`;

        const cachedOrganization = await redis.get(cacheKey);

        if (cachedOrganization) {

            console.log("Returning Organization from Cache");

            return res.status(200).json({
                source: "Cache",
                organization: JSON.parse(cachedOrganization)
            });

        }

        console.log("Fetching Organization from Database");

        const organization = await Organization.findByPk(req.params.id);

        if (!organization) {
            return res.status(404).json({
                message: "Organization not found."
            });
        }

        await redis.set(
            cacheKey,
            JSON.stringify(organization),
            "EX",
            60
        );

        res.status(200).json({
            source: "Database",
            organization
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// UPDATE Organization
const updateOrganization = async (req, res) => {
    try {

        const organization = await Organization.findByPk(req.params.id);

        if (!organization) {
            return res.status(404).json({
                message: "Organization not found."
            });
        }

        await organization.update(req.body);
        await redis.del(`organization:${req.params.id}`);

console.log("Organization Cache Invalidated");

        res.status(200).json({
            message: "Organization updated successfully.",
            organization
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// DELETE Organization
const deleteOrganization = async (req, res) => {
    try {

        const organization = await Organization.findByPk(req.params.id);

        if (!organization) {
            return res.status(404).json({
                message: "Organization not found."
            });
        }

        await organization.destroy();

        res.status(200).json({
            message: "Organization deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization
};