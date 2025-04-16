module.exports = ({ User, Program, Content, Class, Image }) => {
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
}
