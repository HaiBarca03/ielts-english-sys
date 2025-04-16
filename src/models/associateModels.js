module.exports = ({ User, Program, Content, Image }) => {
  Content.belongsTo(Program, { foreignKey: 'program_id' })

  Content.hasMany(Image, { foreignKey: 'content_id', as: 'Images' })
  Image.belongsTo(Content, { foreignKey: 'content_id' })

  User.hasMany(Image, { foreignKey: 'user_id' })
  Image.belongsTo(User, { foreignKey: 'user_id' })
}
