const Homework = require('../models/homework');
const homeworkCTRL = {};

homeworkCTRL.getHomeworks = async (req, res) => {
  const homeworks = await Homework.find();
  res.json(homeworks);
}

homeworkCTRL.getHomework = async (req, res) => {
  const homework = await Homework.findById(req.params.id);
  res.json(homework);
}

homeworkCTRL.createHomework = async (req, res) => {
  const homework = new Homework(req.body);
  await homework.save();
  res.json({
    success: true,
    msg: 'Homework created'
  });
}

homeworkCTRL.editHomework = async (req, res) => {
  await Homework.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    success: true,
    msg: 'Homework Update'
  });
}

homeworkCTRL.deleteHomework = async (req, res) => {
  await Homework.findByIdAndDelete(req.params.id);
  res.json({
    success: true,
    msg: 'Homework Deleted'
  });
}

module.exports = homeworkCTRL;