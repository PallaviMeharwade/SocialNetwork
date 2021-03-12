module.exports=(sequelize, Sequelize)=>{
    const Feedback = sequelize.define('feedback', {
        feed_id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        feed_desc:{
            type: Sequelize.STRING,
            allowNull: false,
            required:true
        },
        feed_rate:{
            type: Sequelize.INTEGER,
            allowNull: false,
            required:true
        },
    

        email:{
           type:Sequelize.STRING(100),
           references:{
            model:'users',
            key: 'email'
           }
        }
    }, {
        // options
    });
    return Feedback;
}