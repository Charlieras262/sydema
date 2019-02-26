const Activity = require('../models/activity');
const homeworkCTRL = {};

homeworkCTRL.getHomeworks = async (req, res) => {
  const homeworks = await Activity.find();
  res.json(homeworks);
}

homeworkCTRL.getHomework = async (req, res) => {
  const activity = await Activity.findById(req.params.id);
  res.json(activity);
}

homeworkCTRL.createHomework = async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.json({
    success: true,
    msg: 'Activity created'
  });
}

homeworkCTRL.editHomework = async (req, res) => {
  await Activity.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    success: true,
    msg: 'Activity Update'
  });
}

homeworkCTRL.deleteHomework = async (req, res) => {
  await Activity.findByIdAndDelete(req.params.id);
  res.json({
    success: true,
    msg: 'Activity Deleted'
  });
}

module.exports = homeworkCTRL;