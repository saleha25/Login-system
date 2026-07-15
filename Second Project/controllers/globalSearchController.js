const {
    User,
    Organization,
    Role,
    Permission
} = require("../models");

const { Op } = require("sequelize");

const globalSearch = async (req, res) => {

    try {

        const keyword = req.query.keyword;

        if (!keyword) {

            return res.status(400).json({
                message: "Keyword is required."
            });

        }

        const users = await User.findAll({

            where: {

                [Op.or]: [

                    {
                        name: {
                            [Op.iLike]: `%${keyword}%`
                        }
                    },

                    {
                        email: {
                            [Op.iLike]: `%${keyword}%`
                        }
                    }

                ]

            }

        });

        const organizations = await Organization.findAll({

            where: {

                organizationName: {

                    [Op.iLike]: `%${keyword}%`

                }

            }

        });

        const roles = await Role.findAll({

            where: {

                roleName: {

                    [Op.iLike]: `%${keyword}%`

                }

            }

        });

        const permissions = await Permission.findAll({

            where: {

                permissionName: {

                    [Op.iLike]: `%${keyword}%`

                }

            }

        });

        res.status(200).json({

            users,

            organizations,

            roles,

            permissions

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports={

    globalSearch

};