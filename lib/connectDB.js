import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables')
}

/**
 * Mongoose connection helper with dev caching to avoid multiple connections
 * when using Next's fast refresh.
 */
async function connectDB() {
  if (!MONGODB_URI) return

  // In development, use a global to cache the connection
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoose) global._mongoose = { conn: null, promise: null }
    if (global._mongoose.conn) return global._mongoose.conn

    if (!global._mongoose.promise) {
      global._mongoose.promise = mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
      }).then((m) => m.connection)
    }

    global._mongoose.conn = await global._mongoose.promise
    return global._mongoose.conn
  }

  // Production (no caching)
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  return mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((m) => m.connection)
}

export default connectDB
