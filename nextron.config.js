module.exports = {
  webpack: (defaultConfig, env) =>
    Object.assign(defaultConfig, {
      entry: {
        background: './main/index.ts'
      }
    })
}
