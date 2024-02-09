class Validator {
    static validateTaskInfo(taskInfo) {
        if (taskInfo.hasOwnProperty("title") && taskInfo.hasOwnProperty("description")
            && taskInfo.hasOwnProperty("completed") && typeof taskInfo.title === 'string'
            && typeof taskInfo.description === 'string' && typeof taskInfo.completed === 'boolean') {
            return {
                "status": true,
                "message": "Course has been validated"
            }
        } else {
            return {
                "status": false,
                "message": "Course info is malformed, Please provide me all the parameters"
            }
        }
    }
}

module.exports = Validator;