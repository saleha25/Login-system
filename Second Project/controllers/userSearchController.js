const {
    User,
    Role,
    Organization
} = require("../models");

const { Op } = require("sequelize");

const searchUsers = async (req, res) => {

    try {

        const {

            name,
            email,
            status,
            page = 1,
            limit = 5,
            sort = "name"

        } = req.query;

        const where = {};

        if (name) {

            where.name = {
                [Op.iLike]: `%${name}%`
            };

        }

        if (email) {

            where.email = {
                [Op.iLike]: `%${email}%`
            };

        }

        if (status) {

            where.status = status;

        }

       const users = await User.findAndCountAll({

    where,

    include: [

        {
            model: Role,

            where: req.query.role
                ? {
                      roleName: {
                          [Op.iLike]: `%${req.query.role}%`
                      }
                  }
                : undefined,

            required: !!req.query.role
        },

        {
            model: Organization,

            through: {
                attributes: []
            },

            where: req.query.organization
                ? {
                      organizationName: {
                          [Op.iLike]: `%${req.query.organization}%`
                      }
                  }
                : undefined,

            required: !!req.query.organization
        }

    ],

    order: [[sort, "ASC"]],

    offset: (page - 1) * limit,

    limit: parseInt(limit)

});
        res.status(200).json({

            totalUsers: users.count,

            currentPage: parseInt(page),

            totalPages:

                Math.ceil(users.count / limit),

            users: users.rows

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    searchUsers

};