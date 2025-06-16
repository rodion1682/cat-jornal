const path = require('path');

module.exports = {
	style: {
		sass: {
			loaderOptions: {
				additionalData: `@import "variables/_media-queries.scss";`,
				sassOptions: {
					includePaths: [path.resolve(__dirname, 'src/app/styles')],
				},
			},
		},
	},
};
