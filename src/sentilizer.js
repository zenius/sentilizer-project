
let {PythonShell} = require('python-shell'); 
let { promisify } = require('util');
let python_shell_run = promisify(PythonShell.run);

export function sentilize(sentence){
  	return new Promise( (resolve, reject) => {
		let options = {
			scriptPath: 'E:/UdemyCourses/course_nodejs_reactjs/sentilizer_api/src',
			args: ['-s', `${sentence}`]
		};

		python_shell_run('vader.py',options)
		.then(results => { 
			let sentiment = results[0];
			let res = { sentiment: 'Neutral'};
			if (sentiment === 'neg'){
			  res.sentiment = 'Negative';
			}
			else if (sentiment === 'pos'){
			  res.sentiment = 'Positive'
			}
			resolve(res);	
		})
		.catch(error => {
			reject(error);  
		}); 
    }
  );
}