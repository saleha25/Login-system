const { User } = require("../models");
const { Op } = require("sequelize");

const getUserAnalytics = async (req, res) => {

    try {

        const today = new Date();

        const startOfToday = new Date();
        startOfToday.setHours(0,0,0,0);

        const startOfWeek = new Date();
        startOfWeek.setDate(today.getDate()-7);

        const startOfMonth = new Date();
        startOfMonth.setDate(1);

        const totalUsers = await User.count();

        const activeUsers = await User.count({
            where:{
                status:"Active"
            }
        });

        const inactiveUsers = await User.count({
            where:{
                status:"Inactive"
            }
        });

        const verifiedUsers = await User.count({
            where:{
                isVerified:true
            }
        });

        const usersToday = await User.count({
            where:{
                createdAt:{
                    [Op.gte]:startOfToday
                }
            }
        });

        const usersThisWeek = await User.count({
            where:{
                createdAt:{
                    [Op.gte]:startOfWeek
                }
            }
        });

        const usersThisMonth = await User.count({
            where:{
                createdAt:{
                    [Op.gte]:startOfMonth
                }
            }
        });

        res.status(200).json({

            totalUsers,

            activeUsers,

            inactiveUsers,

            verifiedUsers,

            usersCreatedToday:usersToday,

            usersCreatedThisWeek:usersThisWeek,

            usersCreatedThisMonth:usersThisMonth

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports={

    getUserAnalytics

};