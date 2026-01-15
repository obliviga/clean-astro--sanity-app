import blockContent from './objects/blockContent'
import post from './documents/post'
import page from './documents/page'
import video from './objects/video'
import hero from './objects/hero'
import imageWithText from './objects/imageWithText'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [post, page, blockContent, video, hero, imageWithText]
