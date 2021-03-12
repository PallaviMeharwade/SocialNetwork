module.exports=(sequelize, Sequelize)=>{
    const Thought = sequelize.define('thought', {
        thought_id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        thought_desc:{
            type: Sequelize.STRING,
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
    return Thought;
}