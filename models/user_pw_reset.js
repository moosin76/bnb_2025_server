module.exports = (sequelize, DataTypes) => {
	const user_pw_reset = sequelize.define('user_pw_reset', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tempPw: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		expireAt: {
			type: DataTypes.DATE,
			allowNull: false,
		}
	}, {
		freezeTableName: true,
		updatedAt: false,
		createdAt: false,
	});
	user_pw_reset.associate = function(models) {
		// associations can be defined here
	};
	return user_pw_reset;
};