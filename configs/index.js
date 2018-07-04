const fs = require('fs')

let config = {
	mongodb:{
		url:process.env.MONGO_URL || 'mongodb://localhost:27017/kuraki',
	},
	jwt: {
        secret: 'KurakiMai',
    },
    mongodbSecret: { 
        user: '',
        pass: '',
    },
    imagePath:'public/uploads/',
}

if (fs.existsSync(__dirname + '/private.js')) {

    config = Object.assign(config, require('./private.js'));

}


console.log(config);

module.exports=config;