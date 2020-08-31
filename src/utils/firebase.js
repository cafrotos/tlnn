import * as firebase from 'firebase/app';
import "firebase/auth"
import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage"
import { v1 } from 'uuid';
import moment from 'moment'

import firebaseConfigs from 'configs/firebase'

firebase.initializeApp(firebaseConfigs)

export default firebase

const _uniqueFileName = (name) => `${v1()}.${name}`

const _getResourceType = (type) => type.split("/").shift() + "s"

const _uploadResourceFile = async (resourceType, { url, path, originFileObj, name }) => {
  if (url && path) {
    return { path, url }
  }
  const filePath = `${resourceType}/${moment().format("YYYY-MM-DD")}/${_uniqueFileName(name)}`

  const fileRef = firebase.storage().ref().child(filePath)
  await fileRef.put(originFileObj)
  const resourceUrl = await fileRef.getDownloadURL()

  return { path: filePath, url: resourceUrl }
}

const _createResource = async (body) => await firebase.firestore().collection("resources").add(body)

const _createStorageMedia = async ({ multimedias }) => {
  const fnsUploadImages = []
  const fnsUploadVideos = []
  const fnsUploadAudios = []

  if (multimedias && multimedias instanceof Array && multimedias.length > 0) {
    multimedias.map(media => {
      const resourceType = _getResourceType(media.type)
      switch (resourceType) {
        case "images":
          fnsUploadImages.push(_uploadResourceFile(resourceType, media))
          break;
        case "videos":
          fnsUploadVideos.push(_uploadResourceFile(resourceType, media))
          break;
        case "audios":
          fnsUploadAudios.push(_uploadResourceFile(resourceType, media))
          break;
        default:
          break;
      }
      return media
    })
    const [images, videos, audios] = await Promise.all([
      Promise.all(fnsUploadImages),
      Promise.all(fnsUploadVideos),
      Promise.all(fnsUploadAudios)
    ])
    return { images, videos, audios }
  }
  return {}
}

export const createResource = async (resource) => {
  const multimedias = await _createStorageMedia(resource)
  await _createResource({
    ...resource,
    multimedias
  })
}

export const updateResource = async (resource, id) => {
  const multimedias = await _createStorageMedia(resource)
  await firebase
    .firestore()
    .collection("resources")
    .doc(id)
    .update({
      ...resource,
      multimedias
    })
}