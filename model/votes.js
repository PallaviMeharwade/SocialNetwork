module.exports = (sequelize, Sequelize) => {
    const Vote = sequelize.define('vote', {
        // attributes
        vote_id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        post_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'posts',
            key: 'post_id'
          }
        },
        votes: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          required: false
        },
        email: {
          type: Sequelize.STRING(100),
          references:{
            model:'users',
            key: 'email',
            allowNull:false
          }
        }
      }, {
        // options
      });
      return Vote;
}