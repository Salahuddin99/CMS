import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      nam: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isNGO: user.isNGO,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  )
}

export const isAuth = (req, res, next) => {
  const auth = req.headers.authorization
  if (auth) {
    // Bearer XXXXX
    const token = auth.slice(7, auth.length)
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' })
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    res.status(401).send({ message: 'No Token' })
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' })
  }
}

export const isNGO = (req, res, next) => {
  if (req.user && req.user.isNGO) {
    next()
  } else {
    res.status(401).send({ message: 'Invalid NGO Token' })
  }
}

export const isNGOorAdmin = (req, res, next) => {
  if (req.user && (req.user.isNGO || req.user.isAdmin)) {
    next()
  } else {
    res.status(401).send({ message: 'invalid NGO token/invalid Admin token' })
  }
}
