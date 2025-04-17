module.exports = ({
  User,
  Program,
  Content,
  Schedule,
  Class,
  Image,
  Attendance,
  Payment
}) => {
  Content.belongsTo(Program, { foreignKey: 'program_id' })
  Class.belongsTo(Program, { foreignKey: 'program_id' })

  Content.hasMany(Image, { foreignKey: 'content_id', as: 'Images' })
  Image.belongsTo(Content, { foreignKey: 'content_id' })

  User.hasMany(Image, { foreignKey: 'user_id' })
  Image.belongsTo(User, { foreignKey: 'user_id' })

  User.belongsToMany(Class, {
    through: 'Class_User',
    foreignKey: 'user_id',
    otherKey: 'class_id',
    timestamps: false
  })

  Class.belongsToMany(User, {
    through: 'Class_User',
    foreignKey: 'class_id',
    otherKey: 'user_id',
    timestamps: false
  })

  Schedule.belongsTo(Class, { foreignKey: 'class_id' })
  Schedule.belongsTo(User, { foreignKey: 'teacher_id', as: 'Teacher' })

  Attendance.belongsTo(Schedule, { foreignKey: 'schedule_id' })
  Attendance.belongsTo(User, { foreignKey: 'user_id' })

  Schedule.hasMany(Attendance, { foreignKey: 'schedule_id' })
  User.hasMany(Attendance, { foreignKey: 'user_id' })

  Payment.belongsTo(User, { foreignKey: 'user_id' })
  Payment.belongsTo(Program, { foreignKey: 'program_id' })

  User.hasMany(Payment, { foreignKey: 'user_id' })
  Program.hasMany(Payment, { foreignKey: 'program_id' })
}
