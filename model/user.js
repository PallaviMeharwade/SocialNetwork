module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        // attributes
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          required: true
        },
        email: {
          type: Sequelize.STRING(100),
          primaryKey: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          required: true
        },
        insta_id: {
          type: Sequelize.STRING,
          allowNull: false,
          required: true
        },
        country: {
          type: Sequelize.STRING,
          allowNull: false,
          required: true
        },
        bio: {
          type: Sequelize.STRING,
          allowNull: false,
          required: true
        },
        user_img:{
          type: Sequelize.BLOB('long'),
          required: false
        }
      }, {
        // options
      });
      return User;
}