const sequelize = require("../config/database");

const Role = require("./Role");
const User = require("./User");
const Organization = require("./Organization");
const UserOrganization = require("./UserOrganization");
const UserLog = require("./UserLog");
const Session = require("./Session");
const Document = require("./Document");
const Permission = require("./Permission");
const RolePermission = require("./RolePermission");
const PasswordReset = require("./PasswordReset");
Role.hasMany(User, {
    foreignKey: "roleId"
});

User.belongsTo(Role, {
    foreignKey: "roleId"
});

User.belongsToMany(Organization, {
    through: UserOrganization,
    foreignKey: "userId"
});

Organization.belongsToMany(User, {
    through: UserOrganization,
    foreignKey: "organizationId"
});

User.hasMany(UserLog, {
    foreignKey: "userId"
});

UserLog.belongsTo(User, {
    foreignKey: "userId"
});

User.hasMany(Session, {
    foreignKey: "userId"
});

Session.belongsTo(User, {
    foreignKey: "userId"
});
User.hasMany(Document, {
    foreignKey: "userId"
});

Document.belongsTo(User, {
    foreignKey: "userId"
});

User.hasMany(PasswordReset, {
    foreignKey: "userId"
});

PasswordReset.belongsTo(User, {
    foreignKey: "userId"
});

Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: "roleId"
});

Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: "permissionId"
});

module.exports = {
    sequelize,
    Role,
    User,
    Organization,
    UserOrganization,
    UserLog,
    Session,
    Document,
    Permission,
    RolePermission,
    PasswordReset
};