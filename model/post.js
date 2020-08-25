module.exports=(sequelize, Sequelize)=>{
    const Post = sequelize.define('post', {
        post_id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        loc_name:{
            type: Sequelize.STRING(100),
            allowNull: false,
            required:true
        },
    
        loc_desc:{
            type: Sequelize.STRING,
            allowNull: false,
            required:true
        },
    
        loc_img: {
            type: Sequelize.BLOB('long'),
            required:false
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
    return Post;
}